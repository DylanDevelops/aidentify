import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Github, GlobeLock, Mail, Scale } from "lucide-react";
import VersionButton from "./version-button";

export const Footer = () => {
  return (
    <div className="flex items-center justify-between w-full p-6 bg-transparent z-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link">
            <p className="text-sm text-muted-foreground">© 2025 • AIdentify</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <Link href="/privacy-policy">
            <DropdownMenuItem>
              <GlobeLock className="w-4 h-4" /> Privacy Policy
            </DropdownMenuItem>
          </Link>
          <Link href="/terms-and-conditions">
            <DropdownMenuItem>
              <Scale className="w-4 h-4" /> Terms & Conditions
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex-row gap-x-1 hidden sm:block">
        <Link href="mailto:contact@playaidentify.com" aria-label="Email Address Contact">
          <Button variant="ghost" size="icon" aria-label="Email Address Contact">
            <Mail className="text-muted-foreground w-5 h-5" />
          </Button>
        </Link>
        <Link href="https://github.com/DylanDevelops/aidentify" target="_blank" aria-label="GitHub Repository">
          <Button variant="ghost" size="icon" aria-label="GitHub Repository">
            <Github className="text-muted-foreground w-5 h-5" />
          </Button>
        </Link>
        <VersionButton />
      </div>
    </div>
  );
};