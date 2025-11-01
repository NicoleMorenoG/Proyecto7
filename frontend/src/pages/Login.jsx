import { useState } from "react";
import { login } from "../api/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await login({ email, password });
        localStorage.setItem("token", res.token);
        alert("Login ok ✅");
    } catch (e) {
        alert("Error en login");
        console.error(e);
    }
    };

    return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
        <h2>Iniciar sesión</h2>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{display:"block", width:"100%", padding:8, marginBottom:8}} />
        <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{display:"block", width:"100%", padding:8, marginBottom:8}} />
        <button type="submit" style={{ padding:"8px 12px" }}>Entrar</button>
    </form>
    );
}
