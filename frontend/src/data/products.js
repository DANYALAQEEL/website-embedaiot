const products = [
    {
        id: 1,
        slug: "air-purifiers",
        name: "Air Purifier",
        category: "Air Quality",
        image: "/products/air purifier.png",
        description:
            "Air purifiers help improve indoor air quality. Equipped with a True HEPA filter, they effectively trap up to 99.97% of airborne irritants like dust, pollen, pet dander, and smoke.",
        technologies: ["True HEPA Filter", "Activated Carbon", "UV-C Pathogen Light", "Smart Air Sensors"],
        features: [
            "Allergy Relief: Lowers allergen load in the room to reduce sneezing, congestion, and allergy flare-ups.",
            "Asthma Management: Clears out smoke, dust, and fine particulate matter to reduce asthma triggers.",
            "Smoke & Odors: Highly effective at neutralizing cooking smells, VOCs, and smoke odors.",
            "Viruses & Pathogens: High-efficiency filters trap microscopic particles containing airborne viruses.",
        ],
    },

    {
        id: 2,
        slug: "soil-moisture-meter",
        name: "Soil Moisture Meter",
        category: "Smart Agriculture",
        image: "/products/soil moisture meter.png",
        description:
            "A soil moisture meter measures water levels in soil with a metal probe, taking the guesswork out of watering to protect plants from overwatering or underwatering.",
        technologies: ["Galvanic Sensors", "Analog/Digital Display", "Electrical Resistance"],
        features: [
            "Root Rot Prevention: Gives accurate readings to help you avoid overwatering or underwatering.",
            "Galvanic Probe Action: Dissimilar metals create a tiny electrical current to scale water content.",
            "Soil Type Adaptation: Works reliably in sandy, clay, and loamy soils at varying root depths.",
            "Smart Drip Automation: Can integrate with smart drip systems to automate watering cycles.",
        ],
    },

    {
        id: 3,
        slug: "bess-system",
        name: "Soil NPK Meter",
        category: "Energy Storage",
        image: "/products/soil npk meter.png",
        description:
            "A smart soil analysis device that measures NPK (nitrogen, phosphorus, potassium) levels to help farmers improve soil fertility, optimize fertilizer use, and increase crop productivity.",


        technologies: ["Embedded Systems", "IoT Sensors", "Wireless Communication", "Data Acquisition & Processing", "Basic Analytics Software"],



        features: [
            "Real-time NPK level measurement",
            "Soil fertility analysis",
            "Fertilizer optimization guidance",
            "Wireless data transmission",
        ],
    },

    {
        id: 4,
        slug: "IoT Devices",
        name: "Sense Ball",
        category: "Automation",
        image: "/products/sense ball 1.png",
        description:
            "Sense Ball is an IoT-based smart device that is capable of measuring environmental parameters levels especially for storages. It will transmit data periodically through any kind of IoT network including Wi-Fi, GSM/GPRS/LoRA/Mesh technologies. Data will be sent to a web/mobile application for storage, alerts, and analytics.",

        technologies: ["IoT", "Automation", "Voice Control"],
        features: [
            "GPS Tracking",
            "Humidity, Temperature, Gas Measurement",
            "Light Intensity Measurement",
            "Acoustic Signatures Detection",
        ],
    },

    {
        id: 5,
        slug: "industrial-iot-monitoring",
        name: "Industrial IoT Monitoring",
        category: "Industrial",
        image: "/products/industrial-iot.jpg",
        description:
            "Industrial monitoring solution with predictive maintenance and real-time analytics.",
        technologies: ["IIoT", "AI", "Machine Learning", "Cloud Systems"],
        features: [
            "Predictive maintenance",
            "Machine monitoring",
            "Cloud analytics",
            "Industrial automation",
        ],
    },

    {
        id: 6,
        slug: "smart-security-system",
        name: "Smart Security System",
        category: "Security",
        image: "/products/security.jpg",
        description:
            "AI-powered surveillance and security monitoring system for homes and businesses.",
        technologies: ["AI Vision", "IoT Cameras", "Cloud Security"],
        features: [
            "Motion detection",
            "Remote surveillance",
            "AI facial recognition",
            "Real-time alerts",
        ],
    },
];

export default products;
