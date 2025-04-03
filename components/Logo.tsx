import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
});

interface LogoProps {
  clickable?: boolean;
  href?: string;
  showLogoText?: boolean;
}

export const Logo = ({ clickable, href, showLogoText }: LogoProps) => {
  const logoContent = (
    <div className="flex items-center gap-x-2">
      <Image 
        src="/logos/Wordmark-beta.svg"
        height="200"
        width="252" // TODO: Change back to 200 when out of beta
        alt="Logo"
        className="dark:hidden"
      />
      <Image 
        src="/logos/Wordmark_Logo-darkmode.svg"
        height="200"
        width="200"
        alt="Logo"
        className="hidden dark:block"
      />
      {showLogoText && (
        <p className={cn("font-semibold p-2", font.className)}>AIdentify</p>
      )}
    </div>
  );

  return clickable && href ? (
    <Link href={href}>
      {logoContent}
    </Link>
  ): (
    logoContent
  );
};