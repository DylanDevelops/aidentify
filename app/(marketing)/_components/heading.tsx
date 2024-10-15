"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <Image className="mx-auto" src="/Wordmark_Logo.svg" width={500} height={500} alt="AIdentify Logo" />
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Thanks for checking out the website!
      </h3>
      <Button onClick={() => alert('COMING SOON')}>View More</Button>
    </div>
  )
}