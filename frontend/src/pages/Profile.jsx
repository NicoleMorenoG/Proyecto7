// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, clearAuth, getUser } from "../lib/auth";

export default function Profile() {
  const nav = useNavigate();
  const [user, setUser] = useState(getUser());
  const [err, setErr] = useState("");

  useEffect(() => {
    // refrescar datos desde el backend
    apiFetch("/users/me")
      .then((r) => setUser(r.user))
      .catch((e) => setErr(e.message));
  }, []);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <p className="mb-4">No has iniciado sesión.</p>
        <button
          className="rounded-xl border px-4 py-2"
          onClick={() => nav("/login")}
        >
          Ir a Login
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Mi perfil</h1>
      {err && <p className="text-red-600">{err}</p>}
      <div className="rounded-xl border p-4">
        <p><b>Nombre:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Rol:</b> {user.role}</p>
      </div>
      <button
        className="mt-4 rounded-xl border px-4 py-2"
        onClick={() => {
          clearAuth();
          nav("/");
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
