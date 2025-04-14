import { Doc } from "@/convex/_generated/dataModel";

type UserProfile = Pick<Doc<"users">, "_id" | "picture" | "points" | "clerkId" | "username">;

/**
 * Represents the properties required for the leaderboard component.
 * 
 * @interface LeaderboardProps
 * 
 * @property {Object} topUsers - Contains information about the top users on the leaderboard.
 * @property {bigint[]} topUsers.scores - An array of scores for the top users.
 * @property {bigint[]} topUsers.streaks - An array of streaks for the top users.
 * @property {string[]} topUsers.profilePictures - An array of profile picture URLs for the top users.
 * @property {string[]} topUsers.usernames - An array of usernames for the top users.
 * 
 * @property {boolean} isAuthenticated - Indicates whether the current user is authenticated.
 * @property {boolean} isLoading - Indicates whether the leaderboard data is still loading.
 * @property {UserProfile | null | undefined} user - The profile of the current user, or null/undefined if not available.
 */
export interface LeaderboardProps {
  topUsers: {
    scores: bigint[];
    streaks: bigint[];
    profilePictures: string[];
    usernames: string[];
  }
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null | undefined;
}


/**
 * Truncates a username to a specified maximum length and appends "..." if the username exceeds that length.
 *
 * @param username - The username to be truncated.
 * @param maxLength - The maximum allowed length for the username. Defaults to 16.
 * @returns The truncated username if it exceeds the maximum length, otherwise the original username.
 */
export function truncateUsername(username: string, maxLength = 16) {
  if(username.length <= maxLength) {
    return username;
  }

  return username.substring(0, maxLength) + "...";
}