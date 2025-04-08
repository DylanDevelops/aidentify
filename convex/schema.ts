import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    isAdmin: v.boolean(),
    username: v.string(),
    emails: v.array(v.string()),
    level: v.int64(),
    points: v.int64(),
    picture: v.string(),
    currentStreak: v.int64(),
    lastPlayedTimestamp: v.optional(v.number()),
    lastDailyChallengeCompletion: v.optional(v.number()),
  })
    .index("byClerkId", ["clerkId"])
    .index("byUsername", ["username"])
    .index("byLevel", ["level"])
    .index("byPoints", ["points"]),

  images: defineTable({
    storageId: v.id("_storage"),
    internalName: v.string(),
    isAIGenerated: v.boolean(),
    AIGeneratedPrompt: v.optional(v.string()),
    copyrightInfo: v.optional(v.string()),
  }),

  levels: defineTable({
    images: v.array(v.id("images")),
    groupName: v.string(),
    classification: v.string(),
    hints: v.array(v.string()),
    totalPlays: v.int64(),
    correctAnswers: v.int64(),
  }),
});