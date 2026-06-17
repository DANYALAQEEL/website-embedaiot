import { useState } from "react";

function ServicesSection() {

    const [activeCard, setActiveCard] = useState(0);

    const services = [
        {
            title: "Embedded Systems",
            short: "Smart hardware and firmware solutions.",
            details: [
                "Firmware Development",
                "PCB Design",
                "Sensor Integration",
                "Microcontroller Programming"
            ]
        },


        {
            title: "Artificial Intelligence",
            short: "AI-powered automation and analytics.",
            details: [
                "Computer Vision",
                "Machine Learning",
                "AI Automation",
                "Predictive Analytics"
            ]
        },
        {
            title: "IoT Solutions",
            short: "Connected smart device ecosystems.",
            details: [
                "Smart Monitoring",
                "Cloud Connectivity",
                "Real-time Tracking",
                "Industrial Automation"
            ]
        }
    ];

    return (

        <section className="bg-black text-white py-16 sm:py-28 px-4 sm:px-6">

            <div className="max-w-7xl mx-auto">

                {/* Heading */}

                <div className="mb-10 sm:mb-16">

                    <p className="text-cyan-400 uppercase text-sm tracking-widest mb-3 sm:mb-4">
                        Our Services
                    </p>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
                        Smart Embedded & AI Solutions For Modern Industries
                    </h2>

                </div>

                {/* Cards */}

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">

                    {services.map((service, index) => (

                        <div
                            key={index}
                            onClick={() => setActiveCard(index)}
                            className={`border rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-500

                            ${activeCard === index
                                    ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                                    : "bg-white/5 border-white/10 hover:border-cyan-400/40"
                                }
                            `}
                        >

                            {/* Title */}

                            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                                {service.title}
                            </h3>

                            {/* Short Description */}

                            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                                {service.short}
                            </p>

                            {/* Expanded Content */}

                            {activeCard === index && (

                                <div className="border-t border-white/10 pt-4 sm:pt-6 space-y-3">

                                    {service.details.map((item, i) => (

                                        <div
                                            key={i}
                                            className="flex items-center gap-3 text-sm text-gray-300"
                                        >

                                            <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></div>

                                            {item}

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default ServicesSection;
