import {
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa";

import { Mail, MapPin, ShieldCheck, RefreshCw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

const OTP_LIFETIME_SECONDS = 300; // 5 minutes — must match backend TTL

export default function Footer() {

    // ── Form state ──────────────────────────────────────────────────────────
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [emailError, setEmailError] = useState("");

    // ── OTP state ───────────────────────────────────────────────────────────
    const [otpStep, setOtpStep] = useState(false);       // true = OTP panel visible
    const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
    const [otpError, setOtpError] = useState("");
    const [otpSuccess, setOtpSuccess] = useState(false); // final success state
    const [secondsLeft, setSecondsLeft] = useState(OTP_LIFETIME_SECONDS);
    const [expired, setExpired] = useState(false);

    // ── Loading flags ────────────────────────────────────────────────────────
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [resending, setResending] = useState(false);

    const timerRef = useRef(null);
    const digitRefs = useRef([]);

    const socials = [
        { icon: FaLinkedinIn, link: "https://linkedin.com" },
        { icon: FaFacebookF, link: "https://facebook.com" },
        { icon: FaInstagram, link: "https://instagram.com" },
        { icon: FaYoutube, link: "https://youtube.com" },
    ];

    const whatsappNumber = "923335436531";

    // ── Helpers ──────────────────────────────────────────────────────────────
    const validateEmail = (value) => {
        if (!value) { setEmailError(""); return true; }
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
        setFormData({ ...formData, [name]: value });
        if (name === "email") validateEmail(value);
    };

    // ── Countdown timer ──────────────────────────────────────────────────────
    const startTimer = () => {
        clearInterval(timerRef.current);
        setSecondsLeft(OTP_LIFETIME_SECONDS);
        setExpired(false);
        timerRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setExpired(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => () => clearInterval(timerRef.current), []);

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, "0");
        const s = (secs % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // ── OTP digit input handlers ─────────────────────────────────────────────
    const handleDigitChange = (index, value) => {
        const cleaned = value.replace(/\D/g, "").slice(-1);
        const next = [...otpDigits];
        next[index] = cleaned;
        setOtpDigits(next);
        setOtpError("");
        if (cleaned && index < 5) digitRefs.current[index + 1]?.focus();
    };

    const handleDigitKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
            digitRefs.current[index - 1]?.focus();
        }
    };

    const handleDigitPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const next = ["", "", "", "", "", ""];
        for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
        setOtpDigits(next);
        const focusIndex = Math.min(pasted.length, 5);
        digitRefs.current[focusIndex]?.focus();
    };

    const otpCode = otpDigits.join("");

    // ── STEP 1: Request OTP ──────────────────────────────────────────────────
    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) return;
        setSendingOtp(true);
        try {
            const res = await fetch(`${API_URL}/api/contact/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setOtpStep(true);
                setOtpDigits(["", "", "", "", "", ""]);
                setOtpError("");
                startTimer();
                setTimeout(() => digitRefs.current[0]?.focus(), 100);
            } else {
                setEmailError(data.message || "Failed to send verification code.");
            }
        } catch {
            setEmailError("Could not reach the server. Please check your connection.");
        } finally {
            setSendingOtp(false);
        }
    };

    // ── Resend OTP ────────────────────────────────────────────────────────────
    const handleResend = async () => {
        setResending(true);
        setOtpDigits(["", "", "", "", "", ""]);
        setOtpError("");
        try {
            const res = await fetch(`${API_URL}/api/contact/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                startTimer();
                setTimeout(() => digitRefs.current[0]?.focus(), 100);
            } else {
                setOtpError(data.message || "Failed to resend code.");
            }
        } catch {
            setOtpError("Could not reach the server. Please try again.");
        } finally {
            setResending(false);
        }
    };

    // ── STEP 2: Verify OTP & submit ──────────────────────────────────────────
    const handleVerify = async (e) => {
        e.preventDefault();
        if (otpCode.length < 6) {
            setOtpError("Please enter all 6 digits.");
            return;
        }
        if (expired) {
            setOtpError("This code has expired. Please request a new one.");
            return;
        }
        setVerifying(true);
        try {
            const res = await fetch(`${API_URL}/api/contact/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, otp: otpCode }),
            });
            const data = await res.json();
            if (res.ok) {
                clearInterval(timerRef.current);
                setOtpSuccess(true);
                // Reset everything after 4 seconds
                setTimeout(() => {
                    setOtpStep(false);
                    setOtpSuccess(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                    setOtpDigits(["", "", "", "", "", ""]);
                    setOtpError("");
                    setEmailError("");
                }, 4000);
            } else {
                setOtpError(data.message || "Incorrect code. Please try again.");
            }
        } catch {
            setOtpError("Could not reach the server. Please try again.");
        } finally {
            setVerifying(false);
        }
    };

    // ── Cancel OTP and go back to form ───────────────────────────────────────
    const handleCancelOtp = () => {
        clearInterval(timerRef.current);
        setOtpStep(false);
        setOtpDigits(["", "", "", "", "", ""]);
        setOtpError("");
        setExpired(false);
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
                                <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
                            </li>

                            <li>
                                <Link to="/services" className="hover:text-yellow-400 transition">Services</Link>
                            </li>

                            <li>
                                <Link to="/about-us" className="hover:text-yellow-400 transition">About</Link>
                            </li>

                            <li>
                                <Link to="/Solutions" className="hover:text-yellow-400 transition">Solutions</Link>
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

                    {/* RIGHT - FORM PANEL */}
                    <div className="sm:col-span-2 md:col-span-1">

                        {/* ── SUCCESS STATE ── */}
                        {otpSuccess ? (
                            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center animate-fade-in">
                                <div className="h-16 w-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                                    <ShieldCheck size={32} className="text-green-400" />
                                </div>
                                <h3 className="text-white font-semibold text-lg">Message Sent!</h3>
                                <p className="text-gray-400 text-sm">
                                    Your email was verified and your message has been delivered.<br />
                                    We'll get back to you soon.
                                </p>
                            </div>

                        ) : otpStep ? (
                            /* ── OTP PANEL ── */
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Verify Your Email</h3>
                                    <p className="text-gray-400 text-xs leading-relaxed">
                                        A 6-digit code was sent to <span className="text-yellow-400 font-medium">{formData.email}</span>.
                                        Enter it below to confirm and send your message.
                                    </p>
                                </div>

                                {/* Countdown badge */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                                    expired
                                        ? "bg-red-500/10 border-red-500/30 text-red-400"
                                        : secondsLeft < 60
                                            ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                            : "bg-amber-400/10 border-amber-400/30 text-amber-400"
                                }`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${expired ? "bg-red-400" : "bg-amber-400 animate-pulse"}`} />
                                    {expired ? "Code expired" : `Expires in ${formatTime(secondsLeft)}`}
                                </div>

                                {/* 6 digit boxes */}
                                <form onSubmit={handleVerify} className="space-y-4">
                                    <div className="flex gap-2 justify-start">
                                        {otpDigits.map((digit, i) => (
                                            <input
                                                key={i}
                                                ref={(el) => (digitRefs.current[i] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleDigitChange(i, e.target.value)}
                                                onKeyDown={(e) => handleDigitKeyDown(i, e)}
                                                onPaste={i === 0 ? handleDigitPaste : undefined}
                                                className={`w-10 h-12 text-center text-lg font-bold rounded-lg border bg-white/5 text-white focus:outline-none transition ${
                                                    otpError
                                                        ? "border-red-500/60 focus:border-red-500"
                                                        : digit
                                                            ? "border-amber-400/60 focus:border-amber-400"
                                                            : "border-white/15 focus:border-amber-400/60"
                                                }`}
                                                disabled={expired || verifying}
                                            />
                                        ))}
                                    </div>

                                    {/* Error */}
                                    {otpError && (
                                        <p className="text-red-400 text-xs font-medium pl-1">{otpError}</p>
                                    )}

                                    {/* Verify button */}
                                    <button
                                        type="submit"
                                        disabled={verifying || expired || otpCode.length < 6}
                                        className={`w-full py-3 font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
                                            verifying || expired || otpCode.length < 6
                                                ? "bg-yellow-500/40 text-black/50 cursor-not-allowed"
                                                : "bg-yellow-400 hover:bg-yellow-300 text-black"
                                        }`}
                                    >
                                        {verifying ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Verifying...
                                            </>
                                        ) : (
                                            <><ShieldCheck size={16} /> Verify & Send Message</>
                                        )}
                                    </button>

                                    {/* Resend + Cancel row */}
                                    <div className="flex items-center justify-between pt-1">
                                        <button
                                            type="button"
                                            onClick={handleResend}
                                            disabled={resending || (!expired && secondsLeft > 240)}
                                            className={`flex items-center gap-1.5 text-xs transition ${
                                                resending || (!expired && secondsLeft > 240)
                                                    ? "text-gray-600 cursor-not-allowed"
                                                    : "text-amber-400 hover:text-amber-300"
                                            }`}
                                        >
                                            <RefreshCw size={12} className={resending ? "animate-spin" : ""} />
                                            {resending ? "Sending..." : "Resend code"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancelOtp}
                                            className="text-xs text-gray-500 hover:text-gray-300 transition"
                                        >
                                            ← Back to form
                                        </button>
                                    </div>
                                </form>
                            </div>

                        ) : (
                            /* ── MAIN CONTACT FORM ── */
                            <>
                                <h3 className="text-white font-semibold mb-4">Send Message</h3>

                                <form onSubmit={handleSendOtp} className="space-y-3">

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
                                        disabled={sendingOtp}
                                        className={`w-full py-3 text-black font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
                                            sendingOtp
                                                ? "bg-yellow-500/50 cursor-not-allowed opacity-70"
                                                : "bg-yellow-400 hover:bg-yellow-300"
                                        }`}
                                    >
                                        {sendingOtp ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Sending Code...
                                            </>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </button>

                                </form>
                            </>
                        )}
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
