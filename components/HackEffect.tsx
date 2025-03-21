'use client';

import { useEffect, useState } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
const finalWord = 'Hackathon';

export const HackEffect = () => {
    const [text, setText] = useState('Tedfcfneu');  // Initialize with specific text
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let iteration = 0;
        let position = 0;

        const scramble = () => {
            if (position >= finalWord.length) {
                setIsAnimating(false);
                return;
            }

            interval = setInterval(() => {
                setText(prev => {
                    const scrambled = prev.split('')
                        .map((char, index) => {
                            if (index < position) return finalWord[index];
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join('');

                    if (iteration >= 3) {
                        position++;
                        iteration = 0;
                    }

                    iteration++;
                    return scrambled;
                });
            }, 50);
        };

        scramble();
        return () => clearInterval(interval);
    }, []);

    return <span className="text-[#D6FA40]">{text}</span>;
};