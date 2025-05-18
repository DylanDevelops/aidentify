import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";
import { Footer } from "@/components/footer";
import LevelUpload from "./_components/_level-upload/level-upload";
import QuickLinks from "./_components/_quick-links/quick-links";

const AdminPage = () => {
  return ( 
    <>
      <FancyBackgroundGradient />
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-start justify-start md:text-justify gap-y-8 md:mt-10 md:mx-40 flex-1 px-6 pb-10">
          <h1 className="text-5xl">Admin Dashboard</h1>
          <div className="space-y-8">
            <QuickLinks />
            <LevelUpload />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
 
export default AdminPage;