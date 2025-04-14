import { LeaderboardProps } from "./leaderboard-helpers";

import "../leaderboard.css";
import MobileLeaderboardPodium from "./mobile-leaderboard-podium";

const MobileLeaderboard: React.FC<LeaderboardProps> = ({ topUsers, isAuthenticated, isLoading, user }) => {
  return (
    <>
      <div className="flex md:hidden flex-col space-y-10 items-end w-full">
        {topUsers.usernames.map((_, index) => (
          <MobileLeaderboardPodium
            key={index}
            username={topUsers.usernames[index]}
            picture={topUsers.profilePictures[index]}
            score={topUsers.scores[index]}
            streak={topUsers.streaks[index]}
            place={index + 1}
          />
        ))}
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