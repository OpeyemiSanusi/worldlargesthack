"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Monitor, Trophy } from "lucide-react";

import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ContainerTerminal } from "@/components/ContainerTerminal";
import { Button } from "@/components/ui/button";
import { HackEffect } from "@/components/HackEffect";
import { motion } from 'framer-motion';

export default function Home() {
  // ----- State for judges -----
  const [selectedJudge, setSelectedJudge] = useState("");
  const [judgeRef, judgeInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const judges = {
    "1": { name: "Sarah Chen", role: "AI Research Lead, OpenAI" },
    "2": { name: "Michael Torres", role: "CTO, TechVentures" },
    "3": { name: "Emily Zhang", role: "Principal Engineer, Google" },
  };

  // ----- State for prizes -----
  const [selectedPrize, setSelectedPrize] = useState("1st");
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const prizes = {
    "1st": "$1M",
    "2nd": "$500K",
    "3rd": "$250K",
  };

  // ----- Countdown Timer -----
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 30,
    seconds: 60,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(targetDate.getHours() + 12);
    targetDate.setMinutes(targetDate.getMinutes() + 30);
    targetDate.setSeconds(targetDate.getSeconds() + 60);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Main block content */}
      <main className="bg-[#0E0E0E] w-full min-h-screen p-0 m-0">
        {/* Wrapper with relative positioning so we can place the Particles behind everything */}
        <div className="flex flex-col justify-between min-h-screen p-0 m-0 relative">
          {/* >>> Particles Background with pointer-events: none; so it doesn't block clicks <<< */}
          <ParticlesBackground />

          {/* First Container - Header */}
          <div className="w-full relative p-0 m-0">
            <header className="bg-[#DCFF50] py-2.5 m-0">
              <h2 className="text-black text-lg font-poppins tracking-tight pl-4 m-0">
                hackathon.dev
              </h2>
            </header>
          </div>

          {/* Middle Container - Content */}
          <div className="w-full flex flex-col items-center justify-center p-8 pb-0 m-0">
            <div className="w-full max-w-[90%] mx-auto text-center m-0 p-0">
              <div className="max-w-[1000px] mx-auto p-0 m-0">
                <h1 className="flex flex-col gap-0.5 text-6xl md:text-8xl font-bold m-0 p-0">
                  <span className="text-[#F5FFCB]">The World's Largest</span>
                  <div className="h-[1.2em] flex items-center justify-center">
                    <HackEffect />
                  </div>
                </h1>

                <p className="text-white text-lg md:text-xl mb-14 max-w-3xl mx-auto font-inter font-light p-0 mt-3">
                  Join thousands of developers worldwide in building the future of
                  technology. Collaborate, innovate, and compete for amazing prizes.
                </p>

                {/* Countdown Timer */}
                <div className="flex justify-center gap-3 mb-12">
                  {[
                    { value: timeLeft.days, label: "DAYS" },
                    { value: timeLeft.hours, label: "HOURS" },
                    { value: timeLeft.minutes, label: "MINUTES" },
                    { value: timeLeft.seconds, label: "SECONDS" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="bg-[#1A1A1A] w-16 h-16 flex items-center justify-center mb-2">
                        <span className="bg-gradient-to-b from-[#D6FA40] to-[#F5FFCB] text-transparent bg-clip-text text-2xl font-bold">
                          {String(item.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-white text-xs font-medium">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className="bg-[#EBFE96] text-black hover:bg-[#D6FA40] hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out mb-8 px-8 py-6 text-lg rounded-md"
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById("registration-form");
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest",
                      });
                    }
                  }}
                >
                  <Monitor className="mr-3 h-5 w-5" />
                  Register Now
                </Button>
              </div>
            </div>
          </div>

          {/* Third Container */}
          {/* Terminal Container */}
          <div className="w-full flex items-start p-0 m-0">
            <div className="w-full max-w-[99%] md:max-w-[98%] xl:max-w-[1800px] mx-auto">
              <div className="w-full max-w-[1500px] mx-auto h-[450px]">
                <ContainerTerminal className="text-lg" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 2) WHITE SECTION BELOW */}
      <section className="bg-white text-black py-20">
        <div className="relative overflow-hidden w-full">
          <div className="flex animate-scroll w-max">
            {/* First set of logos */}
            {[
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Falgolia.a8da3961.png&w=640&q=75",
                alt: "Algolia",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fatlassian.6951c1d4.png&w=640&q=75",
                alt: "Atlassian",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmicrosoft.73a237e1.png&w=640&q=75",
                alt: "Microsoft",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintel.8f37f35e.png&w=640&q=75",
                alt: "Intel",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnvidia.cd0e3efe.png&w=640&q=75",
                alt: "Nvidia",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuber.c72e37e8.png&w=640&q=75",
                alt: "Uber",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstripe.b63b30d6.png&w=640&q=75",
                alt: "Stripe",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshopify.a92c5be1.png&w=640&q=75",
                alt: "Shopify",
              },
            ].map((logo, index) => (
              <div key={index} className="flex-none w-[200px] mx-8">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}

            {/* Duplicate set for seamless scrolling */}
            {[
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Falgolia.a8da3961.png&w=640&q=75",
                alt: "Algolia",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fatlassian.6951c1d4.png&w=640&q=75",
                alt: "Atlassian",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmicrosoft.73a237e1.png&w=640&q=75",
                alt: "Microsoft",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintel.8f37f35e.png&w=640&q=75",
                alt: "Intel",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnvidia.cd0e3efe.png&w=640&q=75",
                alt: "Nvidia",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuber.c72e37e8.png&w=640&q=75",
                alt: "Uber",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstripe.b63b30d6.png&w=640&q=75",
                alt: "Stripe",
              },
              {
                src: "https://codesandbox.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshopify.a92c5be1.png&w=640&q=75",
                alt: "Shopify",
              },
            ].map((logo, index) => (
              <div key={`duplicate-${index}`} className="flex-none w-[200px] mx-8">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) DARK SECTION (Prizes, Judges) */}
      <section className="bg-[#0E0E0E] text-white overflow-x-auto">
        {/* PRIZES */}
        <div id="prizes-section" className="pt-20 w-full px-4">
          <div className="w-full max-w-[99%] md:max-w-[98%] xl:max-w-[1800px] mx-auto">
            <div className="w-full max-w-[1500px] mx-auto h-[400px] rounded-xl border border-[#333333] bg-[#0E0E0E] p-8 flex">
              {/* Left side - Prize selections */}
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-8 text-white">Prizes to be Won</h2>
                <div className="space-y-4">
                  <div className="overflow-hidden">
                    <motion.button
                      initial={{ width: "20%", x: -50 }}
                      whileInView={{ width: "100%", x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedPrize("1st")}
                      className={`p-4 rounded-lg flex items-center gap-3 transition-all ${selectedPrize === "1st"
                        ? "bg-gradient-to-r from-[#DCFF50] to-[#EBFE96] text-black"
                        : "bg-[#1A1A1A] text-white hover:bg-[#252525]"
                        }`}
                    >
                      <Trophy className="h-6 w-6 flex-shrink-0" />
                      <span className="text-xl font-semibold whitespace-nowrap">1st Place</span>
                    </motion.button>
                  </div>

                  <div className="overflow-hidden">
                    <motion.button
                      initial={{ width: "20%", x: -50 }}
                      whileInView={{ width: "85%", x: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedPrize("2nd")}
                      className={`p-4 rounded-lg flex items-center gap-3 transition-all border border-white/20 ${selectedPrize === "2nd"
                        ? "bg-gradient-to-r from-[#DCFF50] to-[#EBFE96] text-black border-none"
                        : "bg-transparent text-white hover:bg-[#252525]"
                        }`}
                    >
                      <Trophy className="h-6 w-6 flex-shrink-0" />
                      <span className="text-xl font-semibold whitespace-nowrap">2nd Place</span>
                    </motion.button>
                  </div>

                  <div className="overflow-hidden">
                    <motion.button
                      initial={{ width: "20%", x: -50 }}
                      whileInView={{ width: "70%", x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedPrize("3rd")}
                      className={`p-4 rounded-lg flex items-center gap-3 transition-all border border-white/20 ${selectedPrize === "3rd"
                        ? "bg-gradient-to-r from-[#DCFF50] to-[#EBFE96] text-black border-none"
                        : "bg-transparent text-white hover:bg-[#252525]"
                        }`}
                    >
                      <Trophy className="h-6 w-6 flex-shrink-0" />
                      <span className="text-xl font-semibold whitespace-nowrap">3rd Place</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Right side - Prize amount */}
              <div className="flex-1 flex items-center justify-center" ref={ref}>
                <div
                  key={selectedPrize}
                  className={`font-bold bg-gradient-to-br from-[#D6FA40] via-[#EBFE96] to-[#F5FFCB] text-transparent bg-clip-text ${selectedPrize === "1st" ? "text-[180px]" : "text-[120px]"
                    } ${inView ? "animate-fadeSlideIn" : "opacity-0"}`}
                  style={{
                    backgroundSize: "200% 200%",
                    animation: inView
                      ? "gradient 3s ease infinite, slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                      : "none",
                    willChange: "transform, opacity, background-position",
                  }}
                >
                  {prizes[selectedPrize as keyof typeof prizes]}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* JUDGES */}
        <div id="judges-section" className="pt-20 w-full px-4">
          <div className="w-full max-w-[99%] md:max-w-[98%] xl:max-w-[1800px] mx-auto">
            <div className="w-full max-w-[1500px] mx-auto rounded-xl border border-[#333333] bg-[#0E0E0E] p-8">
              <h2 className="text-4xl font-bold mb-8 text-white">Judges</h2>
              <div className="flex justify-between gap-8">
                {[
                  {
                    name: "Sarah Chen",
                    color: "from-[#D6FA40] to-[#EBFE96]",
                    bg: "bg-[#DCFFEB]",
                    bio: "AI Research Lead at OpenAI with over 15 years of experience in machine learning and neural networks. Previously led groundbreaking projects at DeepMind.",
                    image: "https://untitledui.com/images/avatars/drew-cano",
                  },
                  {
                    name: "Michael Torres",
                    color: "from-[#40DDFA] to-[#96FFFC]",
                    bg: "bg-[#F5F0FF]",
                    bio: "CTO at TechVentures, pioneering innovative solutions in cloud computing and distributed systems. Angel investor and mentor to tech startups.",
                    image: "https://untitledui.com/images/avatars/lori-bryson",
                  },
                  {
                    name: "Emily Zhang",
                    color: "from-[#FA40F3] to-[#FFC9FB]",
                    bg: "bg-[#DCFFF7]",
                    bio: "Principal Engineer at Google, leading infrastructure development. Known for contributions to open-source and scalable systems design.",
                    image: "https://untitledui.com/images/avatars/noah-pierre",
                  },
                  {
                    name: "David Kim",
                    color: "from-[#FA4040] to-[#FFB996]",
                    bg: "bg-[#EBFFDC]",
                    bio: "Distinguished Architect at Amazon, specializing in distributed systems and serverless architecture. Author of 'Cloud Native Patterns'.",
                    image: "https://untitledui.com/images/avatars/lyle-kauffman",
                  },
                  {
                    name: "Lisa Wang",
                    color: "from-[#40FA8E] to-[#96FFD1]",
                    bg: "bg-[#DCF0FF]",
                    bio: "VP of Engineering at Meta, leading AR/VR initiatives. PhD in Computer Science from Stanford, focused on computer vision.",
                    image: "https://untitledui.com/images/avatars/florence-shaw",
                  },
                  {
                    name: "James Miller",
                    color: "from-[#4051FA] to-[#96A2FF]",
                    bg: "bg-[#F5F0FF]",
                    bio: "Director of Innovation at Microsoft, specializing in AI and quantum computing. Multiple patents holder in distributed systems.",
                    image: "https://untitledui.com/images/avatars/ashwin-santiago",
                  },
                ].map((judge, index) => (
                  <div
                    key={index}
                    className={`w-[200px] h-[200px] rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-300 ${judge.bg} 
                      ${selectedJudge === index.toString() ? "w-[400px]" : "w-[200px]"}`}
                  >
                    {/* Plus icon circle - now clickable */}
                    <div
                      onClick={() =>
                        setSelectedJudge(
                          selectedJudge === index.toString() ? "" : index.toString()
                        )
                      }
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center cursor-pointer hover:bg-black/20 transition-colors z-10"
                    >
                      <span className="text-black/40 text-xl leading-none">
                        {selectedJudge === index.toString() ? "×" : "+"}
                      </span>
                    </div>

                    {selectedJudge === index.toString() ? (
                      // Expanded view
                      <div className="h-full w-full flex flex-col pt-4">
                        <h3 className="text-xl font-bold text-black/80 mb-2">
                          {judge.name}
                        </h3>
                        <p className="text-sm text-black/70 leading-snug">
                          {judge.bio}
                        </p>
                      </div>
                    ) : (
                      // Default view with image
                      <>
                        <img
                          src={judge.image}
                          alt={judge.name}
                          className="h-20 w-20 rounded-xl object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold text-black/80">
                          {judge.name}
                        </h3>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div id="timeline-section" className="pt-20 pb-32 w-full px-4">
          <div className="w-full max-w-[99%] md:max-w-[98%] xl:max-w-[1800px] mx-auto">
            <div className="w-full max-w-[1500px] mx-auto rounded-xl border border-[#333333] bg-[#0E0E0E] p-8">
              <h2 className="text-4xl font-bold mb-12 text-white">Event Timeline</h2>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[20px] md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#DCFF50] to-[#EBFE96]"></div>

                {[
                  {
                    date: "Day 1",
                    title: "Opening Ceremony & Hacking Begins",
                    description: "Kickoff event with keynote speakers, team formation, and start building",
                    time: "9:00 AM PST"
                  },
                  {
                    date: "Day 2",
                    title: "Workshop Day",
                    description: "Technical workshops and API demonstrations from sponsors",
                    time: "10:00 AM PST"
                  },
                  {
                    date: "Day 3",
                    title: "Networking & Team Building",
                    description: "Connect with fellow participants, form teams, and brainstorm ideas",
                    time: "11:00 AM PST"
                  },
                  {
                    date: "Day 4",
                    title: "Mentorship Sessions",
                    description: "One-on-one mentorship with industry experts",
                    time: "2:00 PM PST"
                  },
                  {
                    date: "Day 5",
                    title: "Project Submission & Demo",
                    description: "Final submissions and project presentations to judges",
                    time: "2:00 PM PST"
                  },
                  {
                    date: "Day 6",
                    title: "Awards Ceremony",
                    description: "Winners announcement and closing ceremony",
                    time: "3:00 PM PST"
                  }
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: index % 2 === 0 ? -50 : 50
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                  >
                    {/* Timeline Node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1 + 0.2
                      }}
                      className={`absolute ${index % 2 === 0
                        ? 'left-[16px] md:left-[calc(50%-16px)]'
                        : 'left-[16px] md:left-[calc(50%-16px)]'
                        } transform w-8 h-8 bg-[#DCFF50] rounded-full border-4 border-[#0E0E0E] z-10`}
                    />

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-16 md:w-1/2' : 'md:pl-16 md:w-1/2'
                      }`}>
                      <div className="bg-[#1A1A1A] p-6 rounded-xl hover:bg-[#252525] transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-[#DCFF50]">{event.title}</h3>
                          <span className="text-sm text-white/50">{event.time}</span>
                        </div>
                        <div className="text-white/70 mb-2">{event.date}</div>
                        <p className="text-white/90">{event.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) LIME SECTION */}
      <section id="registration-form" className="bg-[#e3ff74] text-white py-40">
        <div className="w-full max-w-[90%] mx-auto space-y-16">
          <h2 className="text-[#1d1d1d] text-8xl font-black font-poppins text-center">
            Register to Join
          </h2>
          <div className="w-full max-w-[1500px] mx-auto rounded-xl border border-[#333333] bg-[#0E0E0E] p-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto py-12">
              {/* Personal Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-white focus:outline-none focus:border-[#DCFF50] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-white focus:outline-none focus:border-[#DCFF50] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-white focus:outline-none focus:border-[#DCFF50] transition-colors"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              {/* Project & Skills */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Primary Role
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-white focus:outline-none focus:border-[#DCFF50] transition-colors">
                    <option value="">Select your role</option>
                    <option value="frontend">Frontend Developer</option>
                    <option value="backend">Backend Developer</option>
                    <option value="fullstack">Full Stack Developer</option>
                    <option value="designer">UI/UX Designer</option>
                    <option value="ml">ML Engineer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Experience Level
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-white focus:outline-none focus:border-[#DCFF50] transition-colors">
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="advanced">Advanced (5+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Project Idea (Optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-white focus:outline-none focus:border-[#DCFF50] transition-colors h-24 resize-none"
                    placeholder="Brief description of your project idea..."
                  />
                </div>
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#DCFF50] to-[#EBFE96] text-black font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Submit Registration
                </button>
                <p className="text-white/50 text-sm text-center mt-4">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#0E0E0E] text-white py-20">
        <div className="w-full max-w-[99%] md:max-w-[98%] xl:max-w-[1800px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand & Description */}
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">hackathon.dev</h3>
              <p className="text-white/70 max-w-md">
                Join the world's largest hackathon community. Build, learn, and connect
                with developers worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#DCFF50] transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#DCFF50] transition-colors"
                  >
                    Rules
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#DCFF50] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#DCFF50] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#DCFF50] transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#DCFF50] transition-colors"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#DCFF50] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/70 hover:text-[#DCFF50] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/50 text-sm">
                © 2025 hackathon.dev. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}