"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useAdminCheck } from "@/hooks/use-admin-check";
import { useConvexAuth } from "convex/react";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const DeveloperLayout = ({
  children
} : {
    children: React.ReactNode;
}) => {
  const { isCurrentUserAdmin, isAdminCheckLoading } = useAdminCheck();
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();

  // If they are loading
  if (authLoading || isAdminCheckLoading) {
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

  // If they are not an admin or authenticated
  if (!isCurrentUserAdmin || !isAuthenticated) {
    return redirect("/");
  }

  return (
    <>
      <div className="h-full">
        <Navbar />
        <main className="h-full pt-40">
          <Suspense fallback={(
            <>
              <div className="min-h-full flex flex-col">
                <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
                  <Loader2 className="w-32 h-32 animate-spin" />
                </div>
              </div>
              <Footer />
            </>
          )}>
            {children}
          </Suspense>
        </main>
      </div> 
    </>
  );
};
 
export default DeveloperLayout;