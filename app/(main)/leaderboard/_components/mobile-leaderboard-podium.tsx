import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flame, PartyPopper } from "lucide-react";
import { truncateUsername } from "./leaderboard-helpers";
import { cn } from "@/lib/utils";

interface MobileLeaderboardPodiumProps {
  username: string;
  picture: string;
  score: bigint;
  streak: bigint;
  place: number;
}

const MobileLeaderboardPodium: React.FC<MobileLeaderboardPodiumProps> = ({ username, picture, score, streak, place }) => {
  return (
    <div className={cn("podium w-full h-[4.38rem] rounded-[1.875rem] border-[5px] border-solid border-[#A5B5B8] flex items-center p-3 gap-x-2", `podium-${place}`)}>
      <div className="absolute w-[6.25rem] h-[6.25rem] avatar-frame rounded-full"></div>
      <Avatar className="w-[5.25rem] h-[5.25rem]">
        <AvatarImage src={picture} />
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
      <div className="ml-4 flex flex-col justify-center flex-1">
        <p className="text-[#6E7E85] font-bold text-start text-[1.25rem]">{truncateUsername(username, 12)}</p>
        <div className="flex gap-x-4 items-center text-[hsl(342,_30%,_8%)] opacity-70 font-bold">
          <div className="flex flex-row items-center">
            <PartyPopper className="w-5 h-5 mr-2" />
            {score.toString()}
          </div>
          <div className="flex flex-row items-center">
            <Flame className="w-5 h-5 mr-2 fill-[hsl(342,_30%,_8%)]" />
            {streak.toString()}
          </div>
        </div>
      </div>
      <div className="text-[2rem] font-bold text-[hsla(246,_16%,_39%,_0.75)]">#{place.toString()}</div>
    </div>
  );
};

export default MobileLeaderboardPodium;