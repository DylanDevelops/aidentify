"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { CopyCheck, GraduationCap, Save, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-[2.8125rem] text-[rgba(28,_15,_19,_0.75)] font-[700]">Learn to identify <span className="font-[400] text-[3.125rem] font-RussoOne bg-gradient-to-r from-[#565373] to-[#6E7E85] bg-clip-text text-transparent">AI</span></h1>
      <h3 className="text-[1.25rem] text-[rgba(28,_15,_19,_0.75)] font-[400]">
        Through <span className="text-[#6E7E85] text-[1.25rem] font-[700]">images</span>, <span className="text-[#6A6884] text-[1.25rem] font-[700]">text</span>, and more, learn to identify <span className="text-[rgba(28,_15,_19,_0.75)] text-[1.25rem] font-[700]">AI-generated material</span> in the real world!
      </h3>
      {!isAuthenticated && !isLoading && (
        <SignUpButton>
          <Button variant="default_gradient" className="text-[rgba(28,_15,_19,_0.50)] font-[400] w-[10.9375rem] h-[3.125rem] text-lg rounded-[3.125rem] hover:scale-105 transition-transform duration-300">
            Sign up to play
          </Button>
        </SignUpButton>
      )}
      {isAuthenticated && !isLoading && (
        <Button variant="default_gradient" className="text-[rgba(28,_15,_19,_0.50)] font-[400] w-[10.9375rem] h-[3.125rem] text-lg rounded-[3.125rem] hover:scale-105 transition-transform duration-300" onClick={() => {
          router.push("/play");
        }}>
          Play a game
        </Button>
      )}
      <div className="flex flex-col lg:flex-row lg:pt-[4.94rem] justify-center gap-4">
        <div className="flex-shrink-0 w-full lg:w-[17.1875rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(239deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_219.48%)] rounded-[3.75rem] lg:translate-y-0 border-[5px] border-solid border-[#A5B5B8] lg:animate-float" style={{ '--initial-translate-y': '0px', animationDelay: '0s' } as CSSProperties}>
          <Save className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
          <p className="pt-2 text-center mr-2 ml-2 font-[400] text-[1.25rem] text-[rgba(28,_15,_19,_0.50)]">Save your progress online</p>
        </div>
        <div className="flex-shrink-0 w-full lg:w-[17.1875rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(239deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_219.48%)] rounded-[3.75rem] lg:translate-y-[-2.9rem] border-[5px] border-solid border-[#A5B5B8] lg:animate-float" style={{ '--initial-translate-y': '-2.9rem', animationDelay: '3s' } as CSSProperties}>
          <Share className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
          <p className="pt-2 text-center mr-2 ml-2 font-[400] text-[1.25rem] text-[rgba(28,_15,_19,_0.50)]">Share scores with friends</p>
        </div>
        <div className="flex-shrink-0 w-full lg:w-[17.1875rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(239deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_219.48%)] rounded-[3.75rem] lg:translate-y-[10px] border-[5px] border-solid border-[#A5B5B8] lg:animate-float" style={{ '--initial-translate-y': '10px', animationDelay: '0s' } as CSSProperties}>
          <GraduationCap className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
          <p className="pt-2 text-center mr-2 ml-2 font-[400] text-[1.25rem] text-[rgba(28,_15,_19,_0.50)]">Learn important detection skills</p>
        </div>
        <div className="flex-shrink-0 w-full lg:w-[17.1875rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(239deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_219.48%)] rounded-[3.75rem] lg:translate-y-[-2.9rem] border-[5px] border-solid border-[#A5B5B8] lg:animate-float" style={{ '--initial-translate-y': '-2.9rem', animationDelay: '3s' } as CSSProperties}>
          <CopyCheck className="w-[3.125rem] h-[3.125rem] text-[#6f7c85]" />
          <p className="pt-2 text-center mr-2 ml-2 font-[400] text-[1.25rem] text-[rgba(28,_15,_19,_0.50)]">Practice with Images and Text</p>
        </div>
      </div>
    </div>
  );
};