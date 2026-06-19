import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { API_URL } from "../config";

// ------------------------------
// 1. SAMPLE DATA (You can later move this to API or JSON file)
// ------------------------------
const storiesData = [
    {
        id: 1,
        category: "Internship",
        title: "Summer Internship Batch 2025",
        date: "June 2025",
        description:
            "We welcomed our first batch of interns who worked on real-world projects and learned modern tech stacks.",
        images: [
            "/lab.png"
        ]
    },
    {
        id: 2,
        category: "Event",
        title: "Tech Seminar at University",
        date: "August 2025",
        description:
            "Our team presented innovative solutions in EV charging and AI systems at a university seminar.",
        images: [
            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
        ]
    },
    {
        id: 3,
        category: "Team",
        title: "Late Night Build Sessions",
        date: "Ongoing",
        description:
            "Behind every product is a team working late nights, solving bugs and building systems.",
        images: [
            "/team.png"
        ]
    },
    {
        id: 4,
        category: "Socials",
        title: "Our Social Media ",
        date: "Ongoing",
        description:
            "stay connected with us on social media!",
        images: [
            "https://unsplash.com/photos/a-phone-displays-a-social-media-profile-9VPIy0a-OxE"
        ]
    },
    {
        id: 5,
        category: "Participation",
        title: "Participation in events",
        date: "Ongoing",
        description:
            "participated in various events and seminars",
        images: [
            "https://unsplash.com/photos/people-sitting-on-chairs-rE9vgD_TXgM"
        ]
    }
];

// ------------------------------
// 2. STORY CARD COMPONENT
// ------------------------------
function StoryCard({ story }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 hover:border-amber-400/40 transition-all"
        >
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg md:text-xl font-semibold text-amber-300 leading-snug">
                    {story.title}
                </h2>
                <span className="text-xs text-gray-400">{story.date}</span>
            </div>

            <p className="text-sm text-gray-300 mb-4">
                {story.description}
            </p>

            <div className="grid grid-cols-2 gap-2">
                {story.images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt="story"
                        className="h-28 md:h-32 lg:h-40 w-full object-cover rounded-lg"
                    />
                ))}
            </div>

            <span className="inline-block mt-3 text-xs px-2 py-1 bg-amber-400/10 text-amber-300 rounded-full">
                {story.category}
            </span>
        </motion.div>
    );
}

// ------------------------------
// 3. MAIN PAGE
// ------------------------------
export default function OurStory() {
    const [filter, setFilter] = useState("All");
    const [stories, setStories] = useState(storiesData);

    useEffect(() => {
        fetch(`${API_URL}/api/stories`)
            .then(res => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const mapped = data.map(s => ({
                        id: s._id,
                        category: s.category || "General",
                        title: s.title,
                        date: s.date || new Date(s.createdAt).toLocaleDateString(),
                        description: s.description,
                        images: s.images ? s.images.map(img => img.startsWith("http") ? img : (img.startsWith("/") ? `${API_URL}${img}` : `${API_URL}/${img}`)) : []
                    }));
                    
                    // Keep hardcoded stories and append backend stories without duplicating titles
                    const combined = [...storiesData];
                    mapped.forEach(s => {
                        if (!combined.some(cs => cs.title === s.title)) {
                            combined.push(s);
                        }
                    });
                    setStories(combined);
                }
            })
            .catch(err => console.log("Failed to fetch stories from backend:", err));
    }, []);

    const filteredStories =
        filter === "All"
            ? stories
            : stories.filter((s) => s.category === filter);

    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-4 sm:px-6 lg:px-10 pt-28 py-16">
            {/* HERO */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    Our <span className="text-amber-400">Story</span>
                </h1>
                <p className="text-sm md:text-base text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed px-2">
                    Every company has products. Few have a journey worth remembering.
                    This is ours — built through interns, events, late nights, and real moments.
                </p>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
                {["All", "Internship", "Event", "Team", "Socials", "Participation"].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full border transition-all text-sm
              ${filter === cat
                                ? "bg-amber-400 text-black"
                                : "border-white/20 text-white hover:border-amber-400/40"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* STORIES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {filteredStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>

    );

}
