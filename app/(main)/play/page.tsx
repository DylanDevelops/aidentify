import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";
import { Footer } from "@/components/footer";
import { CalendarClock, ImagePlay, TextSearch } from "lucide-react";

const PlayPage = () => {
  return ( 
    <>
      <FancyBackgroundGradient />
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <div className="flex flex-col justify-center gap-[2.81rem]">
            <div className="flex-shrink-0 w-[22rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(101deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(187,_186,_198,_0.85)_100%)] rounded-[2.5rem] border-[5px] border-solid border-[#6E7E85] hover:scale-105 transition-transform duration-300 cursor-pointer">
              <CalendarClock className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
              <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem]">Daily Challenge</p>
            </div>
            <div className="flex-shrink-0 w-[22rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(243deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_155.46%)] rounded-[2.5rem] border-[5px] border-solid border-[#6E7E85] hover:scale-105 transition-transform duration-300 cursor-pointer">
              <ImagePlay className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
              <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem]">Play Images</p>
            </div>
            <div className="flex-shrink-0 w-[22rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(56deg,_rgba(187,_186,_198,_0.85)_0%,_rgba(86,_83,_115,_0.72)_202.26%)] rounded-[2.5rem] border-[5px] border-solid border-[#6E7E85] hover:scale-105 transition-transform duration-300 cursor-pointer">
              <TextSearch className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
              <p className="pt-2 text-center mr-2 ml-2 font-[700] text-[1.375rem]">Play Text</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
 
export default PlayPage;