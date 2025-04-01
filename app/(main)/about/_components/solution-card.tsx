import { LucideIcon } from "lucide-react";
import "./solution-card.css";
import { cn } from "@/lib/utils";

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ icon: Icon, title, description, className }) => {
  return (
    <div className={cn("solution-card w-[18.75rem] h-[25rem] rounded-[2.5rem] flex flex-col items-center justify-center text-center transition-transform duration-300 lg:hover:scale-105", className)}>
      <Icon className="mb-4 w-[6.25rem] h-[6.25rem] text-[#1C0F13] opacity-50" />
      <p className="font-bold text-2xl text-[rgba(28,_15,_19,_0.50)] mb-4">{title}</p>
      <p className="text-[rgba(28,_15,_19,_0.50)] text-xl mx-10">{description}</p>
    </div>
  );
};
 
export default SolutionCard;