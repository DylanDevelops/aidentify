import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  levels: defineTable({
    theme: v.string(),
    imageType: v.string(),
  }),
});