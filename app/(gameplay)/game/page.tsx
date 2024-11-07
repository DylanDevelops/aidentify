"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ImageGame from "@/app/(gameplay)/game/_components/ImageGame";
import TextGame from "@/app/(gameplay)/game/_components/TextGame";
import DailyChallengeGame from "@/app/(gameplay)/game/_components/DailyChallengeGame";
import { GameProvider } from "./_context/GameContext";

const GamePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const gamemode = searchParams.get('gamemode');

  useEffect(() => {
    if (!gamemode 
      || (gamemode !== "images"
      && gamemode !== "text"
      && gamemode !== "daily_challenge")
    ) {
      router.push('/play');
    }
  }, [gamemode, router]);

  if(gamemode === "images") {
    return (
      <GameProvider>
        <ImageGame />
      </GameProvider>
    );
  }

  if(gamemode === "text") {
    return <TextGame />;
  }

  if(gamemode === "daily_challenge") {
    return <DailyChallengeGame />;
  }

  return null;
}

export default GamePage;