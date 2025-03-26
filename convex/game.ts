import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import Rand from "rand-seed";

/**
 * Retrieves a specified number of random levels from the database.
 *
 * @param {Object} args - The arguments object.
 * @param {number} args.cacheBuster - A number used to bust the cache.
 * @param {bigint} args.numOfLevels - The number of levels to retrieve.
 * @param {string} args.seed - The seed for random number generation.
 * @returns {Promise<string[]>} A promise that resolves to an array of level IDs.
 * @throws {Error} If there are not enough levels in the database to fulfill the request.
 */
export const getRandomLevels = query({
  args: { cacheBuster: v.number(), numOfLevels: v.int64(), seed: v.string() },
  handler: async (ctx, args) => {
    const levels = await ctx.db.query("levels").collect();

    if(levels.length < args.numOfLevels) {
      throw new Error("Not enough levels to complete request!");
    }

    const selectedLevels = [];

    const rand = new Rand(args.seed);

    for(let i = 0; i < args.numOfLevels; i++) {
      const randomIndex = Math.floor(rand.next() * levels.length);
      selectedLevels[i] = levels[randomIndex];
      levels.splice(randomIndex, 1);
    }

    const levelIds = selectedLevels.map(level => level._id);

    return levelIds;
  }
});

/**
 * Query to get image source URLs for a given level.
 *
 * @param {Object} args - The arguments object.
 * @param {string} args.levelId - The ID of the level to get images for.
 * @returns {Promise<string[]>} - A promise that resolves to an array of image URLs.
 * @throws {Error} - Throws an error if `levelId` is missing or if no images exist.
 *
 * @example
 * const imageSrcs = await getImageSrcs({ levelId: "some-level-id" });
 * console.log(imageSrcs); // ["url1", "url2", ...]
 */
export const getImageSrcs = query({
  args: { levelId: v.id("levels") },
  handler: async (ctx, args) => {
    if(!args.levelId) {
      throw new Error("Missing levelId.");
    }

    const level = await ctx.db.get(args.levelId);

    const images = await Promise.all(level!.images.map(imageId => ctx.db.get(imageId)));

    if(!images) {
      throw new Error("No images exist");
    }

    const imageUrls = await Promise.all(images.map(image => ctx.storage.getUrl(image!.storageId)));

    return imageUrls;
  }
});

/**
 * Query to get image IDs associated with a given level.
 *
 * @param {Object} args - The arguments object.
 * @param {string} args.levelId - The ID of the level to get images for.
 * @returns {Promise<string[]>} A promise that resolves to an array of image IDs.
 * @throws {Error} If the levelId is missing or if no images exist for the given level.
 */
export const getImageIds = query({
  args: { levelId: v.id("levels") },
  handler: async (ctx, args) => {
    if(!args.levelId) {
      throw new Error("Missing levelId");
    }

    const level = await ctx.db.get(args.levelId);

    const images = await Promise.all(level!.images.map(imageId => ctx.db.get(imageId)));

    if(!images) {
      throw new Error("No images exist");
    }

    const imageIds = await Promise.all(images.map(image => image!._id));

    return imageIds;
  }
});

/**
 * Mutation to check if the selected image is the AI-generated image for a given level.
 *
 * @param args - The arguments for the mutation.
 * @param args.levelId - The ID of the level to check.
 * @param args.selectedImageId - The ID of the selected image to check against the AI-generated image.
 * @returns An object containing the correct image ID, group name, classification, and hints of the level.
 * @throws Will throw an error if the level does not exist or if no AI-generated image is found.
 */
export const checkGuess = mutation({
  args: { levelId: v.id("levels"), selectedImageId: v.id("images") },
  handler: async(ctx, args) => {
    const level = await ctx.db.get(args.levelId);

    if(!level) {
      throw new Error("No levels exist");
    }

    let AIGeneratedImageId;
    let AIGeneratedImagePrompt;

    for (const imageId of level.images) {
      const image = await ctx.db.get(imageId);
      if (image && image.isAIGenerated) {
        AIGeneratedImageId = image;
        AIGeneratedImagePrompt = image.AIGeneratedPrompt;
        break;
      }
    }

    if(!AIGeneratedImageId) {
      throw new Error("No AI-generated image found.");
    }

    let score = 0;
    let correct = false;

    if(args.selectedImageId === AIGeneratedImageId._id) {
      score = 50;
      correct = true;
    } else {
      score = 0;
      correct = false;
    }

    const totalPlays = level.totalPlays + 1n;
    const correctAnswers = correct ? (level.correctAnswers + 1n) : level.correctAnswers;
    const globalAccuracy = totalPlays > 0n ? ((correctAnswers * 100n) / totalPlays) : 0n;

    await ctx.db.patch(level._id, {
      totalPlays,
      correctAnswers
    });

    return {
      correct,
      correctImageId: AIGeneratedImageId._id,
      groupName: level.groupName,
      classification: level.classification,
      hints: level.hints,
      aiImagePrompt: AIGeneratedImagePrompt,
      score,
      globalAccuracy: globalAccuracy
    };
  }
});


/**
 * Mutation to finish a game and update user points.
 *
 * @param {Object} args - The arguments object.
 * @param {string} [args.userID] - The optional ID of the user.
 * @param {number} args.points - The points earned in the game.
 * @returns {Promise<Object>} The result object containing the earned points.
 *
 * @example
 * // Example usage:
 * const result = await finishGame({ userID: "user123", points: 50 });
 * console.log(result.earnedPoints); // Outputs the total earned points
 *
 * @remarks
 * If the userID is not provided, the function will return the points earned in the game.
 * If the userID is provided but the user is not found, the function will also return the points earned in the game.
 * If the user is found, the function will add the current streak to the points earned and update the user's total points.
 */
export const finishGame = mutation({
  args: { userID: v.optional(v.id("users")), points: v.int64() },
  handler: async(ctx, args) => {
    if(!args.userID) {
      console.log("No user id");
      return {
        earnedPoints: args.points
      };
    }

    let user;

    if(args.userID) {
      user = await ctx.db
        .query("users")
        .withIndex("by_id", (q) => q.eq("_id", args.userID!))
        .unique();
    }

    if(!user) {
      console.log("no user");
      return {
        earnedPoints: args.points
      };
    }

    const pointsEarned = args.points + user.currentStreak;

    await ctx.db.patch(args.userID, {
      points: user.points + pointsEarned
    });

    return {
      earnedPoints: pointsEarned
    };
  }
});