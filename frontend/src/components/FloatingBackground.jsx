import { motion } from "framer-motion";

function FloatingBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

            {/* 🌌 SOFT GLOBAL GLOW (depth base) */}
            <motion.div
                className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[180px]"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* 🟦 LEFT (slow orbital drift - NOT linear) */}




            {/* ✨ MICRO FLOAT PARTICLE (adds life, prevents flatness) */}
            <motion.div
                className="absolute top-1/3 left-1/2 w-2 h-2 rounded-full bg-cyan-300 blur-sm"
                animate={{
                    y: [0, -90, 0],
                    x: [0, 40, 0],
                    opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

        </div>
    );
}

export default FloatingBackground;