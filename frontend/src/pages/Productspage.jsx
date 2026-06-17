import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import staticProducts from "../data/products";

export default function ProductsPage() {
    const [productList, setProductList] = useState(staticProducts);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then(res => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const mapped = data.map(p => ({
                        id: p._id,
                        slug: p.slug,
                        name: p.title || p.name,
                        category: p.category,
                        image: p.image ? (p.image.startsWith("http") ? p.image : (p.image.startsWith("/") ? `http://localhost:5000${p.image}` : `http://localhost:5000/${p.image}`)) : "/placeholder.png",
                        description: p.description,
                        technologies: p.technologies || [],
                        features: p.features || []
                    }));
                    setProductList(mapped);
                }
            })
            .catch(err => console.log("Failed to fetch products from backend, using static:", err));
    }, []);
    return (
        <div className="bg-black text-white min-h-screen overflow-hidden">

            {/* BACKGROUND LAYER (ONLY COLOR FIXED) */}
            <div className="absolute inset-0">

                {/* Main AIOT Blue Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031426] via-[#02111f] to-[#07384d]"></div>

                {/* Soft Cyan Glow (LEFT) */}
                <div className="absolute top-0 left-[-200px] w-[700px] h-[700px] bg-cyan-400/20 blur-[180px] rounded-full"></div>

                {/* Soft Blue Glow (BOTTOM) */}
                <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full"></div>

                {/* Subtle Arc Lines */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] border border-cyan-400/20 rounded-full"></div>
                    <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] border border-cyan-400/10 rounded-full"></div>
                </div>

            </div>

            {/* HERO SECTION */}
            <section className="relative py-16 sm:py-32 px-4 sm:px-6 lg:px-20 border-b border-white/10">

                {/* FIXED: removed yellow radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_60%)]" />

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <p className="text-cyan-300 tracking-[6px] uppercase mb-6 text-sm">
                        Our Products
                    </p>

                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-tight mb-8">
                        Smart Products Powered By
                        <span className="block bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
                            AI, IoT & Automation
                        </span>
                    </h1>

                    <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        Explore our next-generation AIoT solutions designed for energy,
                        automation, smart infrastructure, EV ecosystems, healthcare,
                        agriculture, and industrial transformation.
                    </p>
                </div>
            </section>

            {/* PRODUCT GRID (UNCHANGED STRUCTURE) */}
            <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8">

                        {productList.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-3 flex flex-col"
                            >

                                {/* IMAGE */}
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-2 rounded-full bg-cyan-400/20 border border-cyan-300/30 text-cyan-200 text-xs tracking-wide uppercase">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-7 flex flex-col flex-1">
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                                        {product.name}
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {product.description}
                                    </p>

                                    {/* TECHNOLOGIES */}
                                    <div className="flex flex-wrap gap-3 mb-5">
                                        {product.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* BUTTON (kept same style, only color aligned) */}
                                    <Link className="mt-auto" to={`/products/${product.slug}`}>
                                        <button className="w-full py-3 px-1 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold hover:scale-[1.02] transition-all duration-300">
                                            View Details
                                        </button>
                                    </Link>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>



            {/* CTA (UNCHANGED STRUCTURE) */}
            <section className="py-14 sm:py-28 px-4 sm:px-6 lg:px-20 relative overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-500/10" />

                <div className="relative z-10 max-w-5xl mx-auto text-center bg-white/5 border border-white/10 rounded-[40px] p-12 md:p-20 backdrop-blur-xl">

                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-black leading-tight mb-8">
                        Ready To Build The
                        <span className="block bg-gradient-to-r from-cyan-300 bg-clip-text text-transparent">
                            Future With AIOT?
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                        Connect with our team to explore intelligent automation,
                        EV infrastructure, energy systems, and next-generation smart
                        technology solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <a
                            href="mailto:info@embedaiot.com?subject=Product Inquiry"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-105 transition-all duration-300"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="currentColor" />
                            </svg>
                            Email Us
                        </a>

                        <a
                            href="https://wa.me/923001234567?text=Hi%20Embed%20AIOT%2C%20I%27m%20interested%20in%20your%20products"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-green-500 text-white font-bold hover:scale-105 hover:bg-green-400 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                            </svg>
                            WhatsApp Us
                        </a>
                    </div>

                </div>
            </section>

        </div>
    );
}