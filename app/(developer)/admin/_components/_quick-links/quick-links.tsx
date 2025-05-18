import { Button } from "@/components/ui/button";
import Link from "next/link";

const QuickLinks = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl">Quick Links</h2>
      <div className="flex flex-col gap-2">
        <Link href="https://dashboard.convex.dev/t/dylan-ravel/aidentify/befitting-horse-528" target="_blank">
          <Button className="w-full">Convex Dashboard</Button>
        </Link>
        <Link href="https://dashboard.clerk.com/apps/app_2nSCtE6fj8FQCTOmhPNC1WGrjq1/instances/ins_2uYsfOGnBlvTptlQvJG1Ruj9pVx" target="_blank">
          <Button className="w-full">Clerk Dashboard</Button>
        </Link>
        <Link href="https://github.com/DylanDevelops/aidentify" target="_blank">
          <Button className="w-full">GitHub Repository</Button>
        </Link>
      </div>
    </div>
  );
};
 
export default QuickLinks;