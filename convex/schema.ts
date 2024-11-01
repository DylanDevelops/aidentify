import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  images: defineTable({
    imageGroup: v.string(),
    isFake: v.boolean(),
    storageID: v.id("_storage"),
  }),
  levels: defineTable({
    theme: v.string(),
    type: v.string(),
    imageCollection: v.array(v.id("images")),
    prompt: v.string(),
    identificationTips: v.array(v.string()),
  }),
});