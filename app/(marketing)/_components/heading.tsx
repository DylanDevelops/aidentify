"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/clerk-react";

export const Heading = () => {
  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-[2.8125rem] font-[700]">Learn to identify <span className="font-[400] text-[3.125rem] bg-gradient-to-r from-[#565373] to-[#6E7E85] bg-clip-text text-transparent">AI</span></h1>
      <h3 className="text-[1.25rem] font-[400]">
        Through <span className="text-[#6E7E85] text-[1.25rem] font-[700]">images</span>, <span className="text-[#6A6884] text-[1.25rem] font-[700]">text</span>, and more, learn to identify <span className="text-[rgba(28,_15,_19,_0.75)] text-[1.25rem] font-[700]">AI generated content</span> in the real world!
      </h3>
      <SignUpButton mode="modal">
        <Button variant="default_gradient" size="sm" className="text-[rgba(28,_15,_19,_0.50)] font-[400]">
          Sign up to play
        </Button>
      </SignUpButton>
    </div>
  )
}