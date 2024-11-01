"use client";

import { Footer } from "@/components/footer";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
      <>
        <div className="min-h-full flex flex-col">
          <div className="flex items-center justify-center">
            <p className="text-[1.125rem]">Select the AI Generated Image</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center text-center gap-10 md:gap-[6.25rem] flex-1 px-6 py-10 md:py-2">
            <div className="w-[25rem] h-[25rem] rounded-[2.5rem] border-[5px] border-[rgba(110,_126,_133)] overflow-hidden relative select-none hover:scale-105 cursor-pointer transition-transform duration-300">
              <Image src="/testing/test_image.jpeg" layout="fill" objectFit="cover" draggable={false} alt="Image Option" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="w-[25rem] h-[25rem] rounded-[2.5rem] border-[5px] border-[rgba(110,_126,_133)] overflow-hidden relative select-none hover:scale-105 cursor-pointer transition-transform duration-300">
              <Image src="/testing/test_image_2.jpeg" layout="fill" objectFit="cover" draggable={false} alt="Image Option" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 justify-center text-center">
            <TriangleAlert className="text-[#6E7E85] w-3 h-3 md:w-6 md:h-6" />
            <p className="text-[0.75rem] md:text-[1.125rem]"><span className="font-bold">Tip:</span> Pay attention to repetition, distortions, and lack of details to distinguish AI generated images</p>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if(gamemode === "text") {
    return ( 
      <>
        <div className="min-h-full flex flex-col">
          <div className="flex items-center justify-center">
            <p className="text-[1.125rem]">Select the AI Generated Text Sample</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center text-center gap-10 md:gap-[6.25rem] flex-1 px-6 py-10 md:py-2">
            <div className="w-[25rem] h-[25rem] rounded-[2.5rem] hover:border-[5px] border-[rgba(110,_126,_133)] overflow-hidden relative select-none hover:scale-105 cursor-pointer transition-transform duration-300 flex items-center justify-center text-center p-10">
              <div>
                <h1 className="font-bold pb-3">Koi</h1>
                <p>Among heart-shaped leaves<br />the white fish gleams, red tail.<br />Soft lotuses sleep.</p>
              </div>
            </div>
            <div className="w-[25rem] h-[3px] md:w-[3px] md:h-[25rem] bg-[rgba(110,_126,_133)] rounded"></div>
            <div className="w-[25rem] h-[25rem] rounded-[2.5rem] hover:border-[5px] border-[rgba(110,_126,_133)] overflow-hidden relative select-none hover:scale-105 cursor-pointer transition-transform duration-300 flex items-center justify-center text-center p-10">
              <div>
                <h1 className="font-bold pb-3">Nature&apos;s Embrace</h1>
                <p>Whispers in the breeze,<br />Sunlight dances on the leaves,<br />Nature&apos;s soft embrace.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 justify-center text-center">
            <TriangleAlert className="text-[#6E7E85] w-3 h-3 md:w-6 md:h-6" />
            <p className="text-[0.75rem] md:text-[1.125rem]"><span className="font-bold">Tip:</span> Pay attention to lack of human error, punctuation, and detail to distinguish AI generated text</p>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if(gamemode === "daily_challenge") {
    return ( 
      <>
        <div className="min-h-full flex flex-col">
          <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
            <p>Daily Challenge Coming Soon</p>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}
 
export default GamePage;