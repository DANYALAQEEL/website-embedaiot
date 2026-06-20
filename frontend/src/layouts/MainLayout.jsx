import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function MainLayout({ children }) {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Navbar />}
            {children}
            {!isAdmin && <Footer />}
            {!isAdmin && <WhatsAppButton />}
        </>
    );
}