import { ModeToggle } from "./mode-toggle"

export const Footer = () => {
  return (
    <div className="flex items-center justify-between w-full p-6 bg-transparent z-5">
      <p className="text-sm text-muted-foreground">© 2024 • AIdentify</p>
      <ModeToggle />
    </div>
  )
}