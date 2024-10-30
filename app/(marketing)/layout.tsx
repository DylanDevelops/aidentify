import { Navbar } from "@/components/navbar";

const MarketingLayout = ({
  children
} : {
    children: React.ReactNode;
}) => {
  return (
    <>
      <div className="h-full bg-[#E2E2E2] dark:bg-[rgba(28,_15,_19,_0.75)]">
        <Navbar />
        <main className="h-full pt-40">
          {children}
        </main>
      </div> 
    </>
  );
}
 
export default MarketingLayout;