import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import SolutionCard from "./_components/solution-card";
import { GraduationCap, MousePointerClick, RotateCcw } from "lucide-react";
import TeamCard from "./_components/team-card";

const AboutPage = () => {
  return ( 
    <>
      <FancyBackgroundGradient />
      <div className="min-h-full flex flex-col">
        <section id="home" className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 py-10">
          <Image src="/logos/AIdentify-Story.svg" width={100} height={100} unoptimized alt="AIdentify Logo for the About Page" className="w-[15rem] sm:w-[20rem] md:w-[32.48944rem]" />
          <p className="px-5 sm:px-20 md:px-48 text-[#565373] text-lg font-normal">AIdentify is a project of the <Link href="https://www.chapman.edu/about/our-home/keck-center/gci/index.aspx" target="_blank" className="font-bold hover:underline">Grand Challenges Initiative</Link> at <Link href="https://www.chapman.edu/" target="_blank" className="font-bold hover:underline">Chapman University</Link>, focussed on teaching AI identification through repetition.</p>
        </section>
        <section id="problem" className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 py-10">
          <h2 className="text-[1.875rem] font-bold bg-[linear-gradient(208deg,_#565373_10%,_#6E7E85_93.82%)] bg-clip-text text-transparent">The Problem</h2>
          <p className="px-5 sm:px-20 md:px-48 text-[#6E7E85] font-normal text-justify"><span className="font-bold">AI Misinformation</span> has skyrocketed since the introduction of generative AI tools like <span className="font-bold">OpenAI’s DALL·E</span>, <span className="font-bold">Adobe Firefly</span>, and <span className="font-bold">Google Gemini</span>, generating millions of images every day. The public has an increased interest in generated content, with <span className="font-bold">millions of users</span> experimenting with these models. Due to this, AI content has become <span className="font-bold">less distinguishable</span> from authentic content and it has become harder and harder to detect AI-generated content.</p>
        </section>
        <section id="solution" className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 py-10">
          <h2 className="text-[1.875rem] font-bold bg-[linear-gradient(208deg,_#565373_10%,_#6E7E85_93.82%)] bg-clip-text text-transparent">The Solution</h2>
          <div className="flex flex-col lg:flex-row gap-12">
            <SolutionCard 
              icon={MousePointerClick}
              title="Engage"
              description="Create an interactive and fun webgame that users will enjoy"
              className="lg:hover:-rotate-2"
            />
            <SolutionCard 
              icon={GraduationCap}
              title="Educate"
              description="Teach users to distinguish between AI and authentic content"
            />
            <SolutionCard 
              icon={RotateCcw}
              title="Repeat"
              description="Use repetition and give feedback as users progress"
              className="lg:hover:rotate-2"
            />
          </div>
        </section>
        <section id="team" className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 py-10">
          <h2 className="text-[1.875rem] font-bold bg-[linear-gradient(208deg,_#565373_10%,_#6E7E85_93.82%)] bg-clip-text text-transparent">The Team</h2>
          <div className="flex flex-row flex-wrap gap-6 px-4 sm:px-8 md:px-16 max-w-[60rem] justify-center items-center">
            <TeamCard
              name="Dylan Ravel"
              title="Development"
              linkedInURL="https://www.linkedin.com/in/dylanravel/"
            />
            <TeamCard
              name="Divi Newton"
              title="Design/Curriculum"
              linkedInURL="https://www.linkedin.com/in/divinewton/"
            />
            <TeamCard
              name="Noslen Cruz-Muniz"
              title="Design/Curriculum"
            />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 py-10">
          <Image src="/logos/chapman-and-fowler-logo.png" width={500} height={500} unoptimized alt="Chapman University and Fowler School of Engineering Logos" className="w-[20rem] lg:w-[30rem]" />
        </section>
        <Footer />
      </div>
    </>
  );
};
 
export default AboutPage;