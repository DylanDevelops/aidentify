"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { CircleHelp, Fingerprint, Flame, LogOut, Menu, Settings, Trophy } from "lucide-react";
import { useConvexAuth, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { ProfileMenubar, ProfileMenubarContent, ProfileMenubarItem, ProfileMenubarMenu, ProfileMenubarTrigger } from "./ui/profile-menubar";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useAdminCheck } from "@/hooks/use-admin-check";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { isCurrentUserAdmin, isAdminCheckLoading } = useAdminCheck();
  const clerkUser = useUser();
  const user = useQuery(api.users.getUserByUsername, { username: clerkUser.user?.username ?? "" });
  const { signOut, openUserProfile } = useClerk();
  // const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [isUserLoading, setIsUserLoading] = useState(true);
  useEffect(() => {
    if(clerkUser !== undefined) {
      setIsUserLoading(false);
    }
  }, [clerkUser]);

  const pathname = usePathname();

  const leftPosition = `-${3 + (user?.currentStreak.toString().length || 1) * 0.5}rem`;

  return (
    <>
      <div className={cn(
        "z-50 bg-transparent fixed top-0 flex flex-col w-full",
        scrolled && "backdrop-blur-xl shadow-md"
      )}>
        <div className="flex justify-between items-center gap-x-2 w-full">
          <div className="mr-2 pt-6 pl-6 pb-2"><Logo clickable={true} href="/" /></div>
          <div className="ml-auto pt-6 pr-6 pb-2 space-x-2 flex items-center">
            {!isAuthenticated  && !isLoading && !isAdminCheckLoading && (
              <SignInButton>
                <Button variant="default_gradient" size="sm" className="text-[rgba(28,_15,_19,_0.50)] font-[700] w-[6.25rem] h-[3.125rem] text-lg rounded-[3.125rem]">
                  Login
                </Button>
              </SignInButton>
            )}
            {
              isAuthenticated  
            && !isLoading 
            && !isAdminCheckLoading
            && !isUserLoading 
            && user?.picture !== undefined && 
            (
              <div className="relative">
                <ProfileMenubar>
                  <ProfileMenubarMenu>
                    <ProfileMenubarTrigger>
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#B7CECE] to-[#BBBAC6] rounded-[3.125rem] border border-[rgba(110,_126,_133,_0.25)] p-1.5 flex items-center" style={{ left: leftPosition }}>
                        <p className="mx-1 text-[1.25rem] text-[#1C0F13]">{user?.currentStreak.toString()}</p>
                        <Flame className="h-6 w-6 text-[#1C0F13] fill-[#1C0F13]" />
                      </div>
                      <Avatar className="border-[3.5px] border-[#6E7E85] w-11 h-11 relative top-[1.25px]">
                        <AvatarImage src={user?.picture} />
                        <AvatarFallback>{user?.username[0].toUpperCase() ?? ""}</AvatarFallback>
                      </Avatar>
                    </ProfileMenubarTrigger>
                    <ProfileMenubarContent align="end">
                      {/* <ProfileMenubarItem className="cursor-pointer" onClick={() => {
                        setTheme(theme === "light" ? "dark" : "light");
                      }}><Sun className="dark:block hidden h-4 w-4 mr-2" /><Moon className="dark:hidden block h-4 w-4 mr-2" /> Toggle Appearance</ProfileMenubarItem>
                      <ProfileMenubarSeparator /> */}
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
            {isAuthenticated && (
              <Button variant="ghost" size="icon" onClick={() => {
                openUserProfile();
              }}><Settings className="text-[#6E7E85] font-[400] cursor-pointer" /></Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <CircleHelp className="text-[#6E7E85] font-[400] cursor-pointer" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:rounded-[1.875rem] p-10">
                <div className="space-y-5">
                  <DialogHeader>
                    <h1 className="font-bold text-[1.875rem] text-[#6E7E85]">How to Play</h1>
                    <h2 className="font-normal text-[1.4375rem] text-[#6E7E85]">Choose which image is AI Generated</h2>
                  </DialogHeader>
                  <ul className="list-disc pl-6">
                    <li className="text-[#6E7E85]">Click on your guess to see the correct answer.</li>
                    <li className="text-[#6E7E85]">Use the hint below to help you decide.</li>
                    <li className="text-[#6E7E85]">As you play, you will get more hints to help you learn to identify AI generated images.</li>
                  </ul>
                  <p className="text-[#6E7E85]"><span className="font-bold">Tip:</span> Try <span className="font-bold">Text Mode</span> or the <span className="font-bold">Daily Challenge</span> for additional practice! <span className="font-bold">Sign up</span> for an account to save your progress.</p>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" onClick={() => {
              router.push("/leaderboard");
            }}><Trophy className={cn(
                "text-[#6E7E85] font-[400] cursor-pointer",
                pathname === "/leaderboard" && "stroke-[3]"
              )} /></Button>
            {isCurrentUserAdmin && (
              <Button variant="ghost" size="icon" onClick={() => {
                router.push("/admin");
              }}><Fingerprint className={cn(
                  "text-[#6E7E85] font-[400] cursor-pointer",
                  pathname === "/admin" && "stroke-[3]"
                )} /></Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};