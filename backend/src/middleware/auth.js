// backend/src/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Extrae el token desde el header Authorization (Bearer) o x-access-token
 */
const getTokenFromRequest = (req) => {
    const hdr = req.headers.authorization || req.headers.Authorization || "";
    if (typeof hdr === "string" && hdr.startsWith("Bearer ")) {
    const t = hdr.slice(7).trim();
    if (t && t !== "null" && t !== "undefined") return t;
    }
    const xtoken = req.headers["x-access-token"];
    if (typeof xtoken === "string" && xtoken) return xtoken.trim();
    return null;
};

/**
 * Verifica token y adjunta el usuario a req.user
 */
export const protect = async (req, res, next) => {
    try {
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ msg: "Falta JWT_SECRET en .env" });
    }

    const token = getTokenFromRequest(req);
    if (!token) {
        return res.status(401).json({ msg: "No autorizado: falta token (Bearer <token>)" });
    }

    // Decodificar token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario vivo (por si fue borrado o cambió rol)
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
        return res.status(401).json({ msg: "Token válido, pero el usuario ya no existe" });
    }

    // Adjuntar usuario y seguir
    req.user = user;
    next();
    } catch (err) {
    // Mensajes más claros según error de JWT
    if (err?.name === "TokenExpiredError") {
        return res.status(401).json({ msg: "Token expirado" });
    }
    if (err?.name === "JsonWebTokenError") {
        return res.status(401).json({ msg: "Token inválido" });
    }
    return res.status(401).json({ msg: "No autorizado", error: err?.message || String(err) });
    }
};

/**
 * Requiere rol admin
 */
export const isAdmin = (req, res, next) => {
    if (!req.user) {
    return res.status(401).json({ msg: "No autorizado: falta usuario en la sesión" });
    }
    if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Acceso denegado: requiere rol admin" });
    }
    next();
};


