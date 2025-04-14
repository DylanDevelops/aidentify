import { LeaderboardProps } from "./leaderboard-helpers";

import "../leaderboard.css";
import MobileLeaderboardPodium from "./mobile-leaderboard-podium";

const MobileLeaderboard: React.FC<LeaderboardProps> = ({ topUsers, isAuthenticated, isLoading, user }) => {
  return (
    <>
      <div className="flex md:hidden flex-col space-y-10 items-end w-full">
        <MobileLeaderboardPodium
          username={topUsers.usernames[0]}
          picture={topUsers.profilePictures[0]}
          score={topUsers.scores[0]}
          streak={topUsers.streaks[0]}
          place={1}
        />
        <MobileLeaderboardPodium
          username={topUsers.usernames[1]}
          picture={topUsers.profilePictures[1]}
          score={topUsers.scores[1]}
          streak={topUsers.streaks[1]}
          place={2}
        />
        <MobileLeaderboardPodium
          username={topUsers.usernames[2]}
          picture={topUsers.profilePictures[2]}
          score={topUsers.scores[2]}
          streak={topUsers.streaks[2]}
          place={3}
        />
      </div>
      <div className="md:hidden podium podium-4 w-full h-[4.38rem] rounded-[1.875rem] flex justify-center items-center border-[3px] border-solid border-[#AFBABD]">
        {!isAuthenticated && !isLoading && (
          <p className="font-bold text-base sm:text-[1.5625rem] text-[#6E7E85]">Create an account to save your score!</p>
        )}
        {isAuthenticated && !isLoading && user && (
          <>
            {topUsers.usernames.includes(user.username) ? (
              <p className="font-bold text-base sm:text-[1.5625rem] text-[#6E7E85]">
                You are ranked <span className="font-normal">#{topUsers.usernames.indexOf(user.username) + 1}</span> on the leaderboard!
              </p>
            ) : (
              <p className="font-bold text-base sm:text-[1.5625rem] text-[#6E7E85]">
                You have <span className="font-normal">{user.points.toString() ?? "0"}</span> points!
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};
 
export default MobileLeaderboard;