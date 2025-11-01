// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { count } = useCart();

    return (
    <nav
        className="
        sticky top-0 z-50 border-b border-zinc-200
        bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60
        "
        aria-label="Navegación principal"
    >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        {/* Marca */}
        <Link
            to="/"
            className="text-lg font-bold tracking-tight text-zinc-900 hover:text-zinc-700"
        >
            Wildflower Joyas
        </Link>

        {/* Links */}
        <div className="ml-auto flex items-center gap-4">
            <Link
            to="/"
            className="text-sm text-zinc-700 hover:text-koi-amethyst transition"
            >
            Inicio
            </Link>

            <Link
            to="/products"
            className="text-sm text-zinc-700 hover:text-koi-amethyst transition"
            >
            Productos
            </Link>

            <Link
            to="/about"
            className="text-sm text-zinc-700 hover:text-koi-amethyst transition"
            >
            Nosotros
            </Link>

            <Link
            to="/profile"
            className="text-sm text-zinc-700 hover:text-koi-amethyst transition"
            >
            Perfil
            </Link>

          {/* Carrito con contador */}
            <Link
            to="/cart"
            className="
                relative inline-flex items-center gap-2 rounded-xl
                border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700
                hover:border-koi-amethyst/40 hover:bg-koi-amethyst/5 transition
            "
            >
            Carrito
            <span
                className="
                inline-flex min-w-5 justify-center rounded-md px-1 text-xs
                font-semibold text-white bg-koi-amethyst
                "
                aria-label={`Items en el carrito: ${count}`}
            >
                {count}
            </span>
            </Link>

            <Link
            to="/login"
            className="text-sm text-zinc-700 hover:text-koi-amethyst transition"
            >
            Login
            </Link>
            <Link
            to="/signup"
            className="text-sm text-white bg-koi-amethyst hover:bg-koi-amethyst/90
                        px-3 py-1.5 rounded-xl transition"
            >
            Signup
            </Link>
        </div>
        </div>
    </nav>
    );
}
