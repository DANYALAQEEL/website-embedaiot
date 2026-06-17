import { portfolioProjects } from "../../data/portfolioData";
import PortfolioCard from "./PortfolioCard";
import { useState, useEffect } from "react";

function Portfolio() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [projects, setProjects] = useState(portfolioProjects);

    useEffect(() => {
        fetch("http://localhost:5000/api/portfolio")
            .then(res => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const mapped = data.map(p => ({
                        id: p._id,
                        title: p.title,
                        category: p.category,
                        image: p.image ? (p.image.startsWith("http") ? p.image : (p.image.startsWith("/") ? `http://localhost:5000${p.image}` : `http://localhost:5000/${p.image}`)) : "/placeholder.png",
                        description: p.description,
                        technologies: p.technologies || []
                    }));
                    
                    // Keep hardcoded projects and append backend projects without duplicating titles
                    const combined = [...portfolioProjects];
                    mapped.forEach(p => {
                        if (!combined.some(cp => cp.title === p.title)) {
                            combined.push(p);
                        }
                    });
                    setProjects(combined);
                }
            })
            .catch(err => console.log("Failed to fetch portfolio from backend, using static:", err));
    }, []);

    // Dynamically compile category filters from the loaded projects
    const filters = ["All", ...new Set(projects.map(p => p.category))];

    const filtered = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

    return (
        <section
            id="portfolio"
            className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#031426] via-[#02111f] to-[#07384d]"></div>
            <div className="absolute top-0 left-[-200px] w-[700px] h-[700px] bg-cyan-400/20 blur-[180px] rounded-full"></div>
            <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full"></div>
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] border border-cyan-400/20 rounded-full"></div>
                <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] border border-cyan-400/10 rounded-full"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">

                {/* ── HEADER ── */}
                <div className="mb-8 sm:mb-12">
                    <p className="text-amber-400 tracking-[4px] uppercase text-sm mb-3 sm:mb-4">
                        Our Work
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
                            Our{" "}
                            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-transparent bg-clip-text">
                                Portfolio
                            </span>
                        </h1>
                        <p className="text-gray-400 max-w-xs sm:max-w-sm text-sm sm:text-base leading-relaxed sm:text-right">
                            Innovative AI, IoT, and automation projects
                            transforming businesses with modern technology.
                        </p>
                    </div>
                </div>

                {/* ── FILTERS ── */}
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 mb-8 sm:mb-12 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`
                                flex-shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium
                                border transition-all duration-300 whitespace-nowrap
                                ${activeFilter === filter
                                    ? "bg-amber-400 text-black border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                                    : "bg-white/5 text-gray-300 border-white/10 hover:border-amber-400/40 hover:text-white"
                                }
                            `}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* ── GRID ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filtered.length > 0 ? filtered.map((project) => (
                        <PortfolioCard
                            key={project.id}
                            project={project}
                        />
                    )) : (
                        <div className="col-span-3 text-center py-20 text-gray-500">
                            No projects in this category yet.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}

export default Portfolio;