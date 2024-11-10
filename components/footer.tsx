import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { GitBranch, Github, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <div className="flex items-center justify-between w-full p-6 bg-transparent z-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link">
            <p className="text-sm text-muted-foreground">© 2024 • AIdentify</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <Link href="/privacy-policy">
            <DropdownMenuItem>
              Privacy Policy
            </DropdownMenuItem>
          </Link>
          <Link href="/terms-and-conditions">
            <DropdownMenuItem>
              Terms & Conditions
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-row gap-x-1">
        <Link href="mailto:playaidentify@gmail.com">
          <Button variant="ghost" size="icon">
            <Mail className="text-muted-foreground w-5 h-5" />
          </Button>
        </Link>
        <Link href="https://github.com/DylanDevelops/aidentify" target="_blank">
          <Button variant="ghost" size="icon">
            <Github className="text-muted-foreground w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};