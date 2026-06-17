
import { motion } from "framer-motion";
import {
    Cpu,
    Cable,
    Code2,
    Bot,
    Layers,
    Box
} from "lucide-react";

function Solutions() {

    const solutions = [
        {
            title: "Smart Embedded Systems",
            desc: "We develop intelligent embedded solutions that power devices with real-time control, sensing, and automation.",
            icon: <Cpu size={28} />,
            points: [
                "Microcontroller-based systems",
                "Sensor integration",
                "Edge computing devices"
            ]
        },
        {
            title: "Industrial Electrical Systems",
            desc: "We design robust electrical architectures for automation, control systems, and industrial applications.",
            icon: <Cable size={28} />,
            points: [
                "Control panels",
                "Circuit & PCB systems",
                "Power distribution design"
            ]
        },
        {
            title: "Software & IoT Platforms",
            desc: "We build scalable digital platforms that connect hardware systems with cloud and user interfaces.",
            icon: <Code2 size={28} />,
            points: [
                "IoT dashboards",
                "Cloud integration",
                "API systems"
            ]
        },
        {
            title: "AI & Intelligent Systems",
            desc: "We integrate artificial intelligence into systems for prediction, automation, and smart decision-making.",
            icon: <Bot size={28} />,
            points: [
                "Predictive analytics",
                "Computer vision",
                "Smart automation"
            ]
        },
        {
            title: "System Integration (AIoT)",
            desc: "We connect hardware, software, and intelligence layers into unified AIoT ecosystems.",
            icon: <Layers size={28} />,
            points: [
                "End-to-end system integration",
                "Device-cloud communication",
                "Real-time data pipelines"
            ]
        },
        {
            title: "Prototyping & 3D Manufacturing",
            desc: "We rapidly convert ideas into physical prototypes using advanced 3D printing and modeling.",
            icon: <Box size={28} />,
            points: [
                "Rapid prototyping",
                "Functional models",
                "Product validation builds"
            ]
        }
    ];

    return (
        <section className="relative overflow-hidden bg-black text-white min-h-screen pt-32">

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#031426] via-[#02111f] to-[#07384d]"></div>

            <div className="absolute top-0 left-[-200px] w-[600px] h-[600px] bg-cyan-400/20 blur-[180px] rounded-full"></div>
            <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/10 blur-[180px] rounded-full"></div>

            {/* HERO */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 min-h-[70vh] flex items-center">

                <div className="max-w-3xl">

                    <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-6">
                        Our Solutions
                    </p>

                    <h1 className="text-4xl sm:text-3xl sm:text-5xl md:text-7xl leading-tight">
                        <span className="font-light">Engineering Integrated Systems.</span>
                        <br />
                        <span className="font-bold">Hardware. Software. Intelligence.</span>
                    </h1>

                    <p className="mt-8 text-gray-300 text-lg leading-8">
                        We build complete AIoT ecosystems by combining embedded systems,
                        electrical engineering, software platforms, and artificial intelligence
                        into unified solutions.
                    </p>

                </div>
            </div>

            {/* SOLUTIONS GRID */}
            <div className="relative z-10 bg-black py-16 sm:py-32">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">

                    <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-6">
                        What We Build
                    </p>

                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-16">
                        Complete Engineering Solutions
                    </h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
                        {solutions.map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="relative rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-cyan-500/10 hover:border-cyan-400 transition"
                            >
                                <div className="text-cyan-400 mb-6">
                                    {item.icon}
                                </div>

                                <h3 className="text-2xl font-semibold mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-gray-400 mb-6">
                                    {item.desc}
                                </p>

                                <ul className="space-y-2 text-gray-500 text-sm">
                                    {item.points.map((p, idx) => (
                                        <li key={idx}>• {p}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* SYSTEM INTEGRATION */}
            <div className="relative z-10 bg-white text-black py-16 sm:py-32">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">

                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-10">
                        How Everything Connects
                    </h2>

                    <p className="text-xl text-gray-600 leading-9">
                        Embedded devices collect data → Electrical systems power operations →
                        Software processes information → AI makes decisions → Systems respond in real time.
                    </p>

                </div>
            </div>

            {/* INDUSTRY USE */}
            <div className="relative z-10 bg-black text-white py-16 sm:py-32">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">

                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-16">
                        Where We Apply These Solutions
                    </h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 text-gray-300">

                        <div>• Industrial Automation Systems</div>
                        <div>• Smart Manufacturing</div>
                        <div>• Smart Devices & IoT Products</div>
                        <div>• Robotics & Control Systems</div>
                        <div>• AI-based Monitoring Systems</div>
                        <div>• Research & Prototyping Labs</div>

                    </div>

                </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 bg-black text-white py-16 sm:py-32 text-center">

                <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6">
                    Let’s Build Your Solution
                </h2>

                <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                    From embedded systems to AIoT platforms, we deliver complete engineering solutions.
                </p>

                <button className="px-8 py-4 bg-cyan-500 text-black font-semibold rounded-full hover:scale-105 transition">
                    Contact Us
                </button>

            </div>

        </section>
    );
}

export default Solutions;