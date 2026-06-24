import { useEffect, useRef } from "react";

const posterImages = [
    "/posters/poster1.png",
    "/posters/poster2.png",
    "/posters/poster3.png",
    "/posters/poster4.png",
    "/posters/poster5.png",
    "/posters/poster6.png",
    "/posters/poster7.png",
    "/posters/poster8.png",
    "/posters/poster9.png",
    "/posters/poster10.png"
];

export default function PosterReel() {
    const containerRef = useRef(null);
    const targetScrollRef = useRef(0);
    const isHovered = useRef(false);
    const isManual = useRef(false);
    const manualTimeoutRef = useRef(null);

    // We duplicate the array 3 times to ensure smooth, infinite marquee loops without gaps on wide screens
    const displayList = [...posterImages, ...posterImages, ...posterImages];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Give a tiny timeout for scrollWidth to be fully ready
        const initTimeout = setTimeout(() => {
            const maxScroll = container.scrollWidth / 3;
            container.scrollLeft = maxScroll;
            targetScrollRef.current = maxScroll;
        }, 150);

        let animationFrameId;
        let lastTime = performance.now();

        const scrollLoop = (time) => {
            const delta = time - lastTime;
            lastTime = time;

            // Cap delta to prevent huge jumps when switching tabs
            const cappedDelta = Math.min(delta, 50);

            if (container) {
                const maxScroll = container.scrollWidth / 3;

                if (isManual.current) {
                    // Smoothly animate towards target scroll using lerp
                    const current = container.scrollLeft;
                    const diff = targetScrollRef.current - current;
                    
                    // Simple delta-time adjusted lerp
                    const lerpFactor = 0.08 * (cappedDelta / 16.6);
                    const next = current + diff * Math.min(lerpFactor, 1);
                    container.scrollLeft = next;

                    // If we are close enough to the target, end manual scroll mode
                    if (Math.abs(diff) < 0.8) {
                        container.scrollLeft = targetScrollRef.current;
                        isManual.current = false;
                    }
                } else if (!isHovered.current) {
                    // Auto-scroll mode
                    const speed = 0.08; // Pixels per millisecond (approx 80px/sec)
                    targetScrollRef.current += speed * cappedDelta;
                    container.scrollLeft = targetScrollRef.current;
                }

                // Infinite wrapping check
                if (container.scrollLeft >= 2 * maxScroll) {
                    container.scrollLeft -= maxScroll;
                    targetScrollRef.current -= maxScroll;
                } else if (container.scrollLeft < maxScroll) {
                    container.scrollLeft += maxScroll;
                    targetScrollRef.current += maxScroll;
                }
            }

            animationFrameId = requestAnimationFrame(scrollLoop);
        };

        animationFrameId = requestAnimationFrame(scrollLoop);

        return () => {
            clearTimeout(initTimeout);
            cancelAnimationFrame(animationFrameId);
            if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
        };
    }, []);

    const handleManualScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        // Clear manual scrolling timeout
        if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);

        // Find single card step width (card width + column-gap)
        let stepWidth = 304; // default fallback
        const firstCard = container.firstElementChild;
        if (firstCard) {
            const cardWidth = firstCard.clientWidth;
            const style = window.getComputedStyle(container);
            const gap = parseFloat(style.columnGap || style.gap) || 24;
            stepWidth = cardWidth + gap;
        }

        // Set target scroll position
        const change = direction === "right" ? stepWidth : -stepWidth;
        
        // If we were already in manual transition, we start from the target position to stack clicks nicely
        const startPos = isManual.current ? targetScrollRef.current : container.scrollLeft;
        targetScrollRef.current = startPos + change;
        isManual.current = true;

        // Prevent auto-scroll for 2 seconds after manual interaction
        isHovered.current = true;
        manualTimeoutRef.current = setTimeout(() => {
            isHovered.current = false;
        }, 2000);
    };

    const handleTouchStart = () => {
        isHovered.current = true;
        isManual.current = false; // cancel any active button animations during manual touch
        if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };

    const handleTouchEnd = () => {
        if (containerRef.current) {
            targetScrollRef.current = containerRef.current.scrollLeft;
        }
        // Keep paused for a moment after swipe finishes
        manualTimeoutRef.current = setTimeout(() => {
            isHovered.current = false;
        }, 1500);
    };

    return (
        <section className="relative py-12 sm:py-16 bg-[#02070f] overflow-hidden border-t border-b border-white/5">
            {/* Background Glow */}
            <div className="absolute top-0 right-[10%] w-[500px] h-[300px] bg-cyan-400/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-[10%] w-[500px] h-[300px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 mb-8 text-center sm:text-left">
                <p className="text-cyan-400 uppercase tracking-[4px] text-xs font-semibold mb-2">
                    Spotlight
                </p>
                <h2 className="text-2xl sm:text-4xl font-bold text-white">
                    Innovations &amp; Showcases
                </h2>
            </div>

            {/* Scrolling Marquee Container */}
            <div className="relative w-full flex items-center justify-start overflow-hidden py-4 select-none">
                {/* Fade overlays on edges for premium look */}
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#02070f] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#02070f] to-transparent z-10 pointer-events-none"></div>

                {/* Manual Navigation Buttons */}
                <button 
                    onClick={() => handleManualScroll("left")}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full border border-white/10 bg-[#070d19]/85 backdrop-blur-md text-white/70 hover:text-white hover:border-cyan-400/50 hover:bg-[#070d19] transition-all duration-300 shadow-lg shadow-black/40 active:scale-95 group"
                    aria-label="Scroll Left"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    onClick={() => handleManualScroll("right")}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full border border-white/10 bg-[#070d19]/85 backdrop-blur-md text-white/70 hover:text-white hover:border-cyan-400/50 hover:bg-[#070d19] transition-all duration-300 shadow-lg shadow-black/40 active:scale-95 group"
                    aria-label="Scroll Right"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div 
                    ref={containerRef}
                    onMouseEnter={() => { isHovered.current = true; }}
                    onMouseLeave={() => { isHovered.current = false; }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="flex gap-6 overflow-x-auto scrollbar-none min-w-full"
                >
                    {displayList.map((src, index) => (
                        <div 
                            key={index}
                            className="w-[200px] sm:w-[280px] h-[282px] sm:h-[396px] shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:border-cyan-400/50 hover:scale-[1.03] transition-all duration-500 bg-[#070d19]"
                        >
                            <img
                                src={src}
                                alt={`Poster ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                draggable="false"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom CSS to hide scrollbars */}
            <style>{`
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
