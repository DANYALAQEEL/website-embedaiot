import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminPortal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [activeTab, setActiveTab] = useState("products"); // 'products' or 'contacts'
    const [authMode, setAuthMode] = useState("login"); // 'login' or 'register'

    // Auth Form State
    const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState("");

    // Products Data & Form State
    const [products, setProducts] = useState([]);
    const [productForm, setProductForm] = useState({
        title: "",
        category: "",
        description: "",
        technologies: "",
        features: "",
        featured: false,
    });
    const [productMsg, setProductMsg] = useState("");

    // Contacts Data State
    const [contacts, setContacts] = useState([]);
    const [contactMsg, setContactMsg] = useState("");

    // Check localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            fetchDashboardData(storedToken);
        }
    }, [activeTab]);

    const fetchDashboardData = (authToken) => {
        const headers = {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
        };

        if (activeTab === "products") {
            fetch("http://localhost:5000/api/products")
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setProducts(data);
                })
                .catch(err => console.error("Error fetching products:", err));
        } else if (activeTab === "contacts") {
            fetch("http://localhost:5000/api/contact", { headers })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch contacts");
                    return res.json();
                })
                .then(data => {
                    if (Array.isArray(data)) setContacts(data);
                })
                .catch(err => console.error("Error fetching contacts:", err));
        }
    };

    // Auth Actions
    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError("");
        setAuthSuccess("");

        const endpoint = authMode === "login" ? "login" : "register";
        const body = authMode === "login" 
            ? { email: authForm.email, password: authForm.password }
            : authForm;

        try {
            const res = await fetch(`http://localhost:5000/api/admin/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Authentication failed");
            }

            if (authMode === "login") {
                localStorage.setItem("adminToken", data.token);
                setToken(data.token);
                setIsLoggedIn(true);
                setAuthSuccess("Login successful!");
                fetchDashboardData(data.token);
            } else {
                setAuthSuccess("Registration successful! You can now log in.");
                setAuthMode("login");
                setAuthForm({ name: "", email: "", password: "" });
            }
        } catch (err) {
            setAuthError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setToken("");
        setIsLoggedIn(false);
    };

    // Product Actions
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setProductMsg("");

        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productForm),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to create product");

            setProductMsg("Product created successfully!");
            setProductForm({
                title: "",
                category: "",
                description: "",
                technologies: "",
                features: "",
                featured: false,
            });
            fetchDashboardData(token);
        } catch (err) {
            setProductMsg(`Error: ${err.message}`);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        setProductMsg("");

        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to delete product");

            setProductMsg("Product deleted successfully!");
            fetchDashboardData(token);
        } catch (err) {
            setProductMsg(`Error: ${err.message}`);
        }
    };

    // Contact Actions
    const handleDeleteContact = async (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        setContactMsg("");

        try {
            const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to delete contact message");

            setContactMsg("Message deleted successfully!");
            fetchDashboardData(token);
        } catch (err) {
            setContactMsg(`Error: ${err.message}`);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-28 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-cyan-400/20 blur-[180px] rounded-full"></div>
                <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-amber-500/10 blur-[150px] rounded-full"></div>

                <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent uppercase tracking-wider">
                            Embed AIoT Portal
                        </h1>
                        <p className="text-gray-400 text-sm mt-2">
                            {authMode === "login" ? "Sign in to access control dashboard" : "Register a new administrator account"}
                        </p>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="space-y-5">
                        {authMode === "register" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition"
                                    placeholder="John Doe"
                                    value={authForm.name}
                                    onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition"
                                placeholder="admin@embedaiot.com"
                                value={authForm.email}
                                onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition"
                                placeholder="••••••••"
                                value={authForm.password}
                                onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                            />
                        </div>

                        {authError && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3">
                                {authError}
                            </div>
                        )}

                        {authSuccess && (
                            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-xl p-3">
                                {authSuccess}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold rounded-xl hover:scale-[1.02] transition duration-300"
                        >
                            {authMode === "login" ? "Sign In" : "Register Admin"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        {authMode === "login" ? (
                            <p>
                                Need an account?{" "}
                                <button onClick={() => { setAuthMode("register"); setAuthError(""); }} className="text-amber-400 font-semibold hover:underline">
                                    Register here
                                </button>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{" "}
                                <button onClick={() => { setAuthMode("login"); setAuthError(""); }} className="text-amber-400 font-semibold hover:underline">
                                    Sign in here
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-12 pt-28 py-16 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6 mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                            Control <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Panel</span>
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base mt-2">
                            Manage your dynamic website content and client interactions.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-gray-300">
                            Connected (In-Memory Sandbox)
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-semibold rounded-xl hover:bg-red-600 hover:text-white transition duration-300"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-4 border-b border-white/10 pb-4 mb-8">
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${
                            activeTab === "products"
                                ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                                : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        Product Manager
                    </button>
                    <button
                        onClick={() => setActiveTab("contacts")}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition ${
                            activeTab === "contacts"
                                ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                                : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        Inbox Messages
                    </button>
                </div>

                {/* Tab: Products */}
                {activeTab === "products" && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Create Product Form */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-fit backdrop-blur-xl">
                            <h2 className="text-xl font-bold text-amber-300 mb-5">Create New Product</h2>
                            <form onSubmit={handleCreateProduct} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-1">Product Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                                        placeholder="e.g. Smart EV Charger"
                                        value={productForm.title}
                                        onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                                        placeholder="e.g. EV Solutions"
                                        value={productForm.category}
                                        onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-1">Description</label>
                                    <textarea
                                        required
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                                        placeholder="Brief details about the product..."
                                        value={productForm.description}
                                        onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-1">Technologies (comma separated)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                                        placeholder="e.g. IoT, LoRa, Arduino"
                                        value={productForm.technologies}
                                        onChange={e => setProductForm({ ...productForm, technologies: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-1">Features (comma separated)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                                        placeholder="e.g. Solar powered, 10km range"
                                        value={productForm.features}
                                        onChange={e => setProductForm({ ...productForm, features: e.target.value })}
                                    />
                                </div>

                                {productMsg && (
                                    <div className="bg-white/5 border border-amber-400/20 text-amber-300 text-xs rounded-xl p-3">
                                        {productMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-sm rounded-xl hover:scale-[1.02] transition"
                                >
                                    Publish Product
                                </button>
                            </form>
                        </div>

                        {/* Database Products List */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-bold text-white">Database Products</h2>
                                <span className="text-xs text-gray-400 font-semibold">{products.length} Products Found</span>
                            </div>

                            {products.length === 0 ? (
                                <div className="text-center py-16 border border-dashed border-white/10 rounded-3xl bg-white/5">
                                    <p className="text-gray-400 text-sm">No products in the database yet.</p>
                                    <p className="text-xs text-gray-500 mt-1">Use the form on the left to add your first product.</p>
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {products.map((p) => (
                                        <div key={p._id} className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:border-amber-400/30 transition">
                                            <div>
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="px-2.5 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs border border-cyan-400/20">
                                                        {p.category}
                                                    </span>
                                                    <button
                                                        onClick={() => handleDeleteProduct(p._id)}
                                                        className="text-red-400 hover:text-red-300 text-xs font-semibold"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                                <h3 className="text-lg font-bold mb-2 text-white">{p.title}</h3>
                                                <p className="text-gray-400 text-xs leading-relaxed mb-4">{p.description}</p>
                                                
                                                <div className="flex flex-wrap gap-1.5 mb-2">
                                                    {p.technologies && p.technologies.map((t, idx) => (
                                                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-300">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Tab: Contacts */}
                {activeTab === "contacts" && (
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-white">Inbox Messages</h2>
                            <span className="text-xs text-gray-400 font-semibold">{contacts.length} Messages</span>
                        </div>

                        {contactMsg && (
                            <div className="mb-4 bg-white/5 border border-amber-400/20 text-amber-300 text-sm rounded-xl p-3">
                                {contactMsg}
                            </div>
                        )}

                        {contacts.length === 0 ? (
                            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
                                <p className="text-gray-400 text-sm">No messages received yet.</p>
                                <p className="text-xs text-gray-500 mt-1">Submit the contact form in the footer to test the flow.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {contacts.map((c) => (
                                    <div key={c._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-amber-400/30 transition">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 mb-4 gap-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-amber-300">{c.subject}</h3>
                                                <p className="text-sm text-gray-300 mt-1">
                                                    From: <span className="font-semibold text-white">{c.name}</span> ({c.email})
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-gray-400">
                                                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : new Date().toLocaleString()}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteContact(c._id)}
                                                    className="px-3 py-1 bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-600 hover:text-white transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                            {c.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
