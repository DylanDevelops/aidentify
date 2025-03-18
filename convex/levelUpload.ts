import { v } from "convex/values";

import { mutation } from "./_generated/server";

/**
 * Generates an upload URL for a new image
 * @returns The URL of the image storage
 */
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

/**
 * Mutation to create an image record with a given storage ID.
 *
 * @param {Object} args - The arguments for the mutation.
 * @param {string} args.storageId - The ID of the storage where the image is stored.
 * @param {string} args.internalName - The internal name for the image.
 * @param {boolean} args.isAIGenerated - Flag indicating if the image is AI-generated.
 * @param {string} [args.AIPrompt] - Optional prompt used for generating the AI image.
 * @param {string} [args.copyrightCredit] - Optional copyright credit information for the image.
 * 
 * @returns {Promise<Object>} The inserted image record.
 */
export const createImageWithImageStorageID = mutation({
  args: {
    storageId: v.id("_storage"),
    internalName: v.string(),
    isAIGenerated: v.boolean(),
    AIPrompt: v.optional(v.string()),
    copyrightCredit: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("images", {
      storageId: args.storageId,
      internalName: args.internalName,
      isAIGenerated: args.isAIGenerated,
      AIGeneratedPrompt: args.AIPrompt,
      copyrightInfo: args.copyrightCredit,
    });
  },
});

/**
 * Mutation to create a new level with associated image IDs.
 *
 * @param aiImageId - The ID of the AI-generated image.
 * @param normalImageId - The ID of the normal image.
 * @param groupName - The name of the group to which the level belongs.
 * @param classification - The classification of the level.
 * @param hints - An array of hints associated with the level.
 *
 * @returns The resulting id of the database insertion operation.
 */
export const createLevelWithImageIds = mutation({
  args: {
    aiImageId: v.id("images"),
    normalImageId: v.id("images"),
    groupName: v.string(),
    classification: v.string(),
    hints: v.array(v.string()),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("levels", {
      images: [args.aiImageId, args.normalImageId],
      groupName: args.groupName,
      classification: args.classification,
      hints: args.hints,
    });
  },
});
