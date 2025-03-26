import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useConvex, useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface IGameContext {
  levels: Id<"levels">[];
  currentRound: number;
  score: number;
  currentLevelId: Id<"levels"> | null;
  currentImageSrcUrls: string[];
  currentImageIds: Id<"images">[] | null;
  correctImageId: Id<"images"> | null;
  correctImageSrcUrl: string | null;
  copyrightInfo: string | null;
  generationPrompt: string | null;
  classification: string | null;
  groupName: string | null;
  hints: string[] | null;
  wasCorrect: boolean | null;
  isSubmittingGuess: boolean;
  imageHasBeenSelected: boolean;
  submitGuess: (selectedId: Id<"images">) => Promise<void>;
  nextRound: () => void;
  scoreAwarded: number | null;
  isLoading: boolean;
  globalAccuracy: number;
}

const GameContext = createContext<IGameContext | null>(null);

export const GameProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const router = useRouter();
  const convex = useConvex();

  const clerkUser = useUser();
  const user = useQuery(api.users.getUserByUsername, { username: clerkUser.user?.username ?? "" });

  const [levels, setLevels] = useState<Id<"levels">[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [currentLevelId, setCurrentLevel] = useState<Id<"levels"> | null>(null);
  const [currentImageSrcUrls, setCurrentImageSrcUrls] = useState<string[]>([]);
  const [currentImageIds, setCurrentImageIds] = useState<Id<"images">[]>([]);
  const [correctImageSrcUrl, setCorrectImageSrcUrl] = useState<string | null>(null);
  const [copyrightInfo, setCopyrightInfo] = useState<string | null>(null);
  const [generationPrompt, setGenerationPrompt] = useState<string | null>(null);
  const [classification, setClassification] = useState<string | null>(null);
  const [groupName, setGroupName] = useState<string | null>(null);
  const [hints, setHints] = useState<string[] | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [cacheBuster] = useState(Math.random());
  const [imageHasBeenSelected, setImageHasBeenSelected] = useState(false);
  const [isSubmittingGuess, setIsSubmittingGuess] = useState(false);
  const [correctImageId, setCorrectImageId] = useState<Id<"images"> | null>(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [scoreAwarded, setScoreAwarded] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [globalAccuracy, setGlobalAccuracy] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allScores, setAllScores] = useState<number[]>([]);

  const [randomSeed] = useState(Math.random().toString());
  const imageSrcs = useQuery(api.game.getImageSrcs, currentLevelId ? { levelId: currentLevelId } : "skip");
  const imageIds = useQuery(api.game.getImageIds, currentLevelId ? { levelId: currentLevelId } : "skip");
  const checkGuess = useMutation(api.game.checkGuess);
  const finishGame = useMutation(api.game.finishGame);

  useEffect(() => {
    const fetchLevels = async () => {
      const levelIds = await convex.query(api.game.getRandomLevels, { cacheBuster, numOfLevels: 5n, seed: randomSeed });
      setLevels(levelIds);
      setCurrentRound(1);
      setCurrentLevel(levelIds[0]);
    };

    fetchLevels();
  }, [convex, cacheBuster, randomSeed]);

  useEffect(() => {
    if(currentLevelId && imageSrcs && imageIds) {
      // Pair the image src and id together
      const pairedArray = imageSrcs
        .map((src, index) => ( { src, id: imageIds[index] }))
        .filter(pair => pair.src !== null);

      // shuffle the order
      const shuffledArray = pairedArray.sort(() => Math.random() - 0.5);

      // set the values
      setCurrentImageSrcUrls(shuffledArray.map(pair => pair.src).filter(src => src !== null) as string[]);
      setCurrentImageIds(shuffledArray.map(pair => pair.id));
    }
  }, [currentLevelId, imageSrcs, imageIds]);

  const submitGuess = async (selectedImageId: Id<"images">) => {
    if(!currentLevelId) return;

    setIsSubmittingGuess(true);
    
    try {
      const result = await checkGuess({ levelId: currentLevelId, selectedImageId });

      setImageHasBeenSelected(true);

      setCorrectImageId(result.correctImageId);
      setCorrectImageSrcUrl(currentImageSrcUrls[currentImageIds.findIndex(id => id === result.correctImageId)]);
      setCopyrightInfo(null); // TODO
      setGenerationPrompt(result.aiImagePrompt!);
      setClassification(result.classification);
      setGroupName(result.groupName);
      setHints(result.hints);
      setWasCorrect(result.correct);

      setScore(prevScore => prevScore + result.score);
      setCorrectGuesses(prev => result.correct ? prev + 1 : prev);

      setScoreAwarded(result.score);
      setAllScores(prevScores => [...prevScores, result.score]);

      setGlobalAccuracy(Number(result.globalAccuracy));
    } catch (error) {
      console.error("Error submitting guess:", error);
    } finally {
      setIsSubmittingGuess(false);
    }
  };

  const nextRound = async () => {
    const nextRoundNumber = currentRound + 1;

    if(nextRoundNumber > levels.length) {      
      const endOfGameResult = await finishGame({ points: BigInt(score), userID: user?._id ?? undefined });

      const query = new URLSearchParams({
        gamemode: "images", // TODO: Change this based on actual gamemode in the future
        correct: correctGuesses.toString(),
        rounds: levels.length.toString(),
        points: endOfGameResult.earnedPoints.toString(),
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
      setCorrectImageSrcUrl(null);
      setCopyrightInfo(null);
      setGenerationPrompt(null);
      setClassification(null);
      setGroupName(null);
      setHints(null);
      setWasCorrect(null);
      setScoreAwarded(null);
      setGlobalAccuracy(0);
    }
  };

  useEffect(() => {
    if(levels.length === 0 || (currentLevelId && imageSrcs === undefined)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [levels, currentLevelId, imageSrcs]);

  if(isLoading) {
    return (
      <GameContext.Provider value={{
        levels,
        currentRound,
        score,
        currentLevelId,
        currentImageSrcUrls,
        currentImageIds,
        correctImageId,
        correctImageSrcUrl,
        copyrightInfo,
        generationPrompt,
        classification,
        groupName,
        hints,
        wasCorrect,
        isSubmittingGuess,
        imageHasBeenSelected,
        submitGuess,
        nextRound,
        scoreAwarded,
        isLoading,
        globalAccuracy
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
      correctImageId,
      correctImageSrcUrl,
      copyrightInfo,
      generationPrompt,
      classification,
      groupName,
      hints,
      wasCorrect,
      isSubmittingGuess,
      imageHasBeenSelected,
      submitGuess,
      nextRound,
      scoreAwarded,
      isLoading,
      globalAccuracy
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Export the hook so that components can use game context
export const useGame = () => useContext(GameContext);