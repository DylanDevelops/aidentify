"use client";

import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";
import { Footer } from "@/components/footer";
import { api } from "@/convex/_generated/api";
import { hasUserPlayedDailyChallengeToday } from "@/hooks/use-daily-challenge-check";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useConvexAuth, useQuery } from "convex/react";
import { CalendarCheck, CalendarClock, CalendarX, ChevronRight, ImagePlay, Loader2, TextSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PlayPage = () => {
  const router = useRouter();

  const clerkUser = useUser();
  const user = useQuery(api.users.getUserByUsername, { username: clerkUser.user?.username ?? "" });
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if(user !== undefined) {
      setIsUserLoading(false);
    }
  }, [user]);

  const handleNavigation = (gameMode: string) => {
    router.push(`/game?gamemode=${gameMode}`);
  };

  if(isUserLoading || (!isAuthenticated && isLoading)) {
    return (
      <>
        <div className="min-h-full flex flex-col">
          <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
            <Loader2 className="w-32 h-32 animate-spin" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const alreadyCompletedDailyChallenge = hasUserPlayedDailyChallengeToday(user?.lastDailyChallengeCompletion);

  return (
    <>
      <FancyBackgroundGradient />
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <div className="flex flex-col justify-center gap-[2.81rem]">
            <div className={cn("flex-shrink-0 w-[22rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(101deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(187,_186,_198,_0.85)_100%)] rounded-[2.5rem] border-[5px] border-solid border-[#AFBABD] transition-transform duration-300", (user &&!alreadyCompletedDailyChallenge) ? "hover:scale-105 cursor-pointer" : "",)} onClick={() => {
              if(!alreadyCompletedDailyChallenge && user) {
                handleNavigation("daily_challenge");
              }
            }}>
              {!user ? (
                <CalendarX className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
              ) : alreadyCompletedDailyChallenge ? (
                <CalendarCheck className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
              ) : (
                <CalendarClock className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
              )}
              <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem] text-[rgba(28,_15,_19,_0.50)] flex items-center">Daily Challenge {!alreadyCompletedDailyChallenge && user && <ChevronRight className="ml-1 stroke-[3]" />}</p>
              {!user && (
                <p className="text-[rgba(28,_15,_19,_0.50)]">
                  Create an Account to Play
                </p> 
              )}
              {alreadyCompletedDailyChallenge && (
                <p className="text-[rgba(28,_15,_19,_0.50)]">
                  Completed {user?.lastDailyChallengeCompletion ? `for ${new Date(user.lastDailyChallengeCompletion).toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" })}` : ""}
                </p> 
              )}
            </div>
            <div className="flex-shrink-0 w-[22rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(243deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_155.46%)] rounded-[2.5rem] border-[5px] border-solid border-[#A5B5B8] hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => {
              handleNavigation("images");
            }}>
              <ImagePlay className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
              <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem] text-[rgba(28,_15,_19,_0.50)] flex items-center justify-center">Play Images <ChevronRight className="ml-1 stroke-[3]" /></p>
            </div>
            <div className="flex-shrink-0 w-[22rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(56deg,_rgba(187,_186,_198,_0.85)_0%,_rgba(86,_83,_115,_0.72)_202.26%)] rounded-[2.5rem] border-[5px] border-solid border-[#9E9DAE] hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => {
              handleNavigation("text");
            }}>
              <TextSearch className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
              <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem] text-[rgba(28,_15,_19,_0.50)] flex items-center">Play Text <ChevronRight className="ml-1 stroke-[3]" /></p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
 
export default PlayPage;