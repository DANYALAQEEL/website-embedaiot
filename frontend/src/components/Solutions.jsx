function Solutions() {

    const services = [
        {
            title: "Embedded Technology",
            desc: "Smart embedded systems combining hardware and software for IoT solutions."
        },
        {
            title: "Artificial Intelligence",
            desc: "AI-powered solutions including computer vision and automation."
        },
        {
            title: "IoT Development",
            desc: "Smart connected devices and automation systems."
        },
        {
            title: "Industrial IoT",
            desc: "Real-time monitoring and smart automation for industries."
        },
        {
            title: "Consumer Electronics",
            desc: "Smart device design and hardware solutions."
        },
        {
            title: "Software Solutions",
            desc: "Web and application development for businesses."
        },

        {
            title: "3D Printing Services",
            desc: "Rapidly fabricating physical parts and functional prototypes directly from digital models."
        },
        {
            title: "Mechanical Design",
            desc: "Transforming ideas into precise, production-ready 3D engineering blueprints."
        },
        {
            title: "Software Solutions",
            desc: "Web and application development for businesses."
        },
        {
            title: "Software Solutions",
            desc: "Web and application development for businesses."
        },
        {
            title: "Software Solutions",
            desc: "Web and application development for businesses."
        },
        {
            title: "Software Solutions",
            desc: "Web and application development for businesses."
        }


    ];

    return (

        <section className="relative pt-16 sm:pt-24 pb-14 sm:pb-20 px-4 sm:px-6 bg-[#e2e4e7] text-black overflow-hidden">

            <div className="relative z-10 max-w-7xl mx-auto">

                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 sm:mb-12">
                    What We Do
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">


                    {services.map((item, index) => (
                        <div
                            key={index}
                            className="
        bg-white hover:bg-[#494e54]
        rounded-xl sm:rounded-2xl
        p-4 sm:p-6
        shadow-md
        border border-black/5
        transition duration-300
        hover:-translate-y-2
        hover:shadow-xl
        "
                        >

                            <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 text-black">
                                {item.title}
                            </h3>

                            <p className="text-black-1000 group-hover:text-white text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 transition">
                                {item.desc}
                            </p>



                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}

export default Solutions;
