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
import { API_URL } from "../config";

export default function Footer() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [emailError, setEmailError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const socials = [
        { icon: FaLinkedinIn, link: "https://linkedin.com" },
        { icon: FaFacebookF, link: "https://facebook.com" },
        { icon: FaInstagram, link: "https://instagram.com" },
        { icon: FaYoutube, link: "https://youtube.com" },
    ];

    const whatsappNumber = "923335436531"; // change this

    const validateEmail = (value) => {
        if (!value) {
            setEmailError("");
            return true;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            setEmailError("Please enter a valid email address (e.g., name@example.com)");
            return false;
        }
        setEmailError("");
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === "email") {
            validateEmail(value);
        }
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        if (submitting) return;

        // Perform final email validation check
        if (!validateEmail(formData.email)) {
            alert("The email address you entered is not valid. Please correct it before sending.");
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Message sent successfully!");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setEmailError("");
            } else {
                // Parse the actual error message from the backend (e.g. invalid email, mailbox not found)
                let errorMessage = "Failed to send message. Please try again.";
                try {
                    const errorData = await res.json();
                    if (errorData && errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch (_) { /* ignore parse errors */ }
                setEmailError(errorMessage);
                alert(errorMessage);
            }
        } catch (error) {
            const msg = "Could not reach the server. Please check your connection and try again.";
            setEmailError(msg);
            alert(msg);
        } finally {
            setSubmitting(false);
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
                                required
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg placeholder:text-gray-500 focus:outline-none focus:border-amber-400/50 transition"
                            />

                            <div className="space-y-1">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={(e) => validateEmail(e.target.value)}
                                    className={`w-full px-3 py-2.5 bg-white/5 border ${
                                        emailError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-amber-400/50"
                                    } text-white text-sm rounded-lg placeholder:text-gray-500 focus:outline-none transition`}
                                />
                                {emailError && (
                                    <p className="text-red-400 text-xs pl-1 font-medium">{emailError}</p>
                                )}
                            </div>

                            <input
                                type="text"
                                name="subject"
                                required
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg placeholder:text-gray-500 focus:outline-none focus:border-amber-400/50 transition"
                            />

                            <textarea
                                name="message"
                                required
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white text-sm rounded-lg placeholder:text-gray-500 focus:outline-none focus:border-amber-400/50 transition"
                            />

                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-3 text-black font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
                                    submitting 
                                        ? "bg-yellow-500/50 cursor-not-allowed opacity-70" 
                                        : "bg-yellow-400 hover:bg-yellow-300"
                                }`}
                            >
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
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

        </footer>
    );
}
