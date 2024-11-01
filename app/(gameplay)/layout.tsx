import { Navbar } from "@/components/navbar";

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
          {children}
        </main>
      </div> 
    </>
  );
}
 
export default GameplayLayout;