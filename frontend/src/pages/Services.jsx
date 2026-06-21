import {
    Cpu,
    Brain,
    Wifi,
    ShieldCheck,
    Cloud,
    Bot,
    Factory,
    Building2,
    Hospital,
    Car,
    Smartphone,
    Warehouse,
    Settings,
    Wrench,
    Zap,
    Radio,
    Layers,
    Box,
    Component
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, useState, useEffect } from "react";
import { API_URL } from "../config";

const staticServices = [
    {
        title: "Embedded Systems",
        desc: "Advanced hardware and firmware solutions for intelligent connected products.",
        points: [
            { icon: <Cpu size={18} />, text: "Firmware" },
            { icon: <Wifi size={18} />, text: "IoT Devices" },
            { icon: <ShieldCheck size={18} />, text: "Security" }
        ]
    },
    {
        title: "Mechanical Solutions",
        desc: "Precision engineering and 3D modeling to transform complex concepts into physical hardware.",
        points: [
            { icon: <Settings size={18} />, text: "CAD Modeling" },
            { icon: <Cpu size={18} />, text: "Structural Analysis" },
            { icon: <Wrench size={18} />, text: "Prototyping" }
        ]
    },
    {
        title: "Industrial AIoT",
        desc: "Smart monitoring and automation systems for modern industries.",
        points: [
            { icon: <Wifi size={18} />, text: "Monitoring" },
            { icon: <Cpu size={18} />, text: "Control Systems" },
            { icon: <Cloud size={18} />, text: "Analytics" }
        ]
    },
    {
        title: "Electrical Systems",
        desc: "Smart monitoring and automation systems for modern industries.",
        points: [
            { icon: <Zap size={18} />, text: "PCB Design" },
            { icon: <Activity size={18} />, text: "Power Management" },
            { icon: <Radio size={18} />, text: "Signal Integrity" }
        ]
    },
    {
        title: "3D Printing Services",
        desc: "Smart monitoring and automation systems for modern industries.",
        points: [
            { icon: <Layers size={18} />, text: "Rapid Prototyping" },
            { icon: <Box size={18} />, text: "Functional End Parts" },
            { icon: <Component size={18} />, text: "Material Selection" }
        ]
    }
];

