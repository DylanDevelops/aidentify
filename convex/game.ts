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
 * Retrieves the image source URL for a given image ID.
 *
 * @param {Object} args - The arguments object.
 * @param {string} args.imageId - The ID of the image to retrieve.
 * @returns {Promise<string>} The URL of the image.
 * @throws {Error} If the imageId is missing or if no image is found.
 */
export const getImageSrc = query({
  args: { imageId: v.id("images") },
  handler: async (ctx, args) => {
    if(!args.imageId) {
      throw new Error("Missing imageId.");
    }

    const image = await ctx.db.get(args.imageId);

    if(!image) {
      throw new Error("No levels exist");
    }

    const imageUrl = await ctx.storage.getUrl(image.storageId);

    return imageUrl;
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

    if(args.selectedImageId === AIGeneratedImageId._id) {
      // TODO: Implement correct guess here
    } else {
      // TODO: Implement incorrect guess here
    }

    return {
      correctImageId: AIGeneratedImageId._id,
      groupName: level.groupName,
      classification: level.classification,
      hints: level.hints,
    }
  }
});