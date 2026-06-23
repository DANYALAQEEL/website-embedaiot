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
    // We duplicate the array 3 times to ensure smooth, infinite marquee loops without gaps on wide screens
    const displayList = [...posterImages, ...posterImages, ...posterImages];

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

                <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-full">
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
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom styling for infinite scrolling marquee */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 50s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
