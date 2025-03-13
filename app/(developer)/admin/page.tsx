import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";
import { Footer } from "@/components/footer";

const AdminPage = () => {
  return ( 
    <>
      <FancyBackgroundGradient />
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-start justify-start md:text-justify gap-y-8 md:mt-10 md:mx-40 flex-1 px-6 pb-10">
          <h1 className="text-5xl">Admin Dashboard</h1>
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl">Level Upload</h2>
              <p>[ coming soon ]</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl">Statistics</h2>
              <p>[ coming soon ]</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
 
export default AdminPage;