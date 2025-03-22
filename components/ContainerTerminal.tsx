import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, Users2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContainerTerminalProps {
    className?: string;
}

export const ContainerTerminal = ({ className }: ContainerTerminalProps) => {
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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const commands = [
        {
            id: 'date',
            icon: Calendar,
            command: 'date',
            output: 'APRIL 15-17, 2025 | 48HR CODING MARATHON',
            onClick: () => {} // No scroll action for date
        },
        {
            id: 'prizes',
            icon: Trophy,
            command: 'prizes',
            output: '$1,000,000 GRAND PRIZE | 3 CATEGORIES',
            onClick: () => scrollToSection('prizes-section')
        },
        {
            id: 'judges',
            icon: Users2,
            command: 'judges',
            output: 'PANEL OF 6 INDUSTRY EXPERTS',
            onClick: () => scrollToSection('judges-section')
        },
    ];

    return (
        <div className="w-full max-w-[1500px] mx-auto h-full relative group">
            {/* Focused Glow Effect */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[60%] h-[100px] bg-[#D6FA40] opacity-10 blur-[60px] rounded-[100%] group-hover:opacity-15 transition-opacity" />

            <div className="w-full h-full bg-black rounded-lg overflow-hidden flex flex-col border border-[#333333] transition-all duration-300 group-hover:brightness-110">
                {/* Terminal Header */}
                <div className="bg-black px-4 py-2 flex items-center gap-2 border-b border-[#333333]">
                    <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 text-gray-500 text-sm font-mono">
                        menu terminal
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="bg-black p-4 font-mono text-sm h-full">
                    {/* Welcome Message */}
                    <div className={cn("text-gray-500 mb-4", className)}>
                        Last login: {currentTime} on console
                        <br />
                        Welcome to hackathon.dev [Version 2.5.0]
                        <br />
                        Type 'help' for a list of commands
                    </div>

                    {/* Command History */}
                    {commands.map((cmd) => (
                        <div
                            key={cmd.id}
                            className="mb-3 cursor-pointer group/cmd"
                            onClick={cmd.onClick}
                        >
                            <div className="flex flex-col gap-1">
                                <div className={cn("text-[#D6FA40] group-hover/cmd:text-[#EBFE96] transition-colors flex items-center", className)}>
                                    <ChevronRight className="w-3 h-3 mr-1" />
                                    <cmd.icon className="w-4 h-4 mr-1" />
                                    {cmd.command}
                                </div>
                                <div className={cn("text-gray-300 text-xs pl-8 border-l border-[#323232] group-hover/cmd:border-[#D6FA40]/30 transition-colors", className)}>
                                    {cmd.output}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Current Line */}
                    <div className="flex items-center text-[#D6FA40] mt-4">
                        <ChevronRight className="w-3 h-3 mr-1" />
                        <span
                            className={cn(
                                "ml-1 w-2 h-4 bg-[#D6FA40]",
                                showCursor ? "opacity-100" : "opacity-0"
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};