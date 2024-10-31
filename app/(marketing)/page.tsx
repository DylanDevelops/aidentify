import { Footer } from "@/components/footer";
import { Heading } from "./_components/heading";

const MarketingPage = () => {
  return ( 
    <>
      <div className="fixed top-0 left-0 w-[128.25rem] h-[152rem] bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(183,_206,_206,_0.90)_0%,_rgba(245,_245,_245,_0.00)_100%)] transform -translate-x-1/2 -translate-y-1/2 rounded-[152rem]"></div>
      <div className="fixed bottom-0 right-0 w-[62rem] h-[98.25rem] bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(187,_186,_198,_0.90)_0%,_rgba(245,_245,_245,_0.00)_100%)] transform translate-x-1/2 translate-y-1/2 rounded-[98.25rem]"></div>
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