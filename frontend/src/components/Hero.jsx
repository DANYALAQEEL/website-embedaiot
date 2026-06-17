import { motion } from "framer-motion";
import FloatingBackground from "./FloatingBackground";
import { useNavigate } from "react-router-dom";
function Hero() {
    const navigate = useNavigate();
    return (
        <section className="relative flex flex-col items-center justify-center text-center px-5 sm:px-6 min-h-[100vh]">
            {/* White Light Glow (Top Left) */}
            <div className="absolute top-0 left-[-200px] w-[700px] h-[700px] bg-cyan-400/20 blur-[180px] rounded-full"></div>
            {/* Gradient Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#031426] via-[#02111f] to-[#07384d]"></div>
            {/* Bottom Center Glow */}
            <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full"></div>

            {/* Subtle Arc Lines */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] border border-cyan-400/20 rounded-full"></div>
                <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] border border-cyan-400/10 rounded-full"></div>
            </div>
            {/* Animated Background Glow */}
            <div className="absolute bottom-6 flex flex-col items-center w-full">




            </div>
            <FloatingBackground />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                className="relative z-10 max-w-3xl px-2"
            >
                {/* Small Text */}
                <p className="text-amber-300 mb-3 sm:mb-4 tracking-wide text-base sm:text-lg md:text-xl">
                    Smart Tech Solutions
                </p>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 sm:mb-6">
                    Build <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text">
                        Powerful
                    </span> Digital Products
                </h1>

                {/* Sub Text */}
                <p className="text-gray-400 mb-7 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                    We provide innovative technology solutions including software,
                    electrical systems, and smart automation for your business growth.
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate("/our-story")}
                    className="
bg-gradient-to-r from-amber-400 to-yellow-500
px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold text-black

shadow-[0_0_20px_rgba(0,224,255,0.6)]
hover:shadow-[0_0_35px_rgba(0,224,255,0.9)]

hover:scale-105 transition duration-300
"
                >
                    Our Story
                </button>
            </motion.div>
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            >
                <source src="/video.mp4" type="video/mp4" />
            </video>
        </section >
    );
}

export default Hero;
