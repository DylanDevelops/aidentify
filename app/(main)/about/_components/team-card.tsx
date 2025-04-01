import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface TeamCardProps {
  name: string;
  title: string;
  linkedInURL?: string;
  noPfp?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, title, linkedInURL, noPfp = false }) => {
  const content = (
    <>
      <Image
        src={noPfp ? "/team/placeholder-user.png" : `/team/${name.toLowerCase().replace(" ", "-")}.png`}
        width={100}
        height={100}
        unoptimized
        alt={`${name}'s Profile Picture`}
        className="w-[10rem] h-[10rem] rounded-[2.5rem] border-[5px] border-solid border-[#565373] border-opacity-20"
      />
      <p className="text-[#6E7E85] text-lg font-bold mt-2">{name}</p>
      <p className="text-[#6E7E85] text-sm font-normal">{title}</p>
    </>
  );

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", linkedInURL ? "cursor-pointer lg:hover:scale-105 transition-transform duration-300" : "cursor-default")}>
      {linkedInURL ? (
        <Link href={linkedInURL} target="_blank">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

export default TeamCard;