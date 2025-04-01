import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar/navbar";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const GameplayLayout = ({
  children
} : {
    children: React.ReactNode;
}) => {
  return (
    <>
      <div className="h-full">
        <Navbar />
        {/* TODO: bg need to account for dark mode */}
        <main className="h-full pt-40 bg-[radial-gradient(50%_50%_at_50%_50%,_#B7CECE_0%,_#E2E2E2_100%)]">
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
 
export default GameplayLayout;