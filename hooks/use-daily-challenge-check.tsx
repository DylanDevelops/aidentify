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