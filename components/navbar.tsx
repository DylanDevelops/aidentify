"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { CircleHelp, Flame, LogOut, Menu, Moon, Settings, Sun, Trophy } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { ProfileMenubar, ProfileMenubarContent, ProfileMenubarItem, ProfileMenubarMenu, ProfileMenubarSeparator, ProfileMenubarTrigger } from "./ui/profile-menubar";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const clerkUser = useUser();
  const { signOut, openUserProfile } = useClerk();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [isUserLoading, setIsUserLoading] = useState(true);
  useEffect(() => {
    if(clerkUser !== undefined) {
      setIsUserLoading(false);
    }
  }, [clerkUser]);

  const pathname = usePathname();

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
                <ProfileMenubar>
                  <ProfileMenubarMenu>
                    <ProfileMenubarTrigger>
                      <div className="absolute left-[-3.5rem] right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#B7CECE] to-[#BBBAC6] rounded-[3.125rem] border border-[rgba(110,_126,_133,_0.25)] p-1.5 flex items-center">
                        <span className="mx-1 text-[1.25rem] text-[#1C0F13]">{0}</span>
                        <Flame className="h-6 w-6 text-[#1C0F13] fill-[#1C0F13]" />
                      </div>
                      <Avatar className="border-[3.5px] border-[#6E7E85] w-11 h-11 relative top-[1.25px]">
                        <AvatarImage src={clerkUser.user?.imageUrl} />
                        <AvatarFallback>{clerkUser.user?.username?.[0].toUpperCase() ?? ""}</AvatarFallback>
                      </Avatar>
                    </ProfileMenubarTrigger>
                    <ProfileMenubarContent>
                      <ProfileMenubarItem className="cursor-pointer" onClick={() => {
                        setTheme(theme === "light" ? "dark" : "light");
                      }}><Sun className="dark:block hidden h-4 w-4 mr-2" /><Moon className="dark:hidden block h-4 w-4 mr-2" /> Toggle Appearance</ProfileMenubarItem>
                      <ProfileMenubarSeparator />
                      <ProfileMenubarItem className="cursor-pointer" onClick={() => {
                        signOut({ redirectUrl: '/' });
                      }}><LogOut className="h-4 w-4 mr-2" />Logout</ProfileMenubarItem>
                    </ProfileMenubarContent>
                  </ProfileMenubarMenu>
                </ProfileMenubar>
              </div>
            )}
          </div>
        </div>
        <div className="w-full px-6">
          <div className="border-t rounded-sm border-2 border-[#B7CECE]"></div>
        </div>
        <div className="flex justify-between items-center py-2 px-6">
          <div className="hidden md:flex justify-start space-x-1 py-2 px-6">
            <Button variant="ghost" className={cn(
              "text-[1.25rem] text-[#6E7E85] font-[400]",
              pathname === "/" && "font-[700]"
            )} onClick={() => {
              router.push("/");
            }}>Home</Button>
            <Button variant="ghost" className={cn(
              "text-[1.25rem] text-[#6E7E85] font-[400]",
              pathname === "/play" && "font-[700]"
            )} onClick={() => {
              router.push("/play");
            }}>Play</Button>
            <Button variant="ghost" className={cn(
              "text-[1.25rem] text-[#6E7E85] font-[400]",
              pathname === "/about" && "font-[700]"
            )} onClick={() => {
              router.push("/about");
            }}>About</Button>
          </div>
          <div className="flex md:hidden justify-start space-x-1 py-2 px-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <Link href="/">
                  <DropdownMenuItem>
                    Home
                  </DropdownMenuItem>
                </Link>
                <Link href="/play">
                  <DropdownMenuItem>
                    Play
                  </DropdownMenuItem>
                </Link>
                <Link href="/about">
                  <DropdownMenuItem>
                    About
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-start space-x-1 py-2 px-6">
            <Button variant="ghost" size="icon" onClick={() => {
              openUserProfile();
            }}><Settings className="text-[#6E7E85] font-[400]" /></Button>
            <Button variant="ghost" size="icon" onClick={() => {
              router.push("/help");
            }}><CircleHelp className={cn(
                "text-[#6E7E85] font-[400]",
                pathname === "/help" && "stroke-[3]"
              )} /></Button>
            <Button variant="ghost" size="icon" onClick={() => {
              router.push("/leaderboard");
            }}><Trophy className={cn(
                "text-[#6E7E85] font-[400]",
                pathname === "/leaderboard" && "stroke-[3]"
              )} /></Button>
          </div>
        </div>
      </div>
    </>
  );
}