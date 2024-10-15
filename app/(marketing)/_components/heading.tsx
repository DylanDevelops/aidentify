"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <Image className="mx-auto block dark:hidden" src="/logos/Wordmark_Logo.svg" width={500} height={500} alt="AIdentify Logo" />
        <Image className="mx-auto hidden dark:block" src="/logos/Wordmark_Logo-darkmode.svg" width={500} height={500} alt="AIdentify Logo" />
      </div>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Thanks for checking out the website!
      </h3>
      <Button onClick={() => alert('COMING SOON')}>View More</Button>
    </div>
  )
}