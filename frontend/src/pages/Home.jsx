import { Link } from "react-router-dom";

export default function Home() {
    return (
    <section>
      {/* Hero */}
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
            <h1 className="font-display text-4xl sm:text-5xl text-koi-ink leading-tight">
            Joyería en <span className="text-koi-gold">plata 925</span> con alma de{" "}
            <span className="text-koi-amethyst">amatista</span>.
            </h1>
            <p className="mt-4 text-gray-600">
            Piezas escogidas con intención: perlas, nácar y cuarzos que cuentan historias.
            </p>
            <div className="mt-6 flex gap-3">
            <Link to="/products" className="px-5 py-3 rounded-xl bg-koi-amethyst text-white shadow-soft hover:opacity-90">
                Ver colección
            </Link>
            <Link to="/about" className="px-5 py-3 rounded-xl border hover:bg-white">
                Conócenos
            </Link>
            </div>
        </div>

        <div className="aspect-[4/3] rounded-2xl shadow-soft overflow-hidden bg-white border">
          {/* Imagen hero opcional */}
            <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop"
            alt="Joyas Nicole Koi"
            />
        </div>
        </div>

      {/* Highlights */}
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-4 mt-6">
        {[
            ["Plata 925 certificada", "Durable y hipoalergénica"],
            ["Piedras naturales", "Perlas, nácar y cuarzos"],
            ["Hecho con intención", "Cuidado en cada detalle"],
        ].map(([title, sub]) => (
            <div key={title} className="rounded-xl bg-koi-card border p-5">
            <h3 className="font-semibold text-koi-ink">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{sub}</p>
            </div>
        ))}
        </div>
    </section>
    );
}
