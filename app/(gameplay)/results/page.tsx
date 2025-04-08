"use client";

import { Footer } from "@/components/footer";
import { api } from "@/convex/_generated/api";
import { hasUserPlayedDailyChallengeToday } from "@/hooks/use-daily-challenge-check";
import { useUser } from "@clerk/clerk-react";
import { useConvexAuth, useQuery } from "convex/react";
import { CalendarClock, ChevronRight, ImagePlay, Loader2, PartyPopper, TextSearch } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GameResultPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const gamemode = searchParams.get("gamemode");
  const correct = searchParams.get("correct");
  const rounds = searchParams.get("rounds");
  const pointsGained = searchParams.get("points");

  const clerkUser = useUser();
  const user = useQuery(api.users.getUserByUsername, { username: clerkUser.user?.username ?? "" });
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if(user !== undefined) {
      setIsUserLoading(false);
    }
  }, [user]);

  if(!gamemode || !correct || !rounds || !pointsGained) {
    return router.push("/play");
  }
  
  const handleNewGameSelection = (route: string) => {
    router.push(`/game?gamemode=${route}`);
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

  return (
    <>
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <h1 className="text-[1.5625rem] text-[#6E7E85] font-bold">Congrats! You completed the round!</h1>
          <p className="text-[1.25rem] text-[#6E7E85] font-normal">You guessed {correct} out of {rounds} correct</p>
          <p className="text-[1.5625rem] text-[#6E7E85] font-bold leading-[1.875rem]">
            <PartyPopper className="inline w-[3.125rem] h-[3.125rem] text-[#6E7E85] mr-[0.94rem]" /> You gained <span className="font-normal">{pointsGained}</span> points!
          </p>
          {gamemode !== "daily_challenge" && (
            <div className="flex-shrink-0 w-[22rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(243deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_155.46%)] rounded-[2.5rem] border-[5px] border-solid border-[#A5B5B8] sm:hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => {
              handleNewGameSelection(gamemode);
            }}>
              {gamemode == "images" && (
                <>
                  <ImagePlay className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
                  <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem] text-[rgba(28,_15,_19,_0.50)] flex items-center">Continue Images <ChevronRight className="stroke-[3]" /></p>
                </>
              )}

              {gamemode == "text" && (
                <>
                  <TextSearch className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
                  <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem] text-[rgba(28,_15,_19,_0.50)] flex items-center">Continue Text <ChevronRight className="stroke-[3]" /></p>
                </>
              )}
            </div>
          )}
          <div className="flex flex-col gap-4 md:flex-row md:gap-[3.12rem]">
            <div className="flex-shrink-0 w-[18.75rem] h-[4.6875rem] flex items-center justify-center bg-[linear-gradient(243deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_155.46%)] rounded-[2.5rem] border-[5px] border-solid border-[#A5B5B8] sm:hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => {
              if(gamemode == "images" || gamemode == "text") {
                handleNewGameSelection("daily_challenge");
              } else if(gamemode == "daily_challenge") {
                handleNewGameSelection("images");
              }
            }}>
              {(gamemode == "images" || gamemode == "text") && (
                <>
                  <CalendarClock className="w-[2.1875rem] h-[2.1875rem] text-[#6f7c85]" />
                  <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem] text-[rgba(28,_15,_19,_0.50)] flex items-center">Daily Challenge <ChevronRight className="stroke-[3]" /></p>
                </>
              )}

              {gamemode == "daily_challenge" && (
                <>
                  <ImagePlay className="w-[2.1875rem] h-[2.1875rem] text-[#6f7c85]" />
                  <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem] text-[rgba(28,_15,_19,_0.50)] flex items-center">Play Images <ChevronRight className="stroke-[3]" /></p>
                </>
              )}
            </div>
            <div className="flex-shrink-0 w-[18.75rem] h-[4.6875rem] flex items-center justify-center bg-[linear-gradient(243deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_155.46%)] rounded-[2.5rem] border-[5px] border-solid border-[#A5B5B8] sm:hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => {
              if(gamemode == "images" || gamemode == "daily_challenge") {
                handleNewGameSelection("text");
              } else if(gamemode == "text") {
                handleNewGameSelection("images");
              }
            }}>
              {(gamemode == "images" || gamemode == "daily_challenge") && (
                <>
                  <TextSearch className="w-[2.1875rem] h-[2.1875rem] text-[#6f7c85]" />
                  <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem] text-[rgba(28,_15,_19,_0.50)] flex items-center">Play Text <ChevronRight className="stroke-[3]" /></p>
                </>
              )}

              {gamemode == "text" && (
                <>
                  <ImagePlay className="w-[2.1875rem] h-[2.1875rem] text-[#6f7c85]" />
                  <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem] text-[rgba(28,_15,_19,_0.50)] flex items-center">Play Images <ChevronRight className="stroke-[3]" /></p>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
 
export default GameResultPage;