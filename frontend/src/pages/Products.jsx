// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";
import { toImageUrl } from "../utils/media";

export default function Products() {
  const [data, setData] = useState({ items: [], pagination: null });
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchProducts(q ? { q } : {})
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-zinc-900 tracking-tight">
        Colección de Joyas
      </h1>

      <div className="mt-6 flex justify-center">
        <input
          placeholder="Buscar joyas..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full max-w-md rounded-full border border-zinc-300 px-5 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-koi-amethyst"
          aria-label="Buscar productos"
        />
      </div>

      {loading ? (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 p-3 shadow-sm">
              <div className="h-44 w-full animate-pulse rounded-xl bg-zinc-200" />
            </div>
          ))}
        </div>
      ) : data.items.length === 0 ? (
        <p className="mt-8 text-center text-zinc-600">No hay productos disponibles.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.items.map((p) => (
            <div
              key={p._id}
              className="group rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-md transition-all duration-200 border border-zinc-100"
            >
              {p.images?.[0] && (
                <div className="aspect-square overflow-hidden">
                  <img
                    src={toImageUrl(p.images[0])}
                    alt={p.name}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="p-4">
                <h3 className="text-base font-semibold text-zinc-900 line-clamp-2 min-h-[2.5rem]">
                  {p.name}
                </h3>
                <div className="mt-1 text-sm text-zinc-500">{p.category}</div>
                <div className="mt-2 text-lg font-bold text-koi-amethyst">
                  ${p.price?.toLocaleString?.("es-CL")}
                </div>
                <div className="mt-4 text-center">
                  <Link
                    to={`/product/${p._id}`}
                    className="inline-block rounded-full border border-koi-amethyst/40 px-4 py-1.5 text-sm text-koi-amethyst hover:bg-koi-amethyst hover:text-white transition-all"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
