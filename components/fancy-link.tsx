import { cn } from "@/lib/utils";
import Link from "next/link";

interface FancyLinkProps {
  href: string;
  openInNewTab?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FancyLink: React.FC<FancyLinkProps> = ({ href, openInNewTab = false, children, className }) => {
  return ( 
    <Link 
      href={href} 
      className={cn("relative group", className)}
      target={openInNewTab ? "_blank" : undefined} 
    >
      {children}
      <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
    </Link>
  );
};
 
export default FancyLink;