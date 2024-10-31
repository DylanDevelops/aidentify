import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";
import { Footer } from "@/components/footer";

const LeaderboardPage = () => {
  return ( 
    <>
      <FancyBackgroundGradient />
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <p>Leaderboard Page</p>
        </div>
        <Footer />
      </div>
    </>
  );
}
 
export default LeaderboardPage;