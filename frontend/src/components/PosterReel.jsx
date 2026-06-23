import { motion } from "framer-motion";

// ⭐ USER CONFIGURATION: ADD YOUR POSTER IMAGES HERE
// Place your poster image files inside the 'frontend/public/posters/' folder.
// Then add their relative paths below, e.g., "/posters/poster1.png"
const posterImages = [
    // "/posters/poster1.png",
    // "/posters/poster2.png",
    // "/posters/poster3.png",
];

// Placeholder posters to display when the user has not uploaded any images yet.
const placeholderPosters = [
    { id: 1, title: "Smart Agriculture", desc: "NPK & Soil Moisture Systems", color: "from-[#083344] to-[#0f172a]" },
    { id: 2, title: "Air Quality Control", desc: "Real-time AQMS Monitoring", color: "from-[#1e1b4b] to-[#0f172a]" },
    { id: 3, title: "Industrial AIoT", desc: "Automated Production Lines", color: "from-[#581c87] to-[#0f172a]" },
    { id: 4, title: "Mechanical Blueprints", desc: "Precision 3D Part Renders", color: "from-[#3c1518] to-[#0f172a]" },
    { id: 5, title: "Smart Energy Relay", desc: "Hybrid Harvesting System", color: "from-[#14532d] to-[#0f172a]" }
];

export default function PosterReel() {
    const isImagesEmpty = posterImages.length === 0;
    
    // We duplicate the array to ensure smooth, infinite marquee loops
    const displayList = isImagesEmpty ? [...placeholderPosters, ...placeholderPosters] : [...posterImages, ...posterImages];

    return (
        <section className="relative py-14 sm:py-20 bg-[#02070f] overflow-hidden border-t border-b border-white/5">
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
                {isImagesEmpty && (
                    <p className="text-xs text-amber-300 mt-2 bg-amber-400/10 inline-block px-3.5 py-2 rounded-lg border border-amber-400/20 max-w-2xl text-left">
                        💡 <strong>How to add your own posters:</strong> Place your image files in the <code>frontend/public/posters/</code> directory (create the <code>posters</code> folder inside <code>public</code> if it doesn't exist) and then add their paths (e.g. <code>"/posters/your-image.png"</code>) to the <code>posterImages</code> array inside <code>PosterReel.jsx</code>.
                    </p>
                )}
            </div>

            {/* Scrolling Marquee Container */}
            <div className="relative w-full flex items-center justify-start overflow-hidden py-4 select-none">
                <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-full">
                    {displayList.map((item, index) => {
                        if (isImagesEmpty) {
                            // Render high-fidelity custom placeholder poster card
                            return (
                                <div 
                                    key={index} 
                                    className={`inline-flex flex-col justify-between w-[280px] sm:w-[360px] h-[180px] sm:h-[220px] p-6 rounded-2xl border border-white/10 bg-gradient-to-br ${item.color} shadow-lg backdrop-blur-md shrink-0`}
                                >
                                    <div>
                                        <span className="text-[10px] sm:text-xs text-cyan-400 uppercase font-semibold tracking-wider">
                                            Placeholder Poster {item.id}
                                        </span>
                                        <h3 className="text-lg sm:text-2xl font-bold text-white mt-1 sm:mt-2 whitespace-normal leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-400 mt-1 whitespace-normal">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] sm:text-xs text-gray-500 font-medium">
                                        <span>EMBED AIOT</span>
                                        <span>SYSTEM PREVIEW</span>
                                    </div>
                                </div>
                            );
                        } else {
                            // Render actual user poster image
                            return (
                                <img
                                    key={index}
                                    src={item}
                                    alt={`Poster ${index}`}
                                    className="w-[280px] sm:w-[360px] h-[180px] sm:h-[220px] object-cover rounded-2xl border border-white/10 shadow-lg shrink-0 hover:scale-105 transition-transform duration-500"
                                />
                            );
                        }
                    })}
                </div>
            </div>

            {/* Custom styling for infinite scrolling marquee */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
