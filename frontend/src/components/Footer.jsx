import {
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa";

import { Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Footer() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const socials = [
        { icon: FaLinkedinIn, link: "https://linkedin.com" },
        { icon: FaFacebookF, link: "https://facebook.com" },
        { icon: FaInstagram, link: "https://instagram.com" },
        { icon: FaYoutube, link: "https://youtube.com" },
    ];

    const whatsappNumber = "923335436531"; // change this

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Message sent successfully!");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                alert("Failed to send message.");
            }
        } catch (error) {
            alert("Server error");
        }
    };

    return (
        <footer id="contact" className="relative border-t border-white/10 bg-black">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-24 md:py-28">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 md:gap-16">

                    {/* LEFT */}
                    <div>
                        <h2 className="text-3xl font-black text-white">EMBED</h2>
                        <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text">
                            AIOT
                        </h2>

                        <p className="text-gray-400 mt-4 text-sm">
                            Smart AI, IoT and Automation solutions.
                        </p>

                        {/* SOCIALS + WHATSAPP */}
                        <div className="flex gap-3 mt-6">

                            {socials.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={i}
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-yellow-400 hover:text-black transition"
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}

                            {/* WHATSAPP ICON */}
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Hello%20Embed%20AIOT%2C%20I%20want%20to%20know%20more`}
                                target="_blank"
                                rel="noreferrer"
                                className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white transition"
                            >
                                <FaWhatsapp size={16} />
                            </a>

                        </div>
                    </div>

                    {/* MIDDLE */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>

                        <ul className="space-y-3 text-gray-400 text-sm">

                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-yellow-400 transition"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/services"
                                    className="hover:text-yellow-400 transition"
                                >
                                    Services
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about-us"
                                    className="hover:text-yellow-400 transition"
                                >
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/Solutions"
                                    className="hover:text-yellow-400 transition"
                                >
                                    Solutions
                                </Link>
                            </li>

                        </ul>

                        <div className="mt-8 text-gray-400 text-sm space-y-2">
                            <div className="flex items-center gap-2">
                                <Mail size={14} /> embedaiot@gmail.com
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={14} /> Pakistan
                            </div>
                        </div>
                    </div>

                    {/* RIGHT - FORM — spans full width on sm when it's the 3rd col */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <h3 className="text-white font-semibold mb-4">
                            Send Message
                        </h3>

                        <form onSubmit={sendEmail} className="space-y-3">

                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg placeholder:text-gray-500 focus:outline-none focus:border-amber-400/50 transition"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg placeholder:text-gray-500 focus:outline-none focus:border-amber-400/50 transition"
                            />

                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg placeholder:text-gray-500 focus:outline-none focus:border-amber-400/50 transition"
                            />

                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg placeholder:text-gray-500 focus:outline-none focus:border-amber-400/50 transition"
                            />

                            <button
                                type="submit"
                                className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
                            >
                                Send Message
                            </button>

                        </form>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="border-t border-white/10 mt-10 sm:mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 text-center sm:text-left">

                    <p>© {new Date().getFullYear()} Embed AIOT. All rights reserved.</p>
                    <p>AI • IoT • Embedded Systems • Automation</p>

                </div>

            </div>

            {/* 🔥 FLOATING WHATSAPP BUTTON */}
            <a
                href={`https://wa.me/${whatsappNumber}?text=Hello%20Embed%20AIOT`}
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:scale-110 transition z-40"
            >
                <FaWhatsapp size={24} />
            </a>

        </footer>
    );
}
