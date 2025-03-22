"use client";

import { useEffect, useRef } from "react";

export const ParticlesBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // The text that floats across the screen
        const languages = [
            "Python",
            "JavaScript",
            "React",
            "Next.js",
            "Bolt.new",
            "TypeScript",
            "HTML",
            "CSS",
            "Node.js",
            "Ruby",
            "Java",
            "Go",
            "Rust",
            "PHP",
            "Swift",
            "Kotlin",
            "C++",
            "MongoDB",
            "SQL",
        ];

        // Generate 30 floating items
        const floatingTexts = Array.from({ length: 30 }, () => ({
            text: languages[Math.floor(Math.random() * languages.length)],
            x: 0, // set in updateCanvasSize
            y: 0,
            size: Math.random() * 12 + 8,
            speedX: Math.random() * 0.3 - 0.15,
            speedY: Math.random() * 0.3 - 0.15,
            opacity: Math.random() * 0.025 + 0.008,
        }));

        // Resize & reset positions
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            floatingTexts.forEach((item) => {
                item.x = Math.random() * canvas.width;
                item.y = Math.random() * canvas.height;
            });
        };
        updateCanvasSize();

        let animationFrameId: number;

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            floatingTexts.forEach((item) => {
                // Move each floating text
                item.x += item.speedX;
                item.y += item.speedY;

                // Wrap around edges
                if (item.x > canvas.width) item.x = 0;
                if (item.x < 0) item.x = canvas.width;
                if (item.y > canvas.height) item.y = 0;
                if (item.y < 0) item.y = canvas.height;

                // Draw the text
                ctx.font = `${item.size}px monospace`;
                ctx.fillStyle = `rgba(214, 250, 64, ${item.opacity})`;
                ctx.fillText(item.text, item.x, item.y);
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            updateCanvasSize();
        };
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        /**
         * KEY FIX: 
         * 1) `z-0` instead of `-z-10` so particles appear above the .bg-[#0E0E0E]. 
         * 2) `pointer-events-none` so the canvas doesn’t block any clicks.
         */
        <div className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};
