import { Footer } from "@/components/footer";
import { Heading } from "./_components/heading";
import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";

const MarketingPage = () => {
  return ( 
    <>
      <FancyBackgroundGradient />
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <Heading />
        </div>
        <Footer />
      </div>
    </>
  );
}
 
export default MarketingPage;