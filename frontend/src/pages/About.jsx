// Add these icons in your import statement at the top of AboutUs.jsx

import { motion } from "framer-motion";
import {
    Search,
    PencilRuler,
    Code2,
    Rocket,
    Lightbulb,
    Workflow,
    TrendingUp,
    Check,
    Crown,
    Users,
    FlaskConical,
    Megaphone
} from "lucide-react";
import ceoImg from "../assets/persons/2222.png";
import teamLead1Img from "../assets/persons/aa.png";
import teamLead2Img from "../assets/persons/22.jpg";
import researcher1Img from "../assets/persons/Muhammad-Uzair.jpeg";
import researcher2Img from "../assets/persons/Kashif-Janjua.jpeg";
import researcher3Img from "../assets/persons/8.jpeg";
import marketing1Img from "../assets/persons/4.png";
import marketing2Img from "../assets/persons/a.png";
function About() {
    const teamGroups = [
        {
            department: "Director & CEO",
            icon: <Crown size={22} />,
            members: [
                {
                    name: "Dr Shahzad Younis",
                    role: "Founder and Chief Executive Officer",
                    image: ceoImg
                }
            ]
        },

        {
            department: "Team Leads",
            icon: <Users size={22} />,
            members: [
                {
                    name: "Muhammad Tayyab",
                    role: "Product Development Engineer",
                    image: teamLead1Img
                },
                {
                    name: "Muhammad Tayyab",
                    role: "Design Engineer",
                    image: teamLead2Img
                }
            ]
        },

        {
            department: "Research & Development",
            icon: <FlaskConical size={22} />,
            members: [
                {
                    name: "Muhammad Uzair",
                    role: "Design Engineer",
                    image: researcher1Img
                },
                {
                    name: "Kashif Janjua",
                    role: "Team Member",
                    image: researcher2Img
                },
                {
                    name: "Nazish Zulfiqar",
                    role: "Senior Research Scientist",
                    image: researcher3Img
                }
            ]
        },

        {
            department: "Sales & Marketing",
            icon: <Megaphone size={22} />,
            members: [
                {
                    name: "Nida Nabeel",
                    role: "Media Manager",
                    image: marketing1Img
                },
                {
                    name: "Naveen Akbar",
                    role: "Product Designer",
                    image: marketing2Img
                }
            ]
        }
    ];
    return (
        <section className="relative overflow-hidden bg-black text-white min-h-screen pt-32">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#031426] via-[#02111f] to-[#07384d]"></div>

            {/* Large Left Glow */}
            <div className="absolute top-0 left-[-200px] w-[700px] h-[700px] bg-cyan-400/20 blur-[180px] rounded-full"></div>

            {/* Bottom Center Glow */}
            <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full"></div>

            {/* Subtle Arc Lines */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] border border-cyan-400/20 rounded-full"></div>
                <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] border border-cyan-400/10 rounded-full"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-4 sm:px-6 md:px-16 min-h-[90vh] flex items-center">

                {/* Left Content */}
                <div className="max-w-3xl">

                    {/* Small Label */}
                    <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-6">
                        About Us
                    </p>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight">
                        <span className="font-light">
                            More Than Technology.
                        </span>
                        <br />
                        <span className="font-bold">
                            We Engineer Possibilities
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-8 text-gray-300 text-lg leading-8 max-w-3xl">
                        Embed AIoT transforms ambitious ideas into scalable embedded
                        systems, artificial intelligence, and industrial IoT solutions.
                        We help startups and enterprises build intelligent products that
                        deliver measurable impact and long-term business growth.
                    </p>

                </div>

            </div>
            {/* INTRO SECTION */}
            <div className="relative bg-white text-black py-16 sm:py-32 overflow-hidden">

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-cyan-200 via-blue-200 to-cyan-200 blur-3xl opacity-60"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

                    {/* Small Label */}
                    <p className="text-cyan-500 uppercase tracking-[4px] text-sm mb-8">
                        How We Make It Possible
                    </p>

                    {/* Paragraph */}
                    <p className="text-2xl md:text-4xl leading-relaxed font-light text-gray-900">
                        We shape our approach to match the needs of who we serve,
                        helping startups validate ideas and scale fast while enabling
                        enterprises to modernize operations and unlock measurable impact.
                        From concept to deployment, we transform innovation into lasting success.
                    </p>

                </div>

            </div>
            {/* =========================================================
   {/* =========================================================
   OUR FOUNDATION SECTION
   Add this section BELOW the Intro Section
   in src/pages/About.jsx
========================================================= */}

            <div className="relative bg-black text-white py-32 overflow-hidden">

                {/* Background Glow */}
                <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] bg-cyan-400/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-[-100px] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16">

                    {/* Small Label */}
                    <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-6">
                        Our Foundation
                    </p>

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-5xl md:text-7xl leading-tight mb-10 sm:mb-20">
                        <span className="font-light">
                            The Principles That
                        </span>
                        <br />
                        <span className="font-bold">
                            Drive Everything We Build
                        </span>
                    </h2>

                    {/* Three Premium Cards */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">

                        {/* Card 1 */}
                        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400"></div>

                            <h3 className="text-3xl font-semibold mb-6">
                                Our Mission
                            </h3>

                            <p className="text-gray-400 leading-8">
                                To transform ideas into intelligent embedded, AI, and Industrial
                                IoT solutions that create measurable value for businesses worldwide.
                            </p>
                        </div>

                        {/* Card 2 (Highlighted Center Card) */}
                        <div className="relative rounded-3xl border border-cyan-400 bg-cyan-500/10 p-10 shadow-[0_0_50px_rgba(0,255,255,0.10)]">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400"></div>

                            <h3 className="text-3xl font-semibold mb-6">
                                Our Vision
                            </h3>

                            <p className="text-gray-300 leading-8">
                                To become a global technology partner empowering industries
                                through connected intelligence, automation, and future-ready products.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400"></div>

                            <h3 className="text-3xl font-semibold mb-6">
                                Our Values
                            </h3>

                            <p className="text-gray-400 leading-8">
                                Innovation, reliability, transparency, and engineering excellence
                                guide every solution we design and deliver.
                            </p>
                        </div>

                    </div>

                </div>
            </div>


            {/* =========================================================
   HOW WE WORK SECTION
   Add this section IMMEDIATELY BELOW the Our Foundation Section
========================================================= */}

            <div className="relative bg-black text-white py-20 md:py-32 overflow-hidden">

                {/* Background Glow */}
                <div className="absolute top-0 right-[-150px] w-[500px] h-[500px] bg-cyan-400/10 blur-[140px] rounded-full"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16">

                    {/* Small Label */}
                    <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-6">
                        How We Work
                    </p>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-5xl md:text-7xl leading-tight mb-10 sm:mb-20">
                        <span className="font-light">
                            From Concept To
                        </span>
                        <br />
                        <span className="font-bold">
                            Scalable Innovation
                        </span>
                    </h2>

                    {/* 4 Steps */}
                    {/* Process Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

                        {[
                            {
                                number: "01",
                                title: "Discovery",
                                desc: "We analyze your business goals, technical requirements, and opportunities to define the best AIoT strategy.",
                                icon: <Search className="w-7 h-7" />
                            },
                            {
                                number: "02",
                                title: "Design",
                                desc: "Our experts create system architecture, hardware design, firmware planning, and scalable AI models.",
                                icon: <PencilRuler className="w-7 h-7" />
                            },
                            {
                                number: "03",
                                title: "Development",
                                desc: "We build embedded systems, cloud platforms, AI algorithms, and seamless IoT integrations.",
                                icon: <Code2 className="w-7 h-7" />
                            },
                            {
                                number: "04",
                                title: "Deployment",
                                desc: "Solutions are tested, optimized, and deployed with ongoing support for long-term success.",
                                icon: <Rocket className="w-7 h-7" />
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(0,255,255,0.12)] transition-all duration-500"
                            >
                                {/* Card Glow */}
                                <div className="absolute top-[-40px] right-[-40px] w-32 h-32 bg-cyan-400/10 blur-3xl rounded-full"></div>

                                <div className="relative z-10">

                                    {/* Step Number + Icon row on mobile */}
                                    <div className="flex items-center justify-between mb-4 sm:block">
                                        <span className="text-cyan-400 text-sm tracking-[3px] font-medium">
                                            {step.number}
                                        </span>
                                        <div className="text-cyan-400 sm:hidden">
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Icon — desktop only */}
                                    <div className="hidden sm:block mt-4 mb-5 text-cyan-400">
                                        {step.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm sm:text-base leading-6 sm:leading-8">
                                        {step.desc}
                                    </p>

                                </div>
                            </motion.div>
                        ))}

                    </div>

                </div>
            </div>
            {/* =========================================================
   THREE PILLARS SECTION
========================================================= */}
            <div className="relative bg-white text-black py-32 overflow-hidden">

                {/* Background Glow */}
                <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] bg-cyan-200/40 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-[-100px] w-[400px] h-[400px] bg-blue-200/40 blur-[120px] rounded-full"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16">

                    {/* Section Label */}
                    <p className="text-cyan-500 uppercase tracking-[4px] text-sm mb-6">
                        Creating Vision Through Three Pillars
                    </p>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-5xl md:text-7xl leading-tight mb-6 sm:mb-8 text-gray-900">
                        <span className="font-light">
                            Turning Vision Into
                        </span>
                        <br />
                        <span className="font-bold">
                            Scalable Outcomes
                        </span>
                    </h2>

                    {/* Intro Text */}
                    <p className="text-base sm:text-xl text-gray-600 leading-8 sm:leading-9 max-w-4xl mb-10 sm:mb-20">
                        Our mission is to help organizations innovate faster, scale smarter,
                        and stay future-ready. We design solutions that create impact across
                        industries and build lasting value.
                    </p>

                    {/* Pillar Cards */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">

                        {[
                            {
                                icon: <Lightbulb className="w-10 h-10" />,
                                title: "Product Innovation",
                                subtitle: "From concept to scale",
                                points: [
                                    "Rapid MVP development for fast validation",
                                    "AI, IoT, and Edge capabilities built in from the start",
                                    "Platform architectures designed for growth"
                                ]
                            },
                            {
                                icon: <Workflow className="w-10 h-10" />,
                                title: "Workflow Modernization",
                                subtitle: "Turning legacy into advantage",
                                points: [
                                    "Agentic AI systems that automate complex workflows",
                                    "Cloud-native transformations unlocking agility",
                                    "API-first integrations connecting the ecosystem"
                                ]
                            },
                            {
                                icon: <TrendingUp className="w-10 h-10" />,
                                title: "Scalability & Growth",
                                subtitle: "Systems that grow with ambition",
                                points: [
                                    "Architectures handling 10x growth seamlessly",
                                    "DevOps practices compressing deployment cycles",
                                    "Reliability engineering delivering 99.9%+ uptime"
                                ]
                            }
                        ].map((pillar, index) => (
                            <div
                                key={index}
                                className="
        group
        relative
        isolate
        overflow-hidden
        rounded-3xl
        border border-gray-200
        bg-white
        p-10
        shadow-sm
        transform-gpu
        will-change-transform
        transition-all duration-500
        hover:scale-[1.03]
        hover:shadow-2xl
    "
                            >
                                {/* Glow */}
                                <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>

                                {/* Default Content */}
                                <div className="relative z-10 transition-all duration-500 group-hover:-translate-y-4">

                                    {/* Icon */}
                                    <div className="text-cyan-500 mb-8">
                                        {pillar.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-3xl font-semibold mb-3 text-gray-900">
                                        {pillar.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="text-gray-500 text-lg">
                                        {pillar.subtitle}
                                    </p>
                                </div>

                                {/* Hover Content */}
                                <div className="relative z-10 mt-8 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[300px] transition-all duration-500">
                                    <div className="space-y-4">
                                        {pillar.points.map((point, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                                                <span className="text-gray-600 leading-7">
                                                    {point}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
            {/* =========================================================
   MEET OUR TEAM SECTION
   
========================================================= */}

            <div className="relative bg-black text-white py-32 overflow-hidden">

                {/* Background Glow */}
                <div className="absolute top-20 left-[-120px] w-[420px] h-[420px] bg-cyan-400/10 blur-[140px] rounded-full"></div>
                <div className="absolute bottom-0 right-[-120px] w-[420px] h-[420px] bg-blue-500/10 blur-[140px] rounded-full"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16">

                    {/* Section Label */}
                    <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-6 text-center">
                        Meet Our Team
                    </p>

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-5xl md:text-7xl leading-tight mb-6 sm:mb-8 text-center">
                        <span className="font-light">
                            The People Behind
                        </span>
                        <br />
                        <span className="font-bold">
                            Embed AIoT
                        </span>
                    </h2>

                    {/* Intro Text */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-7 md:leading-9 max-w-4xl mx-auto mb-10 sm:mb-16 md:mb-24 text-center">
                        Our multidisciplinary team combines expertise in embedded systems,
                        artificial intelligence, industrial IoT, product design, and digital
                        innovation to transform ambitious ideas into scalable technology solutions.
                    </p>
                    {/* Department Groups */}
                    <div className="space-y-14 sm:space-y-24">

                        {teamGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>

                                {/* Department Header */}
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                                        {group.icon}
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-semibold">
                                        {group.department}
                                    </h3>
                                </div>

                                {/* =======================================================
                SPECIAL CEO FEATURED CARD
            ======================================================= */}
                                {groupIndex === 0 ? (
                                    <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-[#04131f] to-[#0a1f2f] shadow-[0_0_60px_rgba(0,255,255,0.08)]">
                                        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none"></div>

                                        {/* ── MOBILE: stacked portrait layout ── */}
                                        <div className="lg:hidden relative z-10">

                                            {/* Full-width image with gradient fade at bottom */}
                                            <div className="relative w-full h-[340px] sm:h-[420px]">
                                                <img
                                                    src={group.members[0].image}
                                                    alt={group.members[0].name}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                                {/* fade to card bg */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#04131f] via-[#04131f]/30 to-transparent"></div>

                                                {/* Name floats over image bottom */}
                                                <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 text-xs tracking-widest uppercase mb-2">
                                                        {group.icon}
                                                        Director & CEO
                                                    </div>
                                                    <h4 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                                        {group.members[0].name}
                                                    </h4>
                                                </div>
                                            </div>

                                            {/* Content below image */}
                                            <div className="px-5 sm:px-6 pb-7 pt-4">
                                                <p className="text-gray-300 text-sm leading-7 mb-3">
                                                    With extensive experience in Embedded Systems,
                                                    Artificial Intelligence, Industrial IoT, and
                                                    Product Development, our CEO leads Embed AIoT
                                                    with a vision to transform innovative ideas
                                                    into intelligent and scalable technology solutions.
                                                </p>

                                                <div className="grid grid-cols-1 gap-2.5 mt-4">
                                                    {[
                                                        "Embedded Systems Expert",
                                                        "AI & Industrial IoT Specialist",
                                                        "Product Innovation Leader",
                                                        "Research & Development Visionary"
                                                    ].map((item, index) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                                            <span className="text-gray-300 text-sm">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── DESKTOP: side-by-side layout ── */}
                                        <div className="hidden lg:grid relative z-10 grid-cols-[280px_1fr] gap-8 items-center p-8">
                                            {/* Left Side - CEO Image */}
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-3xl"></div>
                                                <img
                                                    src={group.members[0].image}
                                                    alt={group.members[0].name}
                                                    className="relative w-full h-[420px] object-cover rounded-3xl border border-white/10 shadow-2xl"
                                                />
                                            </div>

                                            {/* Right Side - CEO Information */}
                                            <div>
                                                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-sm tracking-[3px] uppercase mb-4">
                                                    {group.icon}
                                                    Director & CEO
                                                </div>
                                                <h4 className="text-5xl font-bold leading-tight mb-3">
                                                    {group.members[0].name}
                                                </h4>
                                                <p className="text-gray-300 text-lg leading-7 mb-4">
                                                    With extensive experience in Embedded Systems,
                                                    Artificial Intelligence, Industrial IoT, and
                                                    Product Development, our CEO leads Embed AIoT
                                                    with a vision to transform innovative ideas
                                                    into intelligent and scalable technology solutions.
                                                </p>
                                                <p className="text-gray-400 text-base leading-7 mb-5">
                                                    Combining deep technical expertise, research
                                                    excellence, and strategic leadership, he has
                                                    successfully delivered cutting-edge products
                                                    for industrial automation, healthcare,
                                                    smart infrastructure, and emerging technologies.
                                                </p>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        "Embedded Systems Expert",
                                                        "AI & Industrial IoT Specialist",
                                                        "Product Innovation Leader",
                                                        "Research & Development Visionary"
                                                    ].map((item, index) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                                            <span className="text-gray-300">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* =======================================================
                                        ALL OTHER DEPARTMENTS (UNCHANGED)
                                    ======================================================= */
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                                        {group.members.map((member, memberIndex) => (
                                            <div
                                                key={memberIndex}
                                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(0,255,255,0.12)] transition-all duration-500"
                                            >
                                                {/* Glow */}
                                                <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></div>

                                                <div className="relative z-10 text-center">

                                                    {/* Profile Image */}
                                                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-400/20 group-hover:border-cyan-400 transition-all duration-500">
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    </div>

                                                    {/* Name */}
                                                    <h4 className="text-2xl font-semibold mb-3">
                                                        {member.name}
                                                    </h4>

                                                    {/* Role */}
                                                    <p className="text-cyan-400 font-medium mb-4">
                                                        {member.role}
                                                    </p>

                                                    {/* Decorative Line */}
                                                    <div className="w-12 h-[2px] bg-cyan-400 mx-auto rounded-full"></div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </section>
    );
}

export default About;