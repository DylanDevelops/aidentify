"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { CircleHelp, Flame, Settings, Trophy } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const clerkUser = useUser();

  const [isUserLoading, setIsUserLoading] = useState(true);
  useEffect(() => {
    if(clerkUser !== undefined) {
      setIsUserLoading(false);
    }
  }, [clerkUser]);

  return (
    <>
      <div className={cn(
        "z-50 bg-transparent fixed top-0 flex flex-col w-full",
        scrolled && "backdrop-blur-xl shadow-md"
      )}>
        <div className="flex justify-between items-center gap-x-2 w-full">
          <div className="mr-2 pt-6 pl-6 pb-2"><Logo clickable={true} href="/" /></div>
          <div className="ml-auto pt-6 pr-6 pb-2 space-x-2 flex items-center">
            {!isAuthenticated  && !isLoading && (
              <SignInButton mode="modal">
                <Button variant="default_gradient" size="sm" className="text-[rgba(28,_15,_19,_0.50)] font-[700]">
                  Login
                </Button>
              </SignInButton>
            )}
            {isAuthenticated  && !isLoading && !isUserLoading && (
              <div className="relative">
                <div className="absolute left-[-3.5rem] right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#B7CECE] to-[#BBBAC6] rounded-[3.125rem] border border-[rgba(110,_126,_133,_0.25)] p-1.5 flex items-center">
                  <span className="mx-1 text-[1.25rem] text-[#1C0F13]">{0}</span>
                  <Flame className="h-6 w-6 text-[#1C0F13] fill-[#1C0F13]" />
                </div>
                <Avatar className="border-[3.5px] border-[#6E7E85] w-11 h-11">
                  <AvatarImage src={clerkUser.user?.imageUrl} />
                  <AvatarFallback>{clerkUser.user?.username?.[0].toUpperCase() ?? ""}</AvatarFallback>
                </Avatar>
              </div>
            )}
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