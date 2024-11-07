import { Footer } from "@/components/footer";
import { Loader2, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useGame } from "../_context/GameContext";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

const ImageGame = () => {
  const {
    levels,
    currentRound,
    score,
    currentLevelId,
    currentImageSrcUrls,
    currentImageIds,
    isSubmittingGuess,
    submitGuess,
    nextRound,
    scoreAwarded,
    isLoading
  } = useGame()!;

  const handleSubmittingGuess = (selectedImageId: Id<"images">) => {
    submitGuess(selectedImageId);
  };

  const handleNextRound = () => {
    nextRound();
  };

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex items-center justify-center">
        <p className="text-[1.125rem]">Select the AI Generated Image</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center text-center gap-10 md:gap-[6.25rem] flex-1 px-6 py-10 md:py-2">
        <div className="w-[25rem] h-[25rem] rounded-[2.5rem] border-[5px] border-[rgba(110,_126,_133)] overflow-hidden relative select-none sm:hover:scale-105 cursor-pointer transition-transform duration-300" onClick={() => {
          if(isLoading) return;

          handleSubmittingGuess(currentImageIds![0]);
        }}>
          { (isLoading) ? (
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="w-1/2 h-1/2 animate-spin" />
            </div>
          ) : (
            <Image src={currentImageSrcUrls[0]} layout="fill" objectFit="cover" draggable={false} alt="Image Option" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>
        <div className="w-[25rem] h-[25rem] rounded-[2.5rem] border-[5px] border-[rgba(110,_126,_133)] overflow-hidden relative select-none sm:hover:scale-105 cursor-pointer transition-transform duration-300" onClick={() => {
          if(isLoading) return;

          handleSubmittingGuess(currentImageIds![1]);
        }}>
          { (isLoading) ? (
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="w-1/2 h-1/2 animate-spin" />
            </div>
          ) : (
            <Image src={currentImageSrcUrls[1]} layout="fill" objectFit="cover" draggable={false} alt="Image Option" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 justify-center text-center">
        <TriangleAlert className="text-[#6E7E85] w-3 h-3 md:w-6 md:h-6" />
        <p className="text-[0.75rem] md:text-[1.125rem]"><span className="font-bold">Tip:</span> Pay attention to repetition, distortions, and lack of details to distinguish AI generated images</p>
      </div>
      <Footer />
    </div>
  );
};

export default ImageGame;
