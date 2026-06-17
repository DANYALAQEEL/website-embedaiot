import { motion } from "framer-motion";

function PortfolioCard({ project }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl h-[320px] sm:h-[400px] border border-white/10 hover:border-amber-400/60 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(251,191,36,0.2)] cursor-pointer"
        >
            {/* Image */}
            <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Always-on dark gradient — strong at bottom so title is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Hover overlay — darkens whole card */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />

            {/* Amber top line on hover */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* DEFAULT state — only category + title, pinned to bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 group-hover:opacity-0 transition-opacity duration-300">
                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-400 text-[10px] uppercase tracking-widest mb-2">
                    {project.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {project.title}
                </h3>
            </div>

            {/* HOVER state — centered content with description + tags */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-5 sm:p-7
                opacity-0 group-hover:opacity-100
                translate-y-4 group-hover:translate-y-0
                transition-all duration-500">

                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-400 text-[10px] uppercase tracking-widest mb-3 w-fit">
                    {project.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                    {project.title}
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] sm:text-xs text-gray-300 border border-white/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

        </motion.div>
    );
}

export default PortfolioCard;