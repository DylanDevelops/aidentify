"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { LevelSelector } from "./_components/LevelSelector";

const GameplayPage = () => {
  const levels = useQuery(api.levels.list);
  const [selectedLevelID, setSelectedLevelID] = useState(-1)

  const onLevelSelected = (value: string) => {
    setSelectedLevelID(parseInt(value));
  }  

  return ( 
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <LevelSelector levels={levels} onValueChange={onLevelSelected}/>
        <p>Selected Level ID: {selectedLevelID}</p>
      </div>
    </div>
  );
}

export default GameplayPage;