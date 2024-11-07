import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface IGameContext {
  levels: Id<"levels">[];
  currentRound: number;
  score: number;
  currentLevelId: Id<"levels"> | null;
  currentImageSrcUrls: string[];
  currentImageIds: Id<"images">[] | null;
  isSubmittingGuess: boolean;
  imageHasBeenSelected: boolean;
  submitGuess: (selectedId: Id<"images">) => Promise<void>;
  nextRound: () => void;
  scoreAwarded: number | null;
  isLoading: boolean;
}

const GameContext = createContext<IGameContext | null>(null);

export const GameProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const router = useRouter();
  const user = useUser();

  const [levels, setLevels] = useState<Id<"levels">[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [currentLevelId, setCurrentLevel] = useState<Id<"levels"> | null>(null);
  const [currentImageSrcUrls, setCurrentImageSrcUrls] = useState<string[]>([]);
  const [currentImageIds, setCurrentImageIds] = useState<Id<"images">[]>([]);
  const [cacheBuster] = useState(Math.random());
  const [imageHasBeenSelected, setImageHasBeenSelected] = useState(false);
  const [isSubmittingGuess, setIsSubmittingGuess] = useState(false);
  const [correctImageId, setCorrectImageId] = useState<Id<"images"> | null>(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [scoreAwarded, setScoreAwarded] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [allScores, setAllScores] = useState<number[]>([]);

  const levelIds = useQuery(api.game.getRandomLevels, { cacheBuster, numOfLevels: 2n });
  const imageSrcs = useQuery(api.game.getImageSrcs, currentLevelId ? { levelId: currentLevelId } : "skip");
  const imageIds = useQuery(api.game.getImageIds, currentLevelId ? { levelId: currentLevelId } : "skip");
  const checkGuess = useMutation(api.game.checkGuess);

  useEffect(() => {
    if(levelIds) {
      setLevels(levelIds);
      setCurrentRound(1);
      setCurrentLevel(levelIds[0]);
    }
  }, [levelIds]);

  useEffect(() => {
    if(currentLevelId && imageSrcs && imageIds) {
      setCurrentImageSrcUrls(imageSrcs.filter((src): src is string => src !== null));
      setCurrentImageIds(imageIds);
    }
  }, [currentLevelId, imageSrcs, imageIds]);

  const submitGuess = async (selectedImageId: Id<"images">) => {
    if(!currentLevelId) return;

    setIsSubmittingGuess(true);
    
    try {
      const result = await checkGuess({ levelId: currentLevelId, selectedImageId });

      setImageHasBeenSelected(true);

      setScore(prevScore => prevScore + result.score);
      setCorrectImageId(result.correctImageId);
      setCorrectGuesses(prev => result.correct ? prev + 1 : prev);

      setScoreAwarded(result.score);
      setAllScores(prevScores => [...prevScores, result.score]);
    } catch (error) {
      console.error("Error submitting guess:", error);
    } finally {
      setIsSubmittingGuess(false);
    }
  };

  const nextRound = () => {
    const nextRoundNumber = currentRound + 1;

    if(nextRoundNumber > levels.length) {      
      const query = new URLSearchParams({
        gamemode: "images", // TODO: Change this based on actual gamemode in the future
        correct: correctGuesses.toString(),
        rounds: levels.length.toString(),
        points: score.toString(),
      });

      router.push(`/results?${query.toString()}`);
    } else {
      setCurrentRound(currentRound + 1);
      const nextLevel = levels[nextRoundNumber - 1];
      if(nextLevel) {
        setCurrentLevel(nextLevel);
      }

      setImageHasBeenSelected(false);
      setCorrectImageId(null);
      setScoreAwarded(null);
    }
  };

  useEffect(() => {
    if(levelIds === undefined || (currentLevelId && imageSrcs === undefined)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [levelIds, currentLevelId, imageSrcs]);

  if(isLoading) {
    return (
      <GameContext.Provider value={{
        levels,
        currentRound,
        score,
        currentLevelId,
        currentImageSrcUrls,
        currentImageIds,
        isSubmittingGuess,
        imageHasBeenSelected,
        submitGuess,
        nextRound,
        scoreAwarded,
        isLoading
      }}>
        {children}
      </GameContext.Provider>
    );
  }

  return (
    <GameContext.Provider value={{
      levels,
      currentRound,
      score,
      currentLevelId,
      currentImageSrcUrls,
      currentImageIds,
      isSubmittingGuess,
      imageHasBeenSelected,
      submitGuess,
      nextRound,
      scoreAwarded,
      isLoading
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Export the hook so that components can use game context
export const useGame = () => useContext(GameContext);