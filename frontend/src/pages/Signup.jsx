import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.msg || "Error al registrarse");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/profile");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold text-zinc-900">Crear cuenta</h1>
      <p className="mt-1 text-sm text-zinc-600">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-koi-amethyst hover:underline">
          Inicia sesión
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {err && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-800">Nombre</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-koi-amethyst"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-koi-amethyst"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-800">Contraseña</label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-koi-amethyst"
              placeholder="Mínimo 6 caracteres"
            />
            <button
              type="button"
              onClick={()=>setShow(s=>!s)}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              aria-label="Mostrar/ocultar contraseña"
            >
              {show ? "Ocultar" : "Ver"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-koi-amethyst px-4 py-2 text-white hover:bg-koi-amethyst/90 disabled:opacity-60"
        >
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
