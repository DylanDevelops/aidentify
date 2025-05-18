"use client";

import { FancyBackgroundGradient } from "@/components/fancy-background-gradient";
import { Footer } from "@/components/footer";
import Image from "next/image";
import SolutionCard from "./_components/solution-card";
import { GraduationCap, MousePointerClick, RotateCcw, Trophy } from "lucide-react";
import TeamCard from "./_components/team-card";
import FancyLink from "@/components/fancy-link";
import Confetti from "react-confetti";
import { useEffect, useRef, useState } from "react";

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  const [confettiPieces, setConfettiPieces] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setPageDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const handleBannerClick = () => {
    setConfettiPieces(0);
    setTimeout(() => {
      setConfettiPieces(200);
      setTimeout(() => setConfettiPieces(0), 3000);
    }, 0);
  };

  return ( 
    <>
      <FancyBackgroundGradient />
      <Confetti
        numberOfPieces={confettiPieces}
        width={pageDimensions.width}
        height={pageDimensions.height}
        gravity={0.3}
      />
      <div ref={containerRef} className="min-h-screen flex flex-col overflow-hidden">
        <section className="flex flex-col items-center justify-center py-4">
          <div
            onClick={handleBannerClick}
            style={{
              background: "linear-gradient(358deg, rgba(187, 186, 198, 0.85) 0%, rgba(86, 83, 115, 0.72) 166.93%)",
              border: "5px solid #9E9DAE"
            }}
            className="mx-10 rounded-xl px-6 py-4 flex flex-col lg:flex-row items-center gap-3 shadow-md sm:hover:scale-105 cursor-pointer transition-transform duration-300"
          >
            <Trophy className="text-[#565373]" />
            <p className="text-lg font-bold text-[#565373] select-none text-center lg:text-start">
              1st Place, Technology/Education Category — Chapman University Grand Challenges Initiative Showcase, Spring 2025
            </p>
          </div>
        </section>
        <section id="home" className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 py-10">
          <Image src="/logos/AIdentify-Story.svg" width={100} height={100} unoptimized alt="AIdentify Logo for the About Page" className="w-[15rem] sm:w-[20rem] md:w-[32.48944rem]" />
          <p className="px-5 sm:px-20 md:px-48 text-[#565373] text-lg font-normal">AIdentify is a project of the <FancyLink href="https://www.chapman.edu/about/our-home/keck-center/gci/index.aspx" openInNewTab className="font-bold">Grand Challenges Initiative</FancyLink> at <FancyLink href="https://www.chapman.edu/" className="font-bold">Chapman University</FancyLink>, focused on teaching AI identification through repetition.</p>
        </section>
        <section id="problem" className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 py-10">
          <h2 className="text-[1.875rem] font-bold bg-[linear-gradient(208deg,_#565373_10%,_#6E7E85_93.82%)] bg-clip-text text-transparent">The Problem</h2>
          <p className="px-5 sm:px-20 md:px-48 text-[#6E7E85] font-normal text-justify">AI misinformation has skyrocketed since the introduction of generative AI tools like <FancyLink href="https://openai.com/index/dall-e-3/" openInNewTab className="font-bold">OpenAI’s DALL·E</FancyLink>, <FancyLink href="https://www.adobe.com/products/firefly.html" openInNewTab className="font-bold">Adobe Firefly</FancyLink>, and <FancyLink href="https://gemini.google/overview/" openInNewTab className="font-bold">Google Gemini</FancyLink>, generating millions of images every day. The public has an increased interest in generated content, with millions of users experimenting with these models. Due to this, AI content has become less distinguishable from authentic content, making it increasingly difficult to detect AI-generated material.</p>
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
          <div className="flex flex-row flex-wrap gap-6 px-4 sm:px-8 md:px-16 max-w-[50rem] justify-center items-center">
            <TeamCard
              name="Dylan Ravel"
              title="Software Team Lead"
              linkedInURL="https://www.linkedin.com/in/dylanravel/"
            />
            <TeamCard
              name="Divi Newton"
              title="Design Team Lead"
              linkedInURL="https://www.linkedin.com/in/divinewton/"
            />
            <TeamCard
              name="Noslen Cruz-Muniz"
              title="Curriculum Team Lead"
            />
            <TeamCard
              name="Cristian Melgoza"
              title="Software Team"
            />
            <TeamCard
              name="Josh McCarthy"
              title="Curriculum Team"
              linkedInURL="https://www.linkedin.com/in/joshua-mccarthy-dev/"
            />
            <TeamCard
              name="Jack Flanagan"
              title="Curriculum Team"
              linkedInURL="https://www.linkedin.com/in/jack-flanagan-571399217/"
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