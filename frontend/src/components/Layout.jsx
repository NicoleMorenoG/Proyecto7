// src/components/Layout.jsx
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
    <div className="min-h-screen flex flex-col bg-[#F8F5F1]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
        </main>
        <Footer />
    </div>
    );
}
