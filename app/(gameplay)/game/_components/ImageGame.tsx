import { Footer } from "@/components/footer";
import { Check, ChevronLeft, ChevronRight, Loader2, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import { useGame } from "../_context/GameContext";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

const ImageGame = () => {
  const {
    levels,
    currentRound,
    currentImageSrcUrls,
    currentImageIds,
    correctImageSrcUrl,
    generationPrompt,
    hints,
    wasCorrect,
    isSubmittingGuess,
    imageHasBeenSelected,
    submitGuess,
    nextRound,
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
      {!imageHasBeenSelected && !isSubmittingGuess ? (
        <>
          <div className="flex items-center justify-center">
            <p className="text-[1.125rem] text-[#6E7E85]">Select the AI Generated Image</p>
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
            <p className="text-[0.75rem] text-[#6A6884] md:text-[1.125rem]"><span className="font-bold">Tip:</span> Pay attention to repetition, distortions, and lack of details to distinguish AI generated images</p>
          </div>
        </>
      ) : (isSubmittingGuess) ? (
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <Loader2 className="w-32 h-32 animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center flex-1 md:gap-6">
            <div className="flex flex-col items-center justify-center">
              {wasCorrect ? (
                <h1 className="text-[1.5625rem] text-[#6E7E85] font-bold mb-4">Congrats! You selected the correct image!</h1>
              ) : (
                <h1 className="text-[1.5625rem] text-[#6E7E85] font-bold mb-4">Sorry! You selected the incorrect image!</h1>
              )}
              <p className="text-[1.25rem] text-[rgba(86,_83,_115,_0.75)] font-normal mb-4">70% of users guessed this image correctly</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center text-center gap-10 md:gap-[2rem] px-6 py-10 md:py-2">
              <div className="w-[18.75rem] h-[18.75rem] rounded-[2.5rem] border-[5px] border-[rgba(110,_126,_133)] overflow-hidden relative select-none transition-transform duration-300">
                {isLoading ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <Loader2 className="w-1/2 h-1/2 animate-spin" />
                  </div>
                ) : (
                  <>
                    <Image src={correctImageSrcUrl!} layout="fill" objectFit="cover" draggable={false} alt="Image Option" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {wasCorrect ? (
                        <Check className="w-[15rem] h-[15rem] text-[#E2E2E2] drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))' }} />
                      ) : (
                        <X className="w-[15rem] h-[15rem] text-[#E2E2E2] drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))' }} />
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="w-[25rem] h-[18.75rem] rounded-[2.5rem] border-[5px] border-[rgba(110,_126,_133)] bg-[linear-gradient(101deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(187,_186,_198,_0.85)_100%)] overflow-hidden relative select-none transition-transform duration-300">
                {/* TODO: fix p-[4.5rem] should be for the div below. */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-[2rem] gap-6 overflow-y-auto min-h-[18.75rem]">
                  <h1 className="font-bold text-[rgba(28,_15,_19,_0.75)] text-[1.25rem]">AI Image Prompt</h1>
                  <p className="font-normal text-[rgba(28,_15,_19,_0.50)] text-[1.25rem]">{generationPrompt}</p>
                </div>
              </div>
              <div className="w-[25rem] h-[18.75rem] rounded-[2.5rem] border-[5px] border-[rgba(110,_126,_133)] bg-[linear-gradient(101deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(187,_186,_198,_0.85)_100%)] overflow-hidden relative select-none transition-transform duration-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-[4.5rem] gap-6">
                  <h1 className="font-bold text-[rgba(28,_15,_19,_0.75)] text-[1.25rem]">AI Giveaways</h1>
                  <p className="font-normal text-[rgba(28,_15,_19,_0.50)] text-[1.25rem]">
                    <ul className="list-disc list-inside">
                      {hints?.map((hint, index) => (
                        <li key={index}>{hint}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
            <Button variant="default_gradient" className="font-[400] w-[10.9375rem] h-[3.125rem] text-[rgba(28,_15,_19,_0.50)] text-lg rounded-[3.125rem]" onClick={() => {
              handleNextRound();
            }}>
              Next Image <ChevronRight className="stroke-[3]" />
            </Button>
            <p className="text-[1.25rem] text-[rgba(86,_83,_115,_0.75)] font-normal mb-4 flex flex-row align-middle justify-center items-center mt-10 md:mt-0">
              <ChevronLeft /> {currentRound} of {levels.length} <ChevronRight />
            </p>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default ImageGame;
