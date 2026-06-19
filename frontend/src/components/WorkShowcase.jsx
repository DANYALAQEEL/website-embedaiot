import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function WorkShowcase() {

    // ⭐ Featured project
    const featuredProject = {
        title: "Hybrid Powered Fruit Drying System",
        desc: "An intelligent hybrid energy-based drying system designed for post-harvest optimization using AI control and IoT monitoring. It enhances efficiency, reduces waste, and modernizes agricultural processing.",
        images: [
            "/2.png",
            "/blender 6. back.png",
            "/fruit harvester isometric.png"
        ]
    };

    // ⚪ Other projects
    const projects = [
        {
            title: "Embedded Systems",
            desc: "Smart hardware solutions powering real-world automation.",
            img: "/embed 1.png"
        },
        {
            title: "IoT Solutions",
            desc: "Connected devices enabling smart environments.",
            img: "/IOT 1.png"
        },
        {
            title: "AQMS",
            desc: "An IoT-based system that monitors indoor air quality in real time using sensors to detect airborne particles and gases.",
            img: "/aqms.jpeg"
        }
    ];

    // 🔥 Slider state
    const [index, setIndex] = useState(0);

    // 📄 Brochure modal state
    const [showBrochure, setShowBrochure] = useState(false);

    const brochureUrl = "/brochure/8.png";

    // 🔄 Auto image slider
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % featuredProject.images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#0f1115] text-white overflow-hidden">

            {/* Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full"></div>

            <div className="relative max-w-7xl mx-auto">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-10 sm:mb-16 text-center">
                    Our Work in Action
                </h2>

                {/* ⭐ FEATURED PROJECT */}
                <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-center mb-12 sm:mb-16">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-amber-400 tracking-widest text-xs sm:text-sm">
                            ⭐ FEATURED PROJECT
                        </span>

                        <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-3 mb-4 sm:mb-5">
                            {featuredProject.title}
                        </h3>

                        <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                            {featuredProject.desc}
                        </p>

                        <div className="flex gap-3 sm:gap-4 flex-wrap">

                            {/* ✅ BROCHURE BUTTON */}
                            <button
                                onClick={() => setShowBrochure(true)}
                                className="px-5 sm:px-6 py-2.5 sm:py-2 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition text-sm sm:text-base font-medium"
                            >
                                View Brochure
                            </button>

                            <button className="px-5 sm:px-6 py-2.5 sm:py-2 border border-white/30 rounded-full hover:bg-white/10 transition text-sm sm:text-base">
                                View Gallery
                            </button>

                        </div>
                    </motion.div>

                    {/* RIGHT SLIDER */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[260px] sm:h-[360px] md:h-[420px]"
                    >
                        {featuredProject.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                className={`absolute w-full h-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        ))}

                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* dots */}
                        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {featuredProject.images.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full cursor-pointer ${i === index ? "bg-amber-400" : "bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ⚪ OTHER PROJECTS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

                    {projects.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.03 }}
                            className="relative rounded-xl sm:rounded-2xl overflow-hidden h-[220px] sm:h-[300px]"
                        >
                            <div className="w-full h-full flex items-center justify-center bg-black/10">
                                <img
                                    src={item.img}
                                    className="max-w-full max-h-full object-contain"
                                    alt={item.title}
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"></div>

                            <div className="absolute bottom-0 p-4 sm:p-5">
                                <h3 className="text-base sm:text-lg font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-300 mt-1">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                </div>

            </div>

            {/* 📄 BROCHURE MODAL */}
            {showBrochure && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">

                    {/* Close Button */}
                    <button
                        onClick={() => setShowBrochure(false)}
                        className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 z-50"
                    >
                        ✕
                    </button>

                    {/* Brochure Container */}
                    <div className="w-full max-w-3xl h-[95vh] bg-white rounded-xl overflow-auto shadow-2xl">

                        <img
                            src={brochureUrl}
                            alt="Project Brochure"
                            className="w-full h-auto object-contain"
                        />

                    </div>
                </div>
            )}
        </section>
    );
}

export default WorkShowcase;
