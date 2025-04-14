import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flame, PartyPopper } from "lucide-react";
import { LeaderboardProps, truncateUsername } from "./leaderboard-helpers";

const DesktopLeaderboard: React.FC<LeaderboardProps> = ({ topUsers, isAuthenticated, isLoading, user }) => {
  return ( 
    <div className="hidden md:flex flex-col items-center gap-y-[1.56rem] pt-20">
      <div className="flex flex-row gap-x-[1.56rem] items-end">
        <div className="podium podium-1 w-[12.5rem] h-[12.5rem] rounded-[1.875rem]  border-[5px] border-solid border-[#A5B5B8] flex flex-col items-center relative">
          <div className="absolute top-[-1.5rem] text-[2rem] font-bold text-[hsla(246,_16%,_39%,_0.75)] -translate-y-20">#2</div>
          <div className="absolute w-[6.25rem] h-[6.25rem] -translate-y-1/2 avatar-frame rounded-full"></div>
          <Avatar className="w-[5.25rem] h-[5.25rem] -translate-y-1/2">
            <AvatarImage src={topUsers.profilePictures[1]} />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          <div className="mt-[-1.5rem] text-center">
            <p className="text-[#6E7E85] font-bold text-[1.25rem] pb-2">{truncateUsername(topUsers.usernames[1])}</p>
            <div className="flex gap-x-4 justify-center items-center text-[hsl(342,_30%,_8%)] opacity-70 font-bold">
              <div className="flex flex-row justify-center items-center">
                <PartyPopper className="w-5 h-5 mr-2" />
                {topUsers.scores[1].toString()}
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flame className="w-5 h-5 mr-2 fill-[hsl(342,_30%,_8%)]" />
                {topUsers.streaks[1].toString()}
              </div>
            </div>
          </div>
        </div>
        <div className="podium podium-2 w-[12.5rem] h-[15.63rem] rounded-[1.875rem] border-[5px] border-solid border-[#A5B5B8] flex flex-col items-center relative">
          <div className="absolute top-[-1.5rem] text-[2rem] font-bold text-[hsla(246,_16%,_39%,_0.75)] -translate-y-20">#1</div>
          <div className="absolute w-[6.25rem] h-[6.25rem] -translate-y-1/2 avatar-frame rounded-full"></div>               <Avatar className="w-[5.25rem] h-[5.25rem] -translate-y-1/2">
            <AvatarImage src={topUsers.profilePictures[0]} />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          <div className="mt-[-1.5rem] text-center">
            <p className="text-[#6E7E85] font-bold text-[1.25rem] pb-2">{truncateUsername(topUsers.usernames[0])}</p>
            <div className="flex gap-x-4 justify-center items-center text-[hsl(342,_30%,_8%)] opacity-70 font-bold">
              <div className="flex flex-row justify-center items-center">
                <PartyPopper className="w-5 h-5 mr-2" />
                {topUsers.scores[0].toString()}
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flame className="w-5 h-5 mr-2 fill-[hsl(342,_30%,_8%)]" />
                {topUsers.streaks[0].toString()}
              </div>
            </div>
          </div>
        </div>
        <div className="podium podium-3 w-[12.5rem] h-[9.38rem] rounded-[1.875rem]  border-[5px] border-solid border-[#A5B5B8] flex flex-col items-center relative">
          <div className="absolute top-[-1.5rem] text-[2rem] font-bold text-[hsla(246,_16%,_39%,_0.75)] -translate-y-20">#3</div>
          <div className="absolute w-[6.25rem] h-[6.25rem] -translate-y-1/2 avatar-frame rounded-full"></div>
          <Avatar className="w-[5.25rem] h-[5.25rem] -translate-y-1/2">
            <AvatarImage src={topUsers.profilePictures[2]} />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          <div className="mt-[-1.5rem] text-center">
            <p className="text-[#6E7E85] font-bold text-[1.25rem] pb-2">{truncateUsername(topUsers.usernames[2])}</p>
            <div className="flex gap-x-4 justify-center items-center text-[hsl(342,_30%,_8%)] opacity-70 font-bold">
              <div className="flex flex-row justify-center items-center">
                <PartyPopper className="w-5 h-5 mr-2" />
                {topUsers.scores[2].toString()}
              </div>
              <div className="flex flex-row justify-center items-center">
                <Flame className="w-5 h-5 mr-2 fill-[hsl(342,_30%,_8%)]" />
                {topUsers.streaks[2].toString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="podium podium-4 w-full h-[4.38rem] rounded-[1.875rem] flex justify-center items-center border-[3px] border-solid border-[#AFBABD]">
        {!isAuthenticated && !isLoading && (
          <p className="font-bold text-[1.5625rem] text-[#6E7E85]">Create an account to save your score!</p>
        )}
        {isAuthenticated && !isLoading && user && (
          <>
            {topUsers.usernames.includes(user.username) ? (
              <p className="font-bold text-[1.5625rem] text-[#6E7E85]">
                You are ranked <span className="font-normal">#{topUsers.usernames.indexOf(user.username) + 1}</span> on the leaderboard!
              </p>
            ) : (
              <p className="font-bold text-[1.5625rem] text-[#6E7E85]">
                You have <span className="font-normal">{user.points.toString() ?? "0"}</span> points!
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
 
export default DesktopLeaderboard;