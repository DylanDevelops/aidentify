/**
 * Determines whether the user has played the daily challenge today.
 *
 * This function compares the provided timestamp of the user's last play
 * with the current date in the "America/Los_Angeles" timezone. It resets
 * both dates to midnight PST to ensure the comparison is based solely on
 * the calendar day, ignoring the time of day.
 *
 * @param userTimestamp - The timestamp (in milliseconds) of the user's last play.
 *                        If undefined, it is assumed the user has not played.
 * @returns `true` if the user has played the daily challenge today, `false` otherwise.
 */
export const hasUserPlayedDailyChallengeToday = (userTimestamp: number | undefined) => {
  if (!userTimestamp) {
    return false;
  }

  const now = new Date();
  const nowPST = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const lastPlay = new Date(userTimestamp);
  const lastPlayPST = new Date(lastPlay.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));

  // Reset time part of the dates to midnight PST
  const nowMidnightPST = new Date(nowPST.getFullYear(), nowPST.getMonth(), nowPST.getDate());
  const lastPlayMidnightPST = new Date(lastPlayPST.getFullYear(), lastPlayPST.getMonth(), lastPlayPST.getDate());

  // Check if the user has already played today
  return nowMidnightPST.getTime() === lastPlayMidnightPST.getTime();
};

/**
 * Determines whether a user can increase their streak based on the last time they played
 * the daily challenge and the current date in the PST timezone.
 *
 * @param userTimestamp - The timestamp (in milliseconds) of the user's last daily challenge play.
 *                        If undefined, the function assumes the user has not played before.
 * @returns `true` if the user can increase their streak (i.e., they haven't played today and
 *          it has been no more than 2 days since their last play); otherwise, `false`.
 */
export const canUserIncreaseStreak = (userTimestamp: number | undefined) => {
  if(!userTimestamp) {
    return true;
  }
  
  if(hasUserPlayedDailyChallengeToday(userTimestamp)) {
    return false;
  }

  const now = new Date();
  const nowPST = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const lastPlay = new Date(userTimestamp);
  const lastPlayPST = new Date(lastPlay.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));

  // Reset time part of the dates to midnight PST
  const nowMidnightPST = new Date(nowPST.getFullYear(), nowPST.getMonth(), nowPST.getDate());
  const lastPlayMidnightPST = new Date(lastPlayPST.getFullYear(), lastPlayPST.getMonth(), lastPlayPST.getDate());

  // Calculate the difference in days
  const daysDifference = (nowMidnightPST.getTime() - lastPlayMidnightPST.getTime()) / (24 * 60 * 60 * 1000);

  // Return true if it has been no more than 2 days since the last play
  return daysDifference > 0 && daysDifference <= 2;
};