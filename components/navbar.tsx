"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { CircleHelp, Settings, Trophy } from "lucide-react";

export const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <>
      <div className={cn(
        "z-50 bg-transparent fixed top-0 flex flex-col w-full",
        scrolled && "backdrop-blur-xl shadow-md"
      )}>
        <div className="flex justify-between items-center gap-x-2 w-full">
          <div className="mr-2 pt-6 pl-6 pb-2"><Logo clickable={true} href="/" /></div>
          <div className="ml-auto pt-6 pr-6 pb-2 space-x-2 flex items-center">
            <SignInButton mode="modal">
              <Button variant="default_gradient" size="sm" className="text-[rgba(28,_15,_19,_0.50)] font-[700]">
                Login
              </Button>
            </SignInButton>
          </div>
        </div>
        <div className="w-full px-6">
          <div className="border-t rounded-sm border-2 border-[#B7CECE]"></div>
        </div>
        <div className="flex justify-between items-center py-2 px-6">
          <div className="flex justify-start space-x-1 py-2 px-6">
            <Button variant="ghost" className="text-[1.25rem] text-[#6E7E85] font-[700]">Home</Button>
            <Button variant="ghost" className="text-[1.25rem] text-[#6E7E85] font-[400]">Play</Button>
            <Button variant="ghost" className="text-[1.25rem] text-[#6E7E85] font-[400]">About</Button>
          </div>
          <div className="flex justify-start space-x-1 py-2 px-6">
            <Button variant="ghost" size="icon"><Settings color="#6E7E85" /></Button>
            <Button variant="ghost" size="icon"><CircleHelp color="#6E7E85" /></Button>
            <Button variant="ghost" size="icon"><Trophy color="#6E7E85" /></Button>
          </div>
        </div>
      </div>
    </>
  );
}