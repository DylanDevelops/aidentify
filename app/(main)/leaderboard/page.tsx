import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Medal, PartyPopper } from "lucide-react";

import "./leaderboard.css";

const LeaderboardPage = () => {
  return ( 
    <>
      <FancyBackgroundGradient />
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <Medal className="w-20 h-20 text-[hsla(198,_9%,_48%,_1)]" />
          <h1 className="text-[2.5rem] font-bold text-[hsla(198,_9%,_48%,_0.75)] pb-10">Leaderboard</h1>
          <div className="flex flex-col items-center gap-y-[1.56rem]">
            <div className="flex flex-row gap-x-[1.56rem] items-end">
              <div className="podium podium-1 w-[12.5rem] h-[12.5rem] rounded-[1.875rem] flex flex-col items-center">
                <Avatar className="w-[5.25rem] h-[5.25rem] -translate-y-1/2">
                  <AvatarImage src="https://github.com/dylandevelops.png" />
                  <AvatarFallback>...</AvatarFallback>
                </Avatar>
                <div className="mt-[-1.5rem] text-center">
                  <p className="text-[#6E7E85] font-bold text-[1.25rem]">USERNAME</p>
                  <div className="flex justify-center items-center text-[hsla(342,_30%,_8%,_0.7)] font-bold">
                    <PartyPopper className="w-5 h-5 mr-2" />
                    {0}
                  </div>
                </div>
              </div>
              <div className="podium podium-2 w-[12.5rem] h-[15.63rem] rounded-[1.875rem] flex flex-col items-center">
                <Avatar className="w-[5.25rem] h-[5.25rem] -translate-y-1/2">
                  <AvatarImage src="https://github.com/dylandevelops.png" />
                  <AvatarFallback>...</AvatarFallback>
                </Avatar>
                <div className="mt-[-1.5rem] text-center">
                  <p className="text-[#6E7E85] font-bold text-[1.25rem]">USERNAME</p>
                  <div className="flex justify-center items-center text-[hsla(342,_30%,_8%,_0.7)] font-bold">
                    <PartyPopper className="w-5 h-5 mr-2" />
                    {0}
                  </div>
                </div>
              </div>
              <div className="podium podium-3 w-[12.5rem] h-[9.38rem] rounded-[1.875rem] flex flex-col items-center">
                <Avatar className="w-[5.25rem] h-[5.25rem] -translate-y-1/2">
                  <AvatarImage src="https://github.com/dylandevelops.png" />
                  <AvatarFallback>...</AvatarFallback>
                </Avatar>
                <div className="mt-[-1.5rem] text-center">
                  <p className="text-[#6E7E85] font-bold text-[1.25rem]">USERNAME</p>
                  <div className="flex justify-center items-center text-[hsla(342,_30%,_8%,_0.7)] font-bold">
                    <PartyPopper className="w-5 h-5 mr-2" />
                    {0}
                  </div>
                </div>
              </div>
            </div>
            <div className="podium podium-4 w-full h-[4.38rem] rounded-[1.875rem] flex justify-center items-center">
              <p className="font-bold text-[1.5625rem] text-[#6E7E85]">You have <span className="font-normal">{0}</span> points!</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
 
export default LeaderboardPage;