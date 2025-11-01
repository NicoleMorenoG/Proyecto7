import { useState } from "react";
import { signup } from "../api/auth";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await signup({ name, email, password });
        localStorage.setItem("token", res.token);
        alert("Registro ok ✅");
    } catch (e) {
        alert("Error en registro");
        console.error(e);
    }
    };

    return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
        <h2>Crear cuenta</h2>
        <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} style={{display:"block", width:"100%", padding:8, marginBottom:8}} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{display:"block", width:"100%", padding:8, marginBottom:8}} />
        <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{display:"block", width:"100%", padding:8, marginBottom:8}} />
        <button type="submit" style={{ padding:"8px 12px" }}>Registrarme</button>
    </form>
    );
}