function Services() {
    const [activeStat, setActiveStat] = useState(0);
    const [serviceList, setServiceList] = useState(staticServices);

    useEffect(() => {
        fetch(`${API_URL}/api/services`)
            .then(res => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const mapped = data.map(s => ({
                        title: s.title,
                        desc: s.description,
                        points: [
                            { icon: <Wrench size={18} />, text: s.category || "Engineering Service" },
                            { icon: <Cpu size={18} />, text: "Professional Integration" }
                        ]
                    }));
                    
                    const combined = [...staticServices];
                    mapped.forEach(s => {
                        if (!combined.some(cs => cs.title.toLowerCase() === s.title.toLowerCase())) {
                            combined.push(s);
                        }
                    });
                    setServiceList(combined);
                }
            })
            .catch(err => console.log("Failed to fetch services, using static:", err));
    }, []);

    const industries = [
        { title: "Industrial Automation", icon: <Factory size={30} />, desc: "Smart industrial monitoring and automation systems." },
        { title: "Healthcare Tech", icon: <Hospital size={30} />, desc: "AI-powered healthcare and connected medical devices." },
        { title: "Smart Infrastructure", icon: <Building2 size={30} />, desc: "Connected intelligent infrastructure solutions." },
        { title: "Automotive Systems", icon: <Car size={30} />, desc: "Embedded automotive electronics and smart mobility." },
        { title: "Consumer Electronics", icon: <Smartphone size={30} />, desc: "Next-generation smart consumer products and devices." },
        { title: "Supply Chain & Logistics", icon: <Warehouse size={30} />, desc: "Real-time tracking and logistics automation systems." }
    ];

    const statsSlides = [
        [
            { number: "200K+", text: "Connected devices deployed" },
            { number: "98%", text: "Client satisfaction rate" },
            { number: "80+", text: "Projects delivered" },
            { number: "24/7", text: "Real-time monitoring" }
        ],
        [
            { number: "0.1°C", text: "Sensor accuracy" },
            { number: "2 Yrs", text: "Battery life optimization" },
            { number: "120°C", text: "Operating range" },
            { number: "KM+", text: "Wireless mesh range" }
        ],
        [
            { number: "AI", text: "Advanced automation" },
            { number: "Secure", text: "Enterprise-grade security" },
            { number: "Scale", text: "Startup to enterprise" },
            { number: "Future", text: "Next-gen technologies" }
        ]
    ];

    const whyCards = [
        { icon: <ShieldCheck size={36} />, title: "Low Price, High Quality", desc: "Premium high-accuracy sensors with outstanding performance at competitive pricing." },
        { icon: <Cpu size={36} />, title: "Wide Operating Range", desc: "Sensors operate from -40°C to 120°C with reliable performance." },
        { icon: <Wifi size={36} />, title: "Gateway Connectivity", desc: "Pair wireless sensors with secure gateways and monitor real-time readings." },
        { icon: <Cloud size={36} />, title: "Long Battery Life", desc: "Ultra-low power sensor systems designed for battery life exceeding 2 years." },
        { icon: <Bot size={36} />, title: "User Friendly", desc: "Simple and intuitive systems designed for easy use without technical expertise." },
        { icon: <Factory size={36} />, title: "Extended Wireless Range", desc: "Advanced mesh networking enables wireless communication over kilometer-scale distances." }
    ];

    return (
        <section className="relative overflow-hidden bg-black text-white px-4 sm:px-6 md:px-16 py-14 sm:py-24" style={{ isolation: 'isolate' }}>

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#031426] via-[#02111f] to-[#07384d]"></div>
            <div className="absolute top-0 left-[-200px] w-[700px] h-[700px] bg-cyan-400/20 blur-[180px] rounded-full"></div>
            <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full"></div>
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] border border-cyan-400/20 rounded-full"></div>
                <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] border border-cyan-400/10 rounded-full"></div>
            </div>

            {/* ── HERO ── */}
            <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-16 items-start mb-8 sm:mb-14">
                <div>
                    <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-4 sm:mb-6">Our Services</p>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl leading-tight">
                        <span className="font-light">Future-Ready</span><br />
                        <span className="font-bold">Digital Solutions</span>
                    </h1>
                    <p className="text-gray-400 mt-5 sm:mt-8 text-base sm:text-lg leading-7 sm:leading-8 max-w-xl">
                        We build intelligent AIoT ecosystems combining embedded systems,
                        artificial intelligence and industrial automation for modern businesses.
                    </p>
                </div>

                <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-10 bg-white/5
                    hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(0,255,255,0.12)]
                    transition-all duration-500"
                >
                    <div className="mb-5 sm:mb-8 text-cyan-400"><Brain size={36} /></div>
                    <h2 className="text-xl sm:text-3xl font-semibold mb-3 sm:mb-5">Artificial Intelligence</h2>
                    <p className="text-gray-400 leading-7 mb-4 sm:mb-8 text-sm sm:text-base">
                        Intelligent AI systems designed for automation,
                        predictive analytics and next-generation digital transformation.
                    </p>
                    <div className="space-y-3 sm:space-y-5">
                        {[{ icon: <Bot size={16} />, t: "AI Automation" }, { icon: <Brain size={16} />, t: "Machine Learning" }, { icon: <Cloud size={16} />, t: "Cloud Intelligence" }].map((i, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm sm:text-base">
                                <span className="text-cyan-400">{i.icon}</span><span>{i.t}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ── SERVICE CARDS ── */}
            <div className="relative z-10 max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-14 sm:mb-20">
                {serviceList.map((service, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="border border-white/10 rounded-2xl p-5 sm:p-7 bg-white/5
                        hover:bg-cyan-500/10 hover:border-cyan-400
                        hover:shadow-[0_0_40px_rgba(0,255,255,0.12)] transition-all duration-500"
                    >
                        <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4">{service.title}</h2>
                        <p className="text-gray-400 leading-7 mb-4 sm:mb-6 text-sm sm:text-base">{service.desc}</p>
                        <div className="space-y-3">
                            {service.points.map((point, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <span className="text-cyan-400">{point.icon}</span>
                                    <span>{point.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── WHO WE SERVE ── */}
            <div className="relative z-10 max-w-7xl mx-auto mb-14 sm:mb-20">
                <div className="mb-8 sm:mb-14 text-center">
                    <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-4">Who We Serve</p>
                    <h2 className="text-2xl sm:text-5xl md:text-6xl leading-tight">
                        <span className="font-light">Industries We</span><br />
                        <span className="font-bold">Transform With AIoT</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {industries.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative overflow-hidden border border-white/10 rounded-2xl p-5 sm:p-8 bg-white/5
                            hover:bg-cyan-500/10 hover:border-cyan-400
                            hover:shadow-[0_0_50px_rgba(0,255,255,0.12)] transition-all duration-500"
                        >
                            <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full"></div>
                            <div className="relative z-10">
                                <div className="text-cyan-400 mb-4 sm:mb-6">{item.icon}</div>
                                <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm sm:text-base leading-6 sm:leading-7">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── WHY CHOOSE ── */}
            <div className="relative z-10 max-w-7xl mx-auto mb-14 sm:mb-20">
                <div className="text-center mb-8 sm:mb-14">
                    <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-4">Why Choose Embed AIoT</p>
                    <h2 className="text-2xl sm:text-5xl md:text-6xl leading-tight">
                        <span className="font-light">Smart Technology</span><br />
                        <span className="font-bold">Built For The Future</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {whyCards.map((card, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-7
                            hover:bg-cyan-500/10 hover:border-cyan-400
                            hover:shadow-[0_0_50px_rgba(0,255,255,0.12)] transition-all duration-500"
                        >
                            <div className="absolute top-[-40px] right-[-40px] w-36 h-36 bg-cyan-400/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="text-cyan-400 mb-4 sm:mb-6">{card.icon}</div>
                                <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3">{card.title}</h3>
                                <p className="text-gray-400 text-sm sm:text-base leading-6 sm:leading-7">{card.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── STATS SECTION ── */}
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="bg-black/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-white/10">

                    {/* Header */}
                    <div className="grid md:grid-cols-2 gap-5 sm:gap-10 mb-6 sm:mb-10">
                        <div>
                            <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-3 sm:mb-4">Proven Impact</p>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl leading-tight">
                                <span className="font-light">Transformation That</span><br />
                                <span className="font-bold">Delivers Results</span>
                            </h2>
                        </div>
                        <div className="flex items-center">
                            <p className="text-gray-400 leading-7 text-sm sm:text-base">
                                We build intelligent embedded and AIoT systems
                                that help businesses scale faster with automation,
                                monitoring, security, and next-generation innovation.
                            </p>
                        </div>
                    </div>

                    {/* Sliding Stats — 2-col grid on mobile, 4-col on desktop */}
                    <div className="min-h-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStat}
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
                            >
                                {statsSlides[activeStat].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10"
                                    >
                                        <h3 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                                            {item.number}
                                        </h3>
                                        <p className="text-gray-400 text-xs sm:text-sm leading-5 sm:leading-6">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex items-center gap-3 mt-5 sm:mt-8">
                        {[0, 1, 2].map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveStat(item)}
                                className={`h-[4px] rounded-full transition-all duration-500 cursor-pointer
                                    ${activeStat === item ? "w-16 sm:w-24 bg-cyan-400" : "w-8 sm:w-12 bg-white/20"}`}
                            />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="grid md:grid-cols-2 gap-5 items-center mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10">
                        <div>
                            <h4 className="text-base sm:text-xl font-semibold mb-2">Smart Innovation</h4>
                            <p className="text-gray-400 text-sm sm:text-base leading-6 sm:leading-7">
                                Our AIoT ecosystem combines embedded intelligence,
                                wireless infrastructure, automation, and scalable cloud technologies.
                            </p>
                        </div>
                        <div className="md:text-right">
                            <button className="inline-flex items-center gap-3 border border-white/30
                                px-6 py-3 text-white text-sm sm:text-base rounded-lg
                                hover:border-cyan-400 hover:bg-white/5 transition-all duration-300">
                                Explore More
                                <span className="text-cyan-400">→</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}

export default Services;