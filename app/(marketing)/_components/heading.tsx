"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { CopyCheck, GraduationCap, Save, Share } from "lucide-react";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-[2.8125rem] font-[700]">Learn to identify <span className="font-[400] text-[3.125rem] bg-gradient-to-r from-[#565373] to-[#6E7E85] bg-clip-text text-transparent">AI</span></h1>
      <h3 className="text-[1.25rem] font-[400]">
        Through <span className="text-[#6E7E85] text-[1.25rem] font-[700]">images</span>, <span className="text-[#6A6884] text-[1.25rem] font-[700]">text</span>, and more, learn to identify <span className="text-[rgba(28,_15,_19,_0.75)] text-[1.25rem] font-[700]">AI generated content</span> in the real world!
      </h3>
      {!isAuthenticated && !isLoading && (
        <SignUpButton mode="modal">
          <Button variant="default_gradient" size="sm" className="text-[rgba(28,_15,_19,_0.50)] font-[400]">
            Sign up to play
          </Button>
        </SignUpButton>
      )}
      {isAuthenticated && !isLoading && (
        <Button variant="default_gradient" size="sm" className="text-[rgba(28,_15,_19,_0.50)] font-[400]">
          Play a game
        </Button>
      )}
      <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-4">
        <div className="w-full lg:w-[17.1875rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(239deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_219.48%)] rounded-[4.0625rem]">
          <Save className="w-[3.125rem] h-[3.125rem] text-[#1C0F13]" />
          <p className="pt-2 text-center font-[400] text-[1.25rem]">Save your progress online</p>
        </div>
        <div className="w-full lg:w-[17.1875rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(239deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_219.48%)] rounded-[4.0625rem]">
          <Share className="w-[3.125rem] h-[3.125rem]" />
          <p className="pt-2 text-center font-[400] text-[1.25rem]">Share scores with friends</p>
        </div>
        <div className="w-full lg:w-[17.1875rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(239deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_219.48%)] rounded-[4.0625rem]">
          <GraduationCap className="w-[3.125rem] h-[3.125rem]" />
          <p className="pt-2 text-center font-[400] text-[1.25rem]">Learn important detection skills</p>
        </div>
        <div className="w-full lg:w-[17.1875rem] h-[10.9375rem] flex flex-col items-center justify-center bg-[linear-gradient(239deg,_rgba(183,_206,_206,_0.85)_0%,_rgba(110,_125,_133,_0.72)_219.48%)] rounded-[4.0625rem]">
          <CopyCheck className="w-[3.125rem] h-[3.125rem]" />
          <p className="pt-2 text-center font-[400] text-[1.25rem]">Practice with Images and Text</p>
        </div>
      </div>
    </div>
  )
}