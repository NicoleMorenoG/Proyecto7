// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products";
import { toImageUrl } from "../utils/media";
import { useCart } from "../context/CartContext";
import { createStripeSession } from "../api/checkout";

export default function ProductDetail() {
    const { id } = useParams();
    const [prod, setProd] = useState(null);
    const [loading, setLoading] = useState(true);
    const { add } = useCart();

    useEffect(() => {
    setLoading(true);
    fetchProductById(id)
        .then(setProd)
        .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10">Cargando…</div>
    );
    }

    if (!prod) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10">No encontrado</div>
    );
    }

    return (
    <div className="mx-auto max-w-7xl px-4 py-8">
        <Link
        to="/"
        className="inline-flex items-center gap-1 text-koi-amethyst hover:underline"
        >
        ← Volver
        </Link>

        <div className="mt-5 grid gap-8 lg:grid-cols-2">
        {/* Imagen */}
        <div>
            {prod.images?.[0] && (
            <img
                src={toImageUrl(prod.images[0])}
                alt={prod.name}
                onError={(e) => {
                e.currentTarget.style.display = "none";
                }}
                className="w-full max-w-xl rounded-2xl border border-zinc-200 shadow-sm"
            />
            )}
        </div>

        {/* Info */}
        <div>
            <h1 className="text-3xl font-semibold text-zinc-900">
            {prod.name}
            </h1>

            <p className="mt-3 text-zinc-600">{prod.description}</p>

            <p className="mt-2 text-sm text-zinc-500">
            <b className="text-zinc-700">Categoría:</b> {prod.category}
            </p>

            <div className="mt-6 text-3xl font-bold text-zinc-900">
            ${prod.price?.toLocaleString?.("es-CL")}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
            {/* Agregar al carrito */}
            <button
                onClick={() => add(prod, 1)}
                className="inline-flex items-center justify-center rounded-xl
                            bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800
                            transition focus:outline-none focus:ring-4 focus:ring-zinc-900/20"
            >
                Agregar al carrito
            </button>

            {/* Comprar ahora (Stripe) */}
            <button
                onClick={async () => {
                try {
                  // Compra directa: 1 unidad
                    const session = await createStripeSession([
                    { productId: prod._id, qty: 1 },
                    ]);
                    if (session?.url) {
                    window.location = session.url;
                    }
                } catch (err) {
                    console.error("Stripe error:", err);
                    alert("No se pudo iniciar el pago. Intenta más tarde.");
                }
                }}
                className="inline-flex items-center justify-center rounded-xl
                            border border-zinc-300 bg-white px-4 py-2 text-zinc-900
                            hover:bg-zinc-50 transition
                            focus:outline-none focus:ring-4 focus:ring-koi-amethyst/20"
            >
                Comprar ahora
            </button>
            </div>
        </div>
        </div>
    </div>
    );
}
