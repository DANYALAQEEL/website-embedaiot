import { useState, useEffect } from "react";

export default function AdminPortal() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [role, setRole] = useState("staff");
    const [name, setName] = useState("");
    const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, messages, portfolio, services, products, team, stories
    const [authMode, setAuthMode] = useState("login"); // login
    const [showAuthPassword, setShowAuthPassword] = useState(false);
    const [showUserPassword, setShowUserPassword] = useState(false);

    // Auth Forms
    const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
    const [authError, setAuthError] = useState("");
    const [authSuccess, setAuthSuccess] = useState("");

    // Alerts
    const [alert, setAlert] = useState({ msg: "", type: "" }); // success, error

    // Dashboard Counts
    const [counts, setCounts] = useState({
        portfolio: 0,
        services: 0,
        products: 0,
        team: 0,
        messages: 0,
        stories: 0
    });

    // Content Lists
    const [messages, setMessages] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [team, setTeam] = useState([]);
    const [stories, setStories] = useState([]);
    const [users, setUsers] = useState([]);

    // Edit Item IDs
    const [editId, setEditId] = useState("");

    // Form States
    const [portfolioForm, setPortfolioForm] = useState({ title: "", category: "", description: "", technologies: "", clientName: "" });
    const [serviceForm, setServiceForm] = useState({ title: "", category: "", description: "", featured: "false" });
    const [productForm, setProductForm] = useState({ title: "", price: "", category: "", description: "", technologies: "", features: "", featured: "false" });
    const [teamForm, setTeamForm] = useState({ name: "", role: "", department: "", featured: "false" });
    const [storyForm, setStoryForm] = useState({ title: "", description: "", order: "1" });
    const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "staff" });

    // File Uploads
    const [uploadedFile, setUploadedFile] = useState(null);

    // Alert helper
    const triggerAlert = (msg, type = "success") => {
        setAlert({ msg, type });
        setTimeout(() => setAlert({ msg: "", type: "" }), 3500);
    };

    // Check localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        const storedRole = localStorage.getItem("adminRole") || "staff";
        const storedName = localStorage.getItem("adminName") || "";
        if (storedToken) {
            setToken(storedToken);
            setRole(storedRole);
            setName(storedName);
            setIsLoggedIn(true);
            loadDashboardCounts(storedToken);
            loadTabData(activeTab, storedToken);
        }
    }, [activeTab, isLoggedIn]);

    const loadDashboardCounts = async (authToken) => {
        const fetchCount = async (endpoint) => {
            try {
                const res = await fetch(`http://localhost:5000/api/${endpoint}`);
                const data = await res.json();
                return Array.isArray(data) ? data.length : 0;
            } catch {
                return 0;
            }
        };
        const pCount = await fetchCount("portfolio");
        const sCount = await fetchCount("services");
        const prCount = await fetchCount("products");
        const tCount = await fetchCount("team");
        const stCount = await fetchCount("stories");

        let mCount = 0;
        try {
            const res = await fetch("http://localhost:5000/api/contact", {
                headers: { "Authorization": `Bearer ${authToken}` }
            });
            const data = await res.json();
            mCount = Array.isArray(data) ? data.length : 0;
        } catch {}

        setCounts({
            portfolio: pCount,
            services: sCount,
            products: prCount,
            team: tCount,
            stories: stCount,
            messages: mCount
        });
    };

    const loadTabData = async (tab, authToken) => {
        if (!authToken) return;
        const headers = { "Authorization": `Bearer ${authToken}` };

        try {
            if (tab === "messages") {
                const res = await fetch("http://localhost:5000/api/contact", { headers });
                const data = await res.json();
                if (Array.isArray(data)) setMessages(data);
            } else if (tab === "portfolio") {
                const res = await fetch("http://localhost:5000/api/portfolio");
                const data = await res.json();
                if (Array.isArray(data)) setPortfolio(data);
            } else if (tab === "services") {
                const res = await fetch("http://localhost:5000/api/services");
                const data = await res.json();
                if (Array.isArray(data)) setServices(data);
            } else if (tab === "products") {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                if (Array.isArray(data)) setProducts(data);
            } else if (tab === "team") {
                const res = await fetch("http://localhost:5000/api/team");
                const data = await res.json();
                if (Array.isArray(data)) setTeam(data);
            } else if (tab === "stories") {
                const res = await fetch("http://localhost:5000/api/stories");
                const data = await res.json();
                if (Array.isArray(data)) setStories(data);
            } else if (tab === "users") {
                const res = await fetch("http://localhost:5000/api/admin/users", { headers });
                const data = await res.json();
                if (Array.isArray(data)) setUsers(data);
            }
        } catch (err) {
            console.error("Error loading tab data:", err);
        }
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError("");
        setAuthSuccess("");

        const body = { email: authForm.email, password: authForm.password };

        try {
            const res = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Authentication failed");

            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("adminRole", data.role || "staff");
            localStorage.setItem("adminName", data.name || "User");
            setToken(data.token);
            setRole(data.role || "staff");
            setName(data.name || "User");
            setIsLoggedIn(true);
            setAuthSuccess("Login successful!");
            setActiveTab("dashboard");
        } catch (err) {
            setAuthError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        localStorage.removeItem("adminName");
        setToken("");
        setRole("staff");
        setName("");
        setIsLoggedIn(false);
        setActiveTab("dashboard");
    };

    // Auto sign out after 15 minutes of inactivity
    useEffect(() => {
        if (!isLoggedIn) return;

        const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
        let timeoutId;

        const resetTimer = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                handleLogout();
                triggerAlert("Logged out due to inactivity", "error");
            }, INACTIVITY_TIMEOUT);
        };

        const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
        activityEvents.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        resetTimer();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            activityEvents.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [isLoggedIn]);


    // Generic API call helper (POST/PUT/DELETE)
    const handleApiRequest = async (url, method, formData) => {
        const headers = { "Authorization": `Bearer ${token}` };
        if (typeof formData === "string") {
            headers["Content-Type"] = "application/json";
        }
        
        // Let browser set multipart boundary if body is FormData
        const options = {
            method,
            headers,
            body: formData
        };

        const res = await fetch(url, options);
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "API request failed");
        }
        return res.json();
    };

    // Helper for rendering image sources
    const getImgUrl = (path) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `http://localhost:5000${path}`;
    };

    // ── PORTFOLIO ACTIONS ──
    const savePortfolio = async (e) => {
        e.preventDefault();
        if (!portfolioForm.title || !portfolioForm.description) {
            return triggerAlert("Title and description required", "error");
        }

        const form = new FormData();
        form.append("title", portfolioForm.title);
        form.append("category", portfolioForm.category);
        form.append("description", portfolioForm.description);
        form.append("technologies", portfolioForm.technologies);
        if (portfolioForm.clientName) form.append("clientName", portfolioForm.clientName);
        if (uploadedFile) form.append("image", uploadedFile);

        const url = editId ? `http://localhost:5000/api/portfolio/${editId}` : "http://localhost:5000/api/portfolio";
        const method = editId ? "PUT" : "POST";

        try {
            await handleApiRequest(url, method, form);
            triggerAlert(editId ? "Project updated!" : "Project added!");
            clearPortfolioForm();
            loadTabData("portfolio", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const editPortfolio = (p) => {
        setEditId(p._id);
        setPortfolioForm({
            title: p.title || "",
            category: p.category || "",
            description: p.description || "",
            technologies: (p.technologies || []).join(", "),
            clientName: p.clientName || ""
        });
        window.scrollTo(0, 0);
    };

    const deletePortfolio = async (id) => {
        if (!window.confirm("Delete this project?")) return;
        try {
            await handleApiRequest(`http://localhost:5000/api/portfolio/${id}`, "DELETE");
            triggerAlert("Project deleted!");
            loadTabData("portfolio", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const clearPortfolioForm = () => {
        setEditId("");
        setPortfolioForm({ title: "", category: "", description: "", technologies: "", clientName: "" });
        setUploadedFile(null);
    };

    // ── SERVICES ACTIONS ──
    const saveService = async (e) => {
        e.preventDefault();
        if (!serviceForm.title || !serviceForm.description) {
            return triggerAlert("Title and description required", "error");
        }

        const form = new FormData();
        form.append("title", serviceForm.title);
        form.append("description", serviceForm.description);
        form.append("category", serviceForm.category);
        form.append("featured", serviceForm.featured);
        if (uploadedFile) form.append("image", uploadedFile);

        const url = editId ? `http://localhost:5000/api/services/${editId}` : "http://localhost:5000/api/services";
        const method = editId ? "PUT" : "POST";

        try {
            await handleApiRequest(url, method, form);
            triggerAlert(editId ? "Service updated!" : "Service added!");
            clearServiceForm();
            loadTabData("services", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const editService = (s) => {
        setEditId(s._id);
        setServiceForm({
            title: s.title || "",
            category: s.category || "",
            description: s.description || "",
            featured: s.featured ? "true" : "false"
        });
        window.scrollTo(0, 0);
    };

    const deleteService = async (id) => {
        if (!window.confirm("Delete this service?")) return;
        try {
            await handleApiRequest(`http://localhost:5000/api/services/${id}`, "DELETE");
            triggerAlert("Service deleted!");
            loadTabData("services", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const clearServiceForm = () => {
        setEditId("");
        setServiceForm({ title: "", category: "", description: "", featured: "false" });
        setUploadedFile(null);
    };

    // ── PRODUCTS ACTIONS ──
    const saveProduct = async (e) => {
        e.preventDefault();
        if (!productForm.title || !productForm.description || !productForm.price) {
            return triggerAlert("Title, description and price required", "error");
        }

        const form = new FormData();
        form.append("title", productForm.title);
        form.append("price", productForm.price);
        form.append("category", productForm.category);
        form.append("description", productForm.description);
        form.append("featured", productForm.featured);
        form.append("technologies", productForm.technologies);
        form.append("features", productForm.features);
        if (uploadedFile) form.append("image", uploadedFile);

        const url = editId ? `http://localhost:5000/api/products/${editId}` : "http://localhost:5000/api/products";
        const method = editId ? "PUT" : "POST";

        try {
            await handleApiRequest(url, method, form);
            triggerAlert(editId ? "Product updated!" : "Product added!");
            clearProductForm();
            loadTabData("products", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const editProduct = (p) => {
        setEditId(p._id);
        setProductForm({
            title: p.title || "",
            price: p.price || "",
            category: p.category || "",
            description: p.description || "",
            technologies: (p.technologies || []).join(", "),
            features: (p.features || []).join(", "),
            featured: p.featured ? "true" : "false"
        });
        window.scrollTo(0, 0);
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await handleApiRequest(`http://localhost:5000/api/products/${id}`, "DELETE");
            triggerAlert("Product deleted!");
            loadTabData("products", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const clearProductForm = () => {
        setEditId("");
        setProductForm({ title: "", price: "", category: "", description: "", technologies: "", features: "", featured: "false" });
        setUploadedFile(null);
    };

    // ── TEAM ACTIONS ──
    const saveTeamMember = async (e) => {
        e.preventDefault();
        if (!teamForm.name || !teamForm.role || !teamForm.department) {
            return triggerAlert("Name, role and department required", "error");
        }
        if (!editId && !uploadedFile) {
            return triggerAlert("Please upload a member photo", "error");
        }

        const form = new FormData();
        form.append("name", teamForm.name);
        form.append("role", teamForm.role);
        form.append("department", teamForm.department);
        form.append("featured", teamForm.featured);
        if (uploadedFile) form.append("image", uploadedFile);

        const url = editId ? `http://localhost:5000/api/team/${editId}` : "http://localhost:5000/api/team";
        const method = editId ? "PUT" : "POST";

        try {
            await handleApiRequest(url, method, form);
            triggerAlert(editId ? "Team member updated!" : "Team member added!");
            clearTeamForm();
            loadTabData("team", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const editTeamMember = (m) => {
        setEditId(m._id);
        setTeamForm({
            name: m.name || "",
            role: m.role || "",
            department: m.department || "",
            featured: m.featured ? "true" : "false"
        });
        window.scrollTo(0, 0);
    };

    const deleteTeamMember = async (id) => {
        if (!window.confirm("Delete this team member?")) return;
        try {
            await handleApiRequest(`http://localhost:5000/api/team/${id}`, "DELETE");
            triggerAlert("Team member deleted!");
            loadTabData("team", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const clearTeamForm = () => {
        setEditId("");
        setTeamForm({ name: "", role: "", department: "", featured: "false" });
        setUploadedFile(null);
    };

    // ── STORIES ACTIONS ──
    const saveStory = async (e) => {
        e.preventDefault();
        if (!storyForm.title || !storyForm.description) {
            return triggerAlert("Title and description required", "error");
        }

        const form = new FormData();
        form.append("title", storyForm.title);
        form.append("description", storyForm.description);
        form.append("order", storyForm.order);
        if (uploadedFile) form.append("image", uploadedFile);

        const url = editId ? `http://localhost:5000/api/stories/${editId}` : "http://localhost:5000/api/stories";
        const method = editId ? "PUT" : "POST";

        try {
            await handleApiRequest(url, method, form);
            triggerAlert(editId ? "Story section updated!" : "Story section added!");
            clearStoryForm();
            loadTabData("stories", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const editStory = (s) => {
        setEditId(s._id);
        setStoryForm({
            title: s.title || "",
            description: s.description || "",
            order: s.order || "1"
        });
        window.scrollTo(0, 0);
    };

    const deleteStory = async (id) => {
        if (!window.confirm("Delete this story section?")) return;
        try {
            await handleApiRequest(`http://localhost:5000/api/stories/${id}`, "DELETE");
            triggerAlert("Story section deleted!");
            loadTabData("stories", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const clearStoryForm = () => {
        setEditId("");
        setStoryForm({ title: "", description: "", order: "1" });
        setUploadedFile(null);
    };

    // ── USERS ACTIONS ──
    const createUser = async (e) => {
        e.preventDefault();
        try {
            await handleApiRequest("http://localhost:5000/api/admin/register", "POST", JSON.stringify(userForm));
            triggerAlert("Account created successfully!");
            setUserForm({ name: "", email: "", password: "", role: "staff" });
            loadTabData("users", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this account?")) return;
        try {
            await handleApiRequest(`http://localhost:5000/api/admin/users/${id}`, "DELETE");
            triggerAlert("Account deleted successfully!");
            loadTabData("users", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };

    // ── MESSAGES ACTIONS ──
    const deleteMessage = async (id) => {
        if (!window.confirm("Delete this message?")) return;
        try {
            await handleApiRequest(`http://localhost:5000/api/contact/${id}`, "DELETE");
            triggerAlert("Message deleted!");
            loadTabData("messages", token);
        } catch (err) {
            triggerAlert(err.message, "error");
        }
    };


    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-28 relative overflow-hidden">
                <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-cyan-400/20 blur-[180px] rounded-full"></div>
                <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-amber-500/10 blur-[150px] rounded-full"></div>

                <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent uppercase tracking-wider">
                            Embed AIoT Portal
                        </h1>
                        <p className="text-gray-400 text-sm mt-2">
                            Sign in to access control dashboard
                        </p>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Email Address</label>
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
                            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <input
                                    type={showAuthPassword ? "text" : "password"}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:border-amber-400 transition"
                                    placeholder="••••••••"
                                    value={authForm.password}
                                    onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowAuthPassword(!showAuthPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-1 focus:outline-none flex items-center justify-center"
                                >
                                    {showAuthPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
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
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0f1c] text-[#e6f1ff] flex relative">
            {/* Global Alert Notification */}
            {alert.msg && (
                <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-xl border text-sm font-semibold shadow-2xl transition duration-300 ${
                    alert.type === "error" 
                        ? "bg-red-950/80 border-red-500/30 text-red-400" 
                        : "bg-green-950/80 border-green-500/30 text-green-400"
                }`}>
                    {alert.msg}
                </div>
            )}

            {/* ── SIDEBAR ── */}
            <aside className="w-64 bg-[#050a14] border-right border-[#1a2a3a] flex flex-col fixed top-0 left-0 bottom-0 z-40">
                <div className="p-6 border-b border-[#1a2a3a]">
                    <h2 className="text-lg font-bold text-cyan-400 tracking-wider">Embed AIoT</h2>
                    <p className="text-[11px] text-gray-500 mt-1 uppercase font-semibold">Admin Panel</p>
                </div>
                <nav className="flex-1 py-4 space-y-1">
                    {(() => {
                        const tabs = [
                            { id: "dashboard", label: "Dashboard", icon: "📊" },
                            { id: "messages", label: "Messages", icon: "✉️" },
                            { id: "portfolio", label: "Portfolio", icon: "📁" },
                            { id: "services", label: "Services", icon: "⚙️" },
                            { id: "products", label: "Products", icon: "📦" },
                            { id: "team", label: "Team", icon: "👥" },
                            { id: "stories", label: "Our Story", icon: "📖" }
                        ];
                        if (role === "admin") {
                            tabs.push({ id: "users", label: "Staff & Admins", icon: "🔑" });
                        }
                        return tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setEditId(""); }}
                                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition text-left border-l-4 ${
                                    activeTab === tab.id
                                        ? "text-cyan-400 bg-[#0d1829] border-cyan-400"
                                        : "text-gray-400 border-transparent hover:text-cyan-400 hover:bg-[#0d1829]"
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ));
                    })()}
                </nav>
                <div className="p-4 border-t border-[#1a2a3a]">
                    <button
                        onClick={handleLogout}
                        className="w-full py-2.5 bg-slate-800 border border-slate-700 text-gray-400 font-bold text-sm rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition"
                    >
                        🚪 Sign Out
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main className="ml-64 flex-1 p-8 min-h-screen">

                {/* Dashboard Tab */}
                {activeTab === "dashboard" && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold">Dashboard</h1>
                            <p className="text-gray-500 text-sm mt-1">Welcome back! Here's an overview of your website content.</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                            {[
                                { count: counts.portfolio, label: "Projects", color: "text-cyan-400", tab: "portfolio" },
                                { count: counts.services, label: "Services", color: "text-cyan-400", tab: "services" },
                                { count: counts.products, label: "Products", color: "text-cyan-400", tab: "products" },
                                { count: counts.team, label: "Team Members", color: "text-cyan-400", tab: "team" },
                                { count: counts.messages, label: "Messages", color: "text-cyan-400", tab: "messages" },
                                { count: counts.stories, label: "Stories", color: "text-cyan-400", tab: "stories" }
                            ].map((s, idx) => (
                                <div key={idx} onClick={() => setActiveTab(s.tab)} className="bg-[#050a14] border border-[#1a2a3a] rounded-xl p-5 cursor-pointer hover:border-cyan-400/40 transition">
                                    <div className={`text-3xl font-bold ${s.color}`}>{s.count}</div>
                                    <div className="text-xs text-gray-500 mt-1 uppercase font-semibold tracking-wider">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-4">Quick Actions</h2>
                            <div className="flex flex-wrap gap-3">
                                <button onClick={() => setActiveTab("portfolio")} className="px-5 py-2.5 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-500 transition">+ Add Project</button>
                                <button onClick={() => setActiveTab("services")} className="px-5 py-2.5 bg-slate-800 border border-slate-700 text-gray-300 font-semibold rounded-lg hover:bg-slate-700 transition">+ Add Service</button>
                                <button onClick={() => setActiveTab("products")} className="px-5 py-2.5 bg-slate-800 border border-slate-700 text-gray-300 font-semibold rounded-lg hover:bg-slate-700 transition">+ Add Product</button>
                                <button onClick={() => setActiveTab("team")} className="px-5 py-2.5 bg-slate-800 border border-slate-700 text-gray-300 font-semibold rounded-lg hover:bg-slate-700 transition">+ Add Team Member</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Messages Tab */}
                {activeTab === "messages" && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold">Contact Messages</h1>
                            <p className="text-gray-500 text-sm mt-1">Messages sent through your website contact form.</p>
                        </div>

                        {messages.length === 0 ? (
                            <div className="text-center py-20 border border-dashed border-[#1a2a3a] rounded-2xl bg-[#050a14]">
                                <div className="text-4xl mb-2">✉️</div>
                                <p className="text-gray-500 text-sm">No messages yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map(m => (
                                    <div key={m._id} className="bg-[#0d1829] border border-[#1a2a3a] rounded-xl p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <div className="font-bold text-white text-base">{m.name}</div>
                                                <div className="text-xs text-cyan-400 mt-0.5">{m.email}</div>
                                                <div className="text-xs text-amber-400 font-semibold mt-1">Subject: {m.subject}</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-gray-500">{new Date(m.date).toLocaleDateString()}</span>
                                                <button onClick={() => deleteMessage(m._id)} className="px-3 py-1 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded hover:bg-red-600 hover:text-white transition">Delete</button>
                                            </div>
                                        </div>
                                        <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">{m.message}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === "portfolio" && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold">Portfolio Showcase</h1>
                            <p className="text-gray-500 text-sm mt-1">Manage project showreel.</p>
                        </div>

                        {/* Portfolio Form */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6 mb-8">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">{editId ? "Edit Project" : "Add New Project"}</h2>
                            <form onSubmit={savePortfolio} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Project Title</label>
                                        <input type="text" required placeholder="e.g. Smart Farming System" value={portfolioForm.title} onChange={e => setPortfolioForm({ ...portfolioForm, title: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Category</label>
                                        <select value={portfolioForm.category} onChange={e => setPortfolioForm({ ...portfolioForm, category: e.target.value })}>
                                            <option value="">Select category</option>
                                            <option value="Smart Agriculture">Smart Agriculture</option>
                                            <option value="AI, IoT">AI, IoT</option>
                                            <option value="Mechanical Design">Mechanical Design</option>
                                            <option value="Consumer Electronics">Consumer Electronics</option>
                                            <option value="IoT Development">IoT Development</option>
                                            <option value="Security Systems">Security Systems</option>
                                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                                            <option value="Embedded Systems">Embedded Systems</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase">Description</label>
                                    <textarea required placeholder="Describe project details..." value={portfolioForm.description} onChange={e => setPortfolioForm({ ...portfolioForm, description: e.target.value })}></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Technologies (comma separated)</label>
                                        <input type="text" placeholder="React, Node.js, IoT" value={portfolioForm.technologies} onChange={e => setPortfolioForm({ ...portfolioForm, technologies: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Client Name (optional)</label>
                                        <input type="text" placeholder="e.g. ABC Corp" value={portfolioForm.clientName} onChange={e => setPortfolioForm({ ...portfolioForm, clientName: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase">Project Image</label>
                                    <input type="file" accept="image/*" onChange={e => setUploadedFile(e.target.files[0])} />
                                </div>
                                <div className="flex gap-2.5 pt-2">
                                    <button type="submit" className="btn btn-primary">Save Project</button>
                                    <button type="button" onClick={clearPortfolioForm} className="btn btn-secondary">Clear</button>
                                </div>
                            </form>
                        </div>

                        {/* Projects List */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">All Projects</h2>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Technologies</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {portfolio.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-8 text-gray-500">No projects yet.</td>
                                            </tr>
                                        ) : (
                                            portfolio.map(p => (
                                                <tr key={p._id}>
                                                    <td>{p.image ? <img src={getImgUrl(p.image)} alt="project" className="w-12 h-12 object-cover rounded-lg" /> : "—"}</td>
                                                    <td><strong>{p.title}</strong></td>
                                                    <td><span className="badge badge-cyan">{p.category || "—"}</span></td>
                                                    <td className="text-xs text-gray-400">{(p.technologies || []).join(", ")}</td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => editPortfolio(p)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-gray-300 text-xs rounded hover:text-white transition">Edit</button>
                                                            <button onClick={() => deletePortfolio(p._id)} className="px-3 py-1.5 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded hover:bg-red-600 hover:text-white transition">Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Services Tab */}
                {activeTab === "services" && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold">Services</h1>
                            <p className="text-gray-500 text-sm mt-1">Manage what services your company offers.</p>
                        </div>

                        {/* Service Form */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6 mb-8">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">{editId ? "Edit Service" : "Add New Service"}</h2>
                            <form onSubmit={saveService} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Service Title</label>
                                        <input type="text" required placeholder="e.g. Embedded Systems Development" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Category</label>
                                        <input type="text" placeholder="e.g. Hardware Engineering" value={serviceForm.category} onChange={e => setServiceForm({ ...serviceForm, category: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase">Description</label>
                                    <textarea required placeholder="Describe the service..." value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })}></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Featured</label>
                                        <select value={serviceForm.featured} onChange={e => setServiceForm({ ...serviceForm, featured: e.target.value })}>
                                            <option value="false">No</option>
                                            <option value="true">Yes — show highlighted</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Service Image</label>
                                        <input type="file" accept="image/*" onChange={e => setUploadedFile(e.target.files[0])} />
                                    </div>
                                </div>
                                <div className="flex gap-2.5 pt-2">
                                    <button type="submit" className="btn btn-primary">Save Service</button>
                                    <button type="button" onClick={clearServiceForm} className="btn btn-secondary">Clear</button>
                                </div>
                            </form>
                        </div>

                        {/* Services List */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">All Services</h2>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Featured</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-8 text-gray-500">No services yet.</td>
                                            </tr>
                                        ) : (
                                            services.map(s => (
                                                <tr key={s._id}>
                                                    <td>{s.image ? <img src={getImgUrl(s.image)} alt="service" className="w-12 h-12 object-cover rounded-lg" /> : "—"}</td>
                                                    <td><strong>{s.title}</strong></td>
                                                    <td>{s.category || "—"}</td>
                                                    <td>{s.featured ? <span className="badge badge-green">Yes</span> : <span className="text-gray-500">No</span>}</td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => editService(s)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-gray-300 text-xs rounded hover:text-white transition">Edit</button>
                                                            <button onClick={() => deleteService(s._id)} className="px-3 py-1.5 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded hover:bg-red-600 hover:text-white transition">Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === "products" && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold">Products Catalog</h1>
                            <p className="text-gray-500 text-sm mt-1">Manage your dynamic products catalog.</p>
                        </div>

                        {/* Product Form */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6 mb-8">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">{editId ? "Edit Product" : "Add New Product"}</h2>
                            <form onSubmit={saveProduct} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Product Title</label>
                                        <input type="text" required placeholder="e.g. IoT Sensor Node" value={productForm.title} onChange={e => setProductForm({ ...productForm, title: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Price (PKR)</label>
                                        <input type="number" required placeholder="e.g. 5000" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Category</label>
                                        <input type="text" placeholder="e.g. Smart Hardware" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Featured</label>
                                        <select value={productForm.featured} onChange={e => setProductForm({ ...productForm, featured: e.target.value })}>
                                            <option value="false">No</option>
                                            <option value="true">Yes — show highlighted</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase">Description</label>
                                    <textarea required placeholder="Describe details of the product..." value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })}></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Technologies (comma separated)</label>
                                        <input type="text" placeholder="WiFi, LoRa, ESP32" value={productForm.technologies} onChange={e => setProductForm({ ...productForm, technologies: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Features (comma separated)</label>
                                        <input type="text" placeholder="Real-time alerts, IP67 Waterproof" value={productForm.features} onChange={e => setProductForm({ ...productForm, features: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase">Product Image</label>
                                    <input type="file" accept="image/*" onChange={e => setUploadedFile(e.target.files[0])} />
                                </div>
                                <div className="flex gap-2.5 pt-2">
                                    <button type="submit" className="btn btn-primary">Save Product</button>
                                    <button type="button" onClick={clearProductForm} className="btn btn-secondary">Clear</button>
                                </div>
                            </form>
                        </div>

                        {/* Products List */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">All Products</h2>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th>Featured</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-8 text-gray-500">No products yet.</td>
                                            </tr>
                                        ) : (
                                            products.map(p => (
                                                <tr key={p._id}>
                                                    <td>{p.image ? <img src={getImgUrl(p.image)} alt="product" className="w-12 h-12 object-cover rounded-lg" /> : "—"}</td>
                                                    <td><strong>{p.title}</strong></td>
                                                    <td>PKR {p.price || 0}</td>
                                                    <td>{p.category || "—"}</td>
                                                    <td>{p.featured ? <span className="badge badge-green">Yes</span> : <span className="text-gray-500">No</span>}</td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => editProduct(p)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-gray-300 text-xs rounded hover:text-white transition">Edit</button>
                                                            <button onClick={() => deleteProduct(p._id)} className="px-3 py-1.5 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded hover:bg-red-600 hover:text-white transition">Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Team Tab */}
                {activeTab === "team" && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold">Team Members</h1>
                            <p className="text-gray-500 text-sm mt-1">Manage team members displayed on your about page.</p>
                        </div>

                        {/* Team Form */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6 mb-8">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">{editId ? "Edit Team Member" : "Add Team Member"}</h2>
                            <form onSubmit={saveTeamMember} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Full Name</label>
                                        <input type="text" required placeholder="e.g. Dr. Shahzad Younis" value={teamForm.name} onChange={e => setTeamForm({ ...teamForm, name: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Role / Position</label>
                                        <input type="text" required placeholder="e.g. Chief Technical Officer" value={teamForm.role} onChange={e => setTeamForm({ ...teamForm, role: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Department</label>
                                        <select value={teamForm.department} onChange={e => setTeamForm({ ...teamForm, department: e.target.value })}>
                                            <option value="">Select department</option>
                                            <option value="Director & CEO">Director & CEO</option>
                                            <option value="Team Leads">Team Leads</option>
                                            <option value="Research & Development">Research & Development</option>
                                            <option value="Sales & Marketing">Sales & Marketing</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Design">Design</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Featured (Highlight)</label>
                                        <select value={teamForm.featured} onChange={e => setTeamForm({ ...teamForm, featured: e.target.value })}>
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase">Photo File</label>
                                    <input type="file" accept="image/*" onChange={e => setUploadedFile(e.target.files[0])} />
                                </div>
                                <div className="flex gap-2.5 pt-2">
                                    <button type="submit" className="btn btn-primary">Save Member</button>
                                    <button type="button" onClick={clearTeamForm} className="btn btn-secondary">Clear</button>
                                </div>
                            </form>
                        </div>

                        {/* Team Members List */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">All Team Members</h2>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Department</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {team.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-8 text-gray-500">No team members yet.</td>
                                            </tr>
                                        ) : (
                                            team.map(m => (
                                                <tr key={m._id}>
                                                    <td>{m.image ? <img src={getImgUrl(m.image)} alt="team" className="w-12 h-12 object-cover rounded-full" /> : "—"}</td>
                                                    <td><strong>{m.name}</strong></td>
                                                    <td>{m.role || "—"}</td>
                                                    <td><span className="badge badge-cyan">{m.department || "—"}</span></td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => editTeamMember(m)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-gray-300 text-xs rounded hover:text-white transition">Edit</button>
                                                            <button onClick={() => deleteTeamMember(m._id)} className="px-3 py-1.5 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded hover:bg-red-600 hover:text-white transition">Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stories Tab */}
                {activeTab === "stories" && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold">Story Sections</h1>
                            <p className="text-gray-500 text-sm mt-1">Manage company timeline sections.</p>
                        </div>

                        {/* Story Form */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6 mb-8">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">{editId ? "Edit Story" : "Add Story Section"}</h2>
                            <form onSubmit={saveStory} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Title</label>
                                        <input type="text" required placeholder="e.g. How We Started" value={storyForm.title} onChange={e => setStoryForm({ ...storyForm, title: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Display Order (1 = first)</label>
                                        <input type="number" required placeholder="1" value={storyForm.order} onChange={e => setStoryForm({ ...storyForm, order: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase">Story Description</label>
                                    <textarea required rows={4} placeholder="Write the story section..." value={storyForm.description} onChange={e => setStoryForm({ ...storyForm, description: e.target.value })}></textarea>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase">Story Image (optional)</label>
                                    <input type="file" accept="image/*" onChange={e => setUploadedFile(e.target.files[0])} />
                                </div>
                                <div className="flex gap-2.5 pt-2">
                                    <button type="submit" className="btn btn-primary">Save Story</button>
                                    <button type="button" onClick={clearStoryForm} className="btn btn-secondary">Clear</button>
                                </div>
                            </form>
                        </div>

                        {/* Stories List */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">All Story Sections</h2>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Order</th>
                                            <th>Preview</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stories.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-8 text-gray-500">No stories yet.</td>
                                            </tr>
                                        ) : (
                                            stories.map(s => (
                                                <tr key={s._id}>
                                                    <td>{s.image ? <img src={getImgUrl(s.image)} alt="story" className="w-12 h-12 object-cover rounded-lg" /> : "—"}</td>
                                                    <td><strong>{s.title}</strong></td>
                                                    <td style={{ textAlign: "center" }}>{s.order}</td>
                                                    <td className="text-xs text-gray-400 max-w-[200px] truncate">{s.description}</td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => editStory(s)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-gray-300 text-xs rounded hover:text-white transition">Edit</button>
                                                            <button onClick={() => deleteStory(s._id)} className="px-3 py-1.5 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded hover:bg-red-600 hover:text-white transition">Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && role === "admin" && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold">Staff & Admins</h1>
                            <p className="text-gray-500 text-sm mt-1">Manage portal administrator and staff accounts.</p>
                        </div>

                        {/* User Form */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6 mb-8">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">Create New Account</h2>
                            <form onSubmit={createUser} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Full Name</label>
                                        <input 
                                            type="text" 
                                            required 
                                            placeholder="e.g. Maryam Ishtiaq" 
                                            value={userForm.name} 
                                            onChange={e => setUserForm({ ...userForm, name: e.target.value })} 
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Email Address</label>
                                        <input 
                                            type="email" 
                                            required 
                                            placeholder="e.g. maryam@embedaiot.com" 
                                            value={userForm.email} 
                                            onChange={e => setUserForm({ ...userForm, email: e.target.value })} 
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Password</label>
                                        <div className="relative w-full">
                                            <input 
                                                type={showUserPassword ? "text" : "password"} 
                                                required 
                                                placeholder="••••••••" 
                                                value={userForm.password} 
                                                onChange={e => setUserForm({ ...userForm, password: e.target.value })} 
                                                className="w-full pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowUserPassword(!showUserPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 bg-transparent border-none cursor-pointer p-1 focus:outline-none flex items-center justify-center"
                                            >
                                                {showUserPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] text-gray-400 font-semibold uppercase">Role</label>
                                        <select 
                                            value={userForm.role} 
                                            onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                                        >
                                            <option value="staff">Staff (Limited View)</option>
                                            <option value="admin">Admin (Full Control)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button type="submit" className="btn btn-primary">Create Account</button>
                                </div>
                            </form>
                        </div>

                        {/* Users List */}
                        <div className="bg-[#050a14] border border-[#1a2a3a] rounded-2xl p-6">
                            <h2 className="text-lg font-bold border-b border-[#1a2a3a] pb-3 mb-5">Active Accounts</h2>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Created At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-8 text-gray-500">No registered accounts found in database.</td>
                                            </tr>
                                        ) : (
                                            users.map(u => (
                                                <tr key={u._id}>
                                                    <td><strong>{u.name}</strong></td>
                                                    <td>{u.email}</td>
                                                    <td>
                                                        <span className={`badge ${u.role === "admin" ? "badge-green" : "badge-cyan"}`}>
                                                            {u.role ? u.role.toUpperCase() : "STAFF"}
                                                        </span>
                                                    </td>
                                                    <td className="text-xs text-gray-400">
                                                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                                                    </td>
                                                    <td>
                                                        <button 
                                                            onClick={() => deleteUser(u._id)} 
                                                            className="px-3 py-1.5 bg-red-600/10 border border-red-500/20 text-red-400 text-xs rounded hover:bg-red-600 hover:text-white transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
