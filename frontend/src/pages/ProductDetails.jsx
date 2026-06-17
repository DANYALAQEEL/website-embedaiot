import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import staticProducts from "../data/products";

export default function ProductDetails() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const staticProduct = staticProducts.find((p) => p.slug === slug);
        
        fetch(`http://localhost:5000/api/products/slug/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then(data => {
                if (data) {
                    const mapped = {
                        id: data._id,
                        slug: data.slug,
                        name: data.title || data.name,
                        category: data.category,
                        image: data.image ? (data.image.startsWith("http") ? data.image : (data.image.startsWith("/") ? `http://localhost:5000${data.image}` : `http://localhost:5000/${data.image}`)) : "/placeholder.png",
                        description: data.description,
                        technologies: data.technologies || [],
                        features: data.features || []
                    };
                    setProduct(mapped);
                } else if (staticProduct) {
                    setProduct(staticProduct);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log("Could not find product on backend, using static:", err);
                if (staticProduct) {
                    setProduct(staticProduct);
                }
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-2xl">Loading...</h1>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-4xl font-bold">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen">
            {/* HERO SECTION */}
            <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <p className="text-amber-500 uppercase tracking-[4px] mb-5 text-sm">
                            {product.category}
                        </p>

                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed mb-10">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            {product.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>


                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 blur-3xl" />

                        <img
                            src={product.image}
                            alt={product.name}
                            className="relative z-10 rounded-[30px] border border-white/10 w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">

                    <div className="mb-16">
                        <p className="text-amber-500 uppercase tracking-[4px] mb-4 text-sm">
                            Product Features
                        </p>

                        <h2 className="text-4xl font-black">
                            Smart Features & Capabilities
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                        {product.features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all duration-300"
                            >
                                <div className="text-amber-500 text-3xl sm:text-5xl font-black mb-6">
                                    0{index + 1}
                                </div>

                                <h3 className="text-xl font-semibold leading-relaxed">
                                    {feature}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>


    );
}