"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { GitBranch } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const VersionButton = () => {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVersion() {
      const response = await fetch('https://api.github.com/repos/dylandevelops/aidentify/releases');
      const releases = await response.json();
      
      if (releases.length > 0) {
        const latestRelease = releases[0];
        setVersion(latestRelease.name);
      } else {
        setVersion(null);
      }
    }

    fetchVersion();
  }, []);

  if(!version) {
    return (
      <Link href="https://github.com/DylanDevelops/aidentify/releases" target="_blank">
        <Button variant="ghost" className="text-muted-foreground">
          <Skeleton className="h-5 w-28" />
        </Button>
      </Link>
    );
  }

  return ( 
    <Link href="https://github.com/DylanDevelops/aidentify/releases" target="_blank">
      <Button variant="ghost" className="text-muted-foreground">
        <GitBranch className="w-5 h-5 mr-2" /> {version}
      </Button>
    </Link>
  );
};
 
export default VersionButton;