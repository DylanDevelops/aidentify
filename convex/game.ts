import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Retrieves a specified number of random levels from the database.
 *
 * @param {Object} args - The arguments object.
 * @param {number} args.cacheBuster - A number used to bust the cache.
 * @param {bigint} args.numOfLevels - The number of levels to retrieve.
 * @returns {Promise<string[]>} A promise that resolves to an array of level IDs.
 * @throws {Error} If there are not enough levels in the database to fulfill the request.
 */
export const getRandomLevels = query({
  args: { cacheBuster: v.number(), numOfLevels: v.int64() },
  handler: async (ctx, args) => {
    const levels = await ctx.db.query("levels").collect();

    if(levels.length < args.numOfLevels) {
      throw new Error("Not enough levels to complete request!");
    }

    const selectedLevels = [];

    for(let i = 0; i < args.numOfLevels; i++) {
      const randomIndex = Math.floor(Math.random() * levels.length);
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

    const imageUrls = await Promise.all(images.map(image => ctx.storage.getUrl(image!.storageId)))

    return imageUrls;
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

    const AIGeneratedImageId = (await ctx.db.query("images").filter(q => q.eq(q.field("isAIGenerated"), true)).collect()).at(0);

    if(!AIGeneratedImageId) {
      throw new Error("No AI-generated image found.");
    }

    let score = 0;
    let correct = false;

    if(args.selectedImageId === AIGeneratedImageId._id) {
      // TODO: Implement correct guess here
      score = 50;
      correct = true;
    } else {
      // TODO: Implement incorrect guess here
      score = 0;
      correct = false;
    }

    return {
      correct,
      correctImageId: AIGeneratedImageId._id,
      groupName: level.groupName,
      classification: level.classification,
      hints: level.hints,
      score,
    }
  }
});