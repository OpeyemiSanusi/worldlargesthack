"use client";

import { useEffect, useRef } from "react";

export const ParticlesBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // If ref not attached, exit

        const ctx = canvas.getContext("2d");
        if (!ctx) return; // If no 2D context, exit

        // List of language strings
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

        // Floating text items
        const floatingTexts = Array.from({ length: 30 }, () => ({
            text: languages[Math.floor(Math.random() * languages.length)],
            x: 0, // Will be assigned in updateCanvasSize()
            y: 0,
            size: Math.random() * 12 + 8,
            speedX: Math.random() * 0.3 - 0.15,
            speedY: Math.random() * 0.3 - 0.15,
            opacity: Math.random() * 0.025 + 0.008,
        }));

        /**
         * Resizes canvas to full window, then re-randomizes each text position
         */
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            floatingTexts.forEach((item) => {
                item.x = Math.random() * canvas.width;
                item.y = Math.random() * canvas.height;
            });
        };

        // Set initial size
        updateCanvasSize();

        let animationFrameId: number;

        /**
         * Main animation loop
         */
        const animate = () => {
            // Clear previous frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Move & draw each floating text
            floatingTexts.forEach((item) => {
                item.x += item.speedX;
                item.y += item.speedY;

                // Wrap around edges
                if (item.x > canvas.width) item.x = 0;
                if (item.x < 0) item.x = canvas.width;
                if (item.y > canvas.height) item.y = 0;
                if (item.y < 0) item.y = canvas.height;

                // Draw
                ctx.font = `${item.size}px monospace`;
                ctx.fillStyle = `rgba(214, 250, 64, ${item.opacity})`;
                ctx.fillText(item.text, item.x, item.y);
            });

            // Request the next frame
            animationFrameId = requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        /**
         * Handle window resize
         */
        const handleResize = () => {
            updateCanvasSize();
        };
        window.addEventListener("resize", handleResize);

        // Cleanup when unmounting
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        // NOTE: -z-10 + pointer-events-none ensures the canvas is behind and non-blocking
        <div className="absolute inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};
