import { internalMutation, query, QueryCtx } from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

/**
 * Query to get the current user.
 *
 * @constant
 * @type {Query}
 * @param {Object} args - The arguments for the query.
 * @param {Function} handler - The handler function to process the query.
 * @returns {Promise<User>} The current user.
 */
export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

/**
 * Upserts a user record from Clerk data.
 * 
 * This function performs an internal mutation that either inserts a new user record
 * or updates an existing one based on the provided Clerk user data.
 * 
 * @param args.data - The user data from Clerk, validated as `UserJSON`.
 * 
 * @remarks
 * - This function does not perform runtime validation on the input data and trusts the data from Clerk.
 * - If a user with the given Clerk ID does not exist, a new record is inserted.
 * - If a user with the given Clerk ID already exists, the existing record is updated.
 * 
 * @param ctx - The context object containing the database connection.
 * @param data - The user data from Clerk.
 * 
 * @returns {Promise<void>} - A promise that resolves when the upsert operation is complete.
 */
export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
        
    const user = await userByClerkId(ctx, data.id);
    if (user === null) {
      const userAttributes = {
        clerkId: data.id!,
        isAdmin: false,
        username: data.username!,
        emails: data.email_addresses ? data.email_addresses.map(email => email.email_address) : [],
        level: 1n,
        points: 0n,
        picture: data.image_url,
        currentStreak: 0n,
        lastParticipationDate: new Date().toISOString(),
      };
            
      await ctx.db.insert("users", userAttributes);
    } else {
      const userAttributes = {
        clerkId: data.id!,
        username: data.username!,
        emails: data.email_addresses ? data.email_addresses.map(email => email.email_address) : [],
        picture: data.image_url,
      };

      await ctx.db.patch(user._id, userAttributes);
    }
  },
});


/**
 * Deletes a user from the database based on the provided Clerk user ID.
 * 
 * @param {Object} args - The arguments object.
 * @param {string} args.clerkUserId - The Clerk user ID of the user to be deleted.
 * 
 * @param {Object} ctx - The context object.
 * 
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 * 
 * @throws {Error} - Throws an error if the user cannot be found or deleted.
 * 
 * @example
 * ```typescript
 * await deleteFromClerk({ clerkUserId: 'clerk_user_id' });
 * ```
 */
export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});

export const updateStreak = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, { clerkId }) {
    const user = await userByClerkId(ctx, clerkId);

    if(user !== null) {
      const today = new Date().toISOString().split('T')[0];
      const lastParticipationDate = user.lastParticipationDate.split('T')[0];

      if(lastParticipationDate === today) {
        return;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = user.currentStreak;

      if(lastParticipationDate === yesterdayStr) {
        newStreak += 1n;
      } else {
        newStreak = 1n;
      }

      await ctx.db.patch(user._id, {
        currentStreak: newStreak,
        lastParticipationDate: new Date().toISOString(),
      });
    } else {
      console.warn(
        `Can't update Streak for user, there is none for Clerk user ID: ${clerkId}`,
      );
    }
  },
});

/**
 * Retrieves the top 3 leaderboard entries based on user points.
 *
 * This query fetches the top users from the "users" table, ordered
 * in descending order by their points. It extracts and returns their
 * scores, profile pictures, and usernames.
 *
 * @returns An object containing:
 * - `scores`: An array of the top 3 user scores.
 * - `profilePictures`: An array of the top 3 user profile picture URLs.
 * - `usernames`: An array of the top 3 usernames.
 */
export const getLeaderboardEntries = query({
  async handler(ctx) {
    const topUsers = await ctx.db
      .query("users")
      .withIndex("byPoints")
      .order("desc")
      .take(3);

    const scores = topUsers.map((user) => user.points);
    const profilePictures = topUsers.map((user) => user.picture);
    const usernames = topUsers.map((user) => user.username);

    return {
      scores,
      profilePictures,
      usernames,
    };
  }
});

/**
 * Query to get a user by their username.
 *
 * This query takes a username as an argument and retrieves the corresponding user document
 * from the users table. It uses an index on the username field to perform the query efficiently.
 *
 * @param {Object} args - The arguments object.
 * @param {string} args.username - The username of the user to retrieve.
 * @returns {Promise<Object|null>} - A promise that resolves to the user document if found, or null if not found.
*/
export const getUserByUsername = query({
  args: {
    username: v.string(),
  },
  async handler(ctx, args) {
    const user = await userByUsername(ctx, args.username);
    return user;
  }
});

/**
 * Retrieves the current user record or throws an error if the user is not found.
 *
 * @param ctx - The context for the query.
 * @returns The current user record.
 * @throws Will throw an error if the current user cannot be retrieved.
 */
export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

/**
 * Retrieves the current user based on the authentication context.
 *
 * @param ctx - The query context containing authentication information.
 * @returns A promise that resolves to the current user or null if no user is authenticated.
 */
export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByClerkId(ctx, identity.subject);
}

/**
 * Retrieves a user from the database using their Clerk ID.
 *
 * @param ctx - The query context containing the database connection.
 * @param clerkId - The Clerk ID of the user to be retrieved.
 * @returns A promise that resolves to the user object if found, otherwise null.
 */
async function userByClerkId(ctx: QueryCtx, clerkId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkId", (q) => q.eq("clerkId", clerkId))
    .unique();
}

/**
 * Retrieves a user by their username from the database.
 *
 * @param ctx - The context object containing the database connection.
 * @param username - The username of the user to retrieve.
 * @returns A promise that resolves to the user object if found, otherwise null.
 */
async function userByUsername(ctx: QueryCtx, username: string) {
  return await ctx.db
    .query("users")
    .withIndex("byUsername", (q) => q.eq("username", username))
    .unique();
}