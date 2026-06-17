import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [drawerOpen]);

    const closeDrawer = () => setDrawerOpen(false);

    const navLinks = [
        { to: "/", label: "Home", icon: "ti-home" },
        { to: "/services", label: "Services", icon: "ti-tool" },
        { to: "/products", label: "Products", icon: "ti-box" },
        { to: "/about-us", label: "About Us", icon: "ti-users" },
        { to: "/solutions", label: "Solutions", icon: "ti-bulb" },
    ];

    return (
        <>
            {/* ── NAVBAR ── */}
            <nav className={`
                fixed top-0 left-0 w-full z-50
                px-4 sm:px-8 py-3 sm:py-4
                flex justify-between items-center
                text-[#E6F1FF] border-b border-white/10
                backdrop-blur-md transition-all duration-300
                ${scrolled ? "bg-black/80 shadow-lg" : "bg-transparent"}
            `}>
                <div className="flex items-center h-12 sm:h-16">
                    <img
                        src="/new logo.png"
                        alt="logo"
                        className="h-[64px] sm:h-[88px] w-auto object-contain -ml-1 sm:-ml-2 brightness-110 contrast-110 drop-shadow-[0_0_8px_rgba(255,215,0,0.15)] hover:scale-105 transition duration-300"
                    />
                </div>

                <ul className="hidden md:flex gap-6 text-lg items-center">
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    isActive ? "text-amber-400 font-semibold" : "hover:text-amber-500 transition"
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <NavLink
                    to="/portfolio"
                    className={({ isActive }) =>
                        `hidden md:block bg-gradient-to-r from-amber-400 to-yellow-500
                        px-8 py-3 rounded-full text-base font-semibold text-black
                        shadow-[0_0_20px_rgba(255,200,0,0.4)]
                        hover:shadow-[0_0_35px_rgba(255,200,0,0.7)]
                        hover:scale-105 transition duration-300
                        ${isActive ? "ring-2 ring-yellow-300" : ""}`
                    }
                >
                    Portfolio
                </NavLink>

                {/* Hamburger */}
                <button
                    className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-lg bg-white/5 border border-white/10"
                    onClick={() => setDrawerOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${drawerOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                    <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${drawerOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${drawerOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                </button>
            </nav>

            {/* ── BACKDROP — fixed, covers whole viewport ── */}
            {drawerOpen && (
                <div
                    onClick={closeDrawer}
                    style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: "rgba(0,0,0,0.65)",
                        zIndex: 998,
                    }}
                />
            )}

            {/* ── SIDE DRAWER — fixed, slides in from left ── */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "75vw",
                    maxWidth: "280px",
                    background: "#080f1a",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                    zIndex: 999,
                    transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
                    transition: "transform 0.3s ease-in-out",
                    display: "flex",
                    flexDirection: "column",
                }}
                className="md:hidden"
            >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <img src="/new logo.png" alt="logo" style={{ height: 48, objectFit: "contain" }} />
                    <button
                        onClick={closeDrawer}
                        style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 14 }}
                    >
                        ✕
                    </button>
                </div>

                {/* Links */}
                <div style={{ padding: "8px 0" }}>
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={closeDrawer}
                            style={({ isActive }) => ({
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                padding: "14px 20px",
                                borderLeft: isActive ? "3px solid #f5c842" : "3px solid transparent",
                                background: isActive ? "rgba(245,200,66,0.08)" : "transparent",
                                color: isActive ? "#f5c842" : "rgba(255,255,255,0.65)",
                                textDecoration: "none",
                                fontSize: 15,
                                fontWeight: 500,
                                transition: "all 0.2s",
                            })}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* Portfolio CTA */}
                <div style={{ padding: "12px 16px" }}>
                    <NavLink
                        to="/portfolio"
                        onClick={closeDrawer}
                        style={{
                            display: "block",
                            textAlign: "center",
                            background: "linear-gradient(to right, #f5c842, #eab308)",
                            padding: "13px 0",
                            borderRadius: 12,
                            color: "#000",
                            fontWeight: 600,
                            fontSize: 15,
                            textDecoration: "none",
                        }}
                    >
                        Portfolio
                    </NavLink>
                </div>

                {/* Glow */}
                <div style={{ position: "absolute", bottom: 120, left: -20, width: 180, height: 180, background: "rgba(245,200,66,0.07)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
            </div>
        </>
    );
}

export default Navbar;