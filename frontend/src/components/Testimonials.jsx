import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Testimonials() {

    const testimonials = [
        {
            text: "The Soil Moisture Meter has revolutionized our water management. It eliminates the guesswork in irrigation, preventing root rot and ensuring our crops remain perfectly hydrated.",
            name: "Dr. Faisal Mahmood",
            role: "Head of Sustainable Sourcing, Nestle"
        },
        {
            text: "By providing real-time nitrogen, phosphorus, and potassium levels, the Soil NPK Meter allows us to optimize fertilizer use, boost crop health, and implement precision farming.",
            name: "Dr. Sarah Khan",
            role: "Chief Agronomist, Nestle Agricultural Services"
        },
        {
            text: "The AQMS gives us highly accurate, real-time tracking of indoor air parameters and emissions. It plays a key role in maintaining compliance and protecting our workers' health.",
            name: "Mr. Tariq Bajwa",
            role: "Head of EHS, Koh e Noor Textile Mills"
        },
        {
            text: "This security system has vastly upgraded our campus safety. The real-time alerts and AI-integrated cameras provide our control room with excellent situational awareness.",
            name: "Dr. Muhammad Sajid",
            role: "Head of IT & Campus Security, NUST"
        }
    ];

    const [index, setIndex] = useState(0);

    // auto slider
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const getPosition = (i) => {
        const diff = i - index;

        if (diff === 0) return "center";
        if (diff === 1 || diff === -3) return "right";
        if (diff === -1 || diff === 3) return "left";
        return "hidden";
    };

    return (
        <section className="relative py-16 sm:py-28 px-4 sm:px-6 bg-[#0b0f17] text-white overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-400/10 blur-[140px] rounded-full"></div>

            <div className="relative max-w-6xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-10 sm:mb-16">
                    What Our Clients Say
                </h2>

                {/* ── DESKTOP carousel (hidden on mobile) ── */}
                <div className="hidden sm:block">
                    <div className="relative flex items-center justify-center h-[320px]">

                        {testimonials.map((item, i) => {

                            const pos = getPosition(i);

                            if (pos === "hidden") return null;

                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: pos === "center" ? 1 : 0.85,
                                        opacity: pos === "center" ? 1 : 0.4,
                                        x: pos === "left" ? -220 : pos === "right" ? 220 : 0,
                                        zIndex: pos === "center" ? 10 : 5
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="
                                        absolute
                                        w-[320px]
                                        md:w-[380px]
                                        bg-white/10
                                        backdrop-blur-md
                                        border border-white/10
                                        rounded-2xl
                                        p-8
                                        shadow-2xl
                                    "
                                >

                                    <p className="text-gray-200 text-sm md:text-base mb-6 leading-relaxed">
                                        "{item.text}"
                                    </p>

                                    <div className="border-t border-white/10 pt-4">
                                        <h4 className="font-semibold text-white">
                                            {item.name}
                                        </h4>
                                        <p className="text-gray-400 text-sm">
                                            {item.role}
                                        </p>
                                    </div>

                                </motion.div>
                            );
                        })}

                    </div>
                </div>

                {/* ── MOBILE single-card slider ── */}
                <div className="sm:hidden relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.4 }}
                            className="
                                w-full
                                bg-white/10
                                backdrop-blur-md
                                border border-white/10
                                rounded-2xl
                                p-6
                                shadow-2xl
                                text-left
                            "
                        >
                            {/* Quote mark */}
                            <span className="text-amber-400 text-4xl leading-none font-serif block mb-3">"</span>

                            <p className="text-gray-200 text-base mb-6 leading-relaxed">
                                {testimonials[index].text}
                            </p>

                            <div className="border-t border-white/10 pt-4">
                                <h4 className="font-semibold text-white">
                                    {testimonials[index].name}
                                </h4>
                                <p className="text-gray-400 text-sm mt-1">
                                    {testimonials[index].role}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-3 mt-8 sm:mt-10">

                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === index ? "bg-amber-400 w-10" : "bg-gray-600 w-6"
                                }`}
                        />
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Testimonials;
