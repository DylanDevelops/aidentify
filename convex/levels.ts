import { query, mutation } from "./_generated/server";
import { v } from "convex/values"

export const list = query({
  args: {},
  handler: async (ctx) => {
    const levels = await ctx.db.query("levels").collect();
    return levels
  },
});