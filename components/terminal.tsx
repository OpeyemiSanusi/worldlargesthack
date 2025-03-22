'use client';

import { useState, useEffect } from 'react';
import { Calendar, Trophy, Users2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const commands = [
  {
    id: 'date',
    icon: Calendar,
    command: 'date',
    output: 'APRIL 15-17, 2025 | 48HR CODING MARATHON',
  },
  {
    id: 'prizes',
    icon: Trophy,
    command: 'prizes',
    output: '$50,000 TOTAL PRIZE POOL | 4 CATEGORIES',
  },
  {
    id: 'judges',
    icon: Users2,
    command: 'judges',
    output: 'PANEL OF 12 INDUSTRY EXPERTS FROM FAANG & FORTUNE 500',
  },
];

export function Terminal() {
  const [showCursor, setShowCursor] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[85%] mx-auto relative group h-[calc(100vh-24rem)]">
      {/* Focused Glow Effect */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[60%] h-[100px] bg-[#D6FA40] opacity-10 blur-[60px] rounded-[100%] group-hover:opacity-15 transition-opacity" />

      <div className="rounded-lg overflow-hidden shadow-2xl border border-[#323232] relative h-full transition-all duration-300 group-hover:brightness-110">
        {/* Terminal Header */}
        <div className="bg-black p-4 flex items-center gap-2 border-b border-[#323232]">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-gray-500 text-sm font-mono">
            hackathon.dev - terminal
          </div>
        </div>

        {/* Terminal Body */}
        <div className="bg-black p-8 font-mono text-lg h-full">
          {/* Welcome Message */}
          <div className="text-gray-500 mb-8 text-sm">
            Last login: {currentTime} on console
            <br />
            Welcome to hackathon.dev [Version 2.5.0]
            <br />
            Click on an option to be taken to section
          </div>

          {/* Command History */}
          {commands.map((cmd) => (
            <div
              key={cmd.id}
              className="mb-6 cursor-pointer group/cmd"
            >
              <div className="flex flex-col gap-2">
                <div className="text-[#D6FA40] group-hover/cmd:text-[#EBFE96] transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <cmd.icon className="w-5 h-5 mr-2" />
                  {cmd.command}
                </div>
                <div className="text-gray-300 pl-11 border-l-2 border-[#323232] group-hover/cmd:border-[#D6FA40]/30 transition-colors">
                  {cmd.output}
                </div>
              </div>
            </div>
          ))}

          {/* Current Line */}
          <div className="flex items-center text-[#D6FA40] mt-8">
            <ChevronRight className="w-4 h-4 mr-2" />
            <span
              className={cn(
                "ml-2 w-3 h-6 bg-[#D6FA40]",
                showCursor ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this function where you handle terminal commands
const handleCommand = (command: string) => {
  if (command.toLowerCase() === 'prizes') {
    const element = document.getElementById('prizes-section');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
};