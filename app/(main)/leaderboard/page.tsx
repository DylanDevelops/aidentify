"use client";

import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";
import { Footer } from "@/components/footer";
import { Loader2, Medal } from "lucide-react";

import "./leaderboard.css";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import DesktopLeaderboard from "./_components/desktop-leaderboard";
import MobileLeaderboard from "./_components/mobile-leaderboard";

const LeaderboardPage = () => {
  const topUsers = useQuery(api.users.getLeaderboardEntries);
  const clerkUser = useUser();
  const user = useQuery(api.users.getUserByUsername, { username: clerkUser.user?.username ?? "" });
  const { isAuthenticated, isLoading } = useConvexAuth();

  const [areEntriesLoading, setAreEntriesLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if(topUsers !== undefined) {
      setAreEntriesLoading(false);
    }

    if(user !== undefined) {
      setIsUserLoading(false);
    }
  }, [topUsers, user]);

  if(!topUsers || areEntriesLoading || isUserLoading || (!isAuthenticated && isLoading)) {
    return (
      <>
        <div className="min-h-full flex flex-col">
          <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
            <Loader2 className="w-32 h-32 animate-spin" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <FancyBackgroundGradient />
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <Medal className="w-20 h-20 text-[hsla(198,_9%,_48%,_1)]" />
          <h1 className="text-[2.5rem] font-bold text-[hsla(198,_9%,_48%,_0.75)]">Leaderboard</h1>
          <DesktopLeaderboard
            topUsers={topUsers}
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            user={user}
          />
          <MobileLeaderboard
            topUsers={topUsers}
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            user={user}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};
 
export default LeaderboardPage;