
function PartnersInvestors() {
    const partners = [
        "/src/assets/partners/partner-logo-2.png",
        "/src/assets/partners/partner-logo-3.png",
        "/src/assets/partners/partner-logo-4.png",
        "/src/assets/partners/partner-logo-5.png",
        "/src/assets/partners/Microsoft-logo.png",
    ];

    const investors = [
        "/src/assets/investors/Asset1.jpg",
        "/src/assets/investors/Asset-2.jpg",
        "/src/assets/investors/Asset-3.jpg",
        "/src/assets/investors/Asset-4.jpg",
        "/src/assets/investors/Asset-5.jpg",

    ];

    const LogoRow = ({ title, logos }) => (
        <div className="mb-12 sm:mb-16">

            {/* Sub Heading */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-6 sm:mb-8 text-gray-700">
                {title}
            </h3>

            {/* Logo Grid — 3 cols on mobile, 5 on md+ */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6">

                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className="
                            bg-white/70 backdrop-blur-md
                            rounded-xl sm:rounded-2xl
                            p-3 sm:p-6
                            border border-gray-200
                            shadow-md
                            flex items-center justify-center
                            h-20 sm:h-32
                            transition-all duration-300
                            hover:-translate-y-2
                            hover:shadow-2xl
                            hover:border-blue-400
                        "
                    >
                        <img
                            src={logo}
                            alt="partner logo"
                            className="
                                max-h-8 sm:max-h-14
                                max-w-full
                                object-contain
                                grayscale
                                opacity-70
                                transition duration-300
                                hover:grayscale-0
                                hover:opacity-100
                                hover:scale-110
                            "
                        />
                    </div>
                ))}

            </div>
        </div>
    );

    return (
        <section className="relative py-16 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-white to-[#f8fafc] text-black overflow-hidden">

            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 blur-[140px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-300/20 blur-[140px] rounded-full"></div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12 sm:mb-20">

                    {/* Badge */}
                    <div className="inline-block px-4 py-2 bg-amber-100 text-amber-600 text-sm font-semibold rounded-full mb-5 sm:mb-6">
                        ✨ Trusted Worldwide
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                        Our{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Partners
                        </span>{" "}
                        &{" "}
                        <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                            Investors
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                        Collaborating with industry leaders and visionary investors
                        to build innovative and impactful technology solutions.
                    </p>

                </div>

                {/* Sections */}
                <LogoRow title="Our Partners" logos={partners} />
                <LogoRow title="Our Investors" logos={investors} />

            </div>

        </section>

    );
}

export default PartnersInvestors;
