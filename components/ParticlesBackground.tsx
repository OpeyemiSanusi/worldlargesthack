'use client';

import { useEffect, useRef } from 'react';

export const ParticlesBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const languages = [
            'Python', 'JavaScript', 'React', 'Next.js', 'Bolt.new', 'TypeScript',
            'HTML', 'CSS', 'Node.js', 'Ruby', 'Java', 'Go', 'Rust',
            'PHP', 'Swift', 'Kotlin', 'C++', 'MongoDB', 'SQL'
        ];

        const updateCanvasSize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                floatingTexts.forEach(item => {
                    item.x = Math.random() * canvas.width;
                    item.y = Math.random() * canvas.height;
                });
            }
        };

        const floatingTexts = Array.from({ length: 30 }, () => ({
            text: languages[Math.floor(Math.random() * languages.length)],
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 12 + 8,
            speedX: Math.random() * 0.3 - 0.15,
            speedY: Math.random() * 0.3 - 0.15,
            opacity: Math.random() * 0.025 + 0.008
        }));

        updateCanvasSize();

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            floatingTexts.forEach(item => {
                item.x += item.speedX;
                item.y += item.speedY;

                if (item.x > canvas.width) item.x = 0;
                if (item.x < 0) item.x = canvas.width;
                if (item.y > canvas.height) item.y = 0;
                if (item.y < 0) item.y = canvas.height;

                ctx.font = `${item.size}px monospace`;
                ctx.fillStyle = `rgba(214, 250, 64, ${item.opacity})`;
                ctx.fillText(item.text, item.x, item.y);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            updateCanvasSize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <canvas
                ref={canvasRef}
                className="w-full h-full pointer-events-none"
            />
        </div>
    );
};