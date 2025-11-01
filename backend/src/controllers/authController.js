// backend/src/controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Helper: generar token JWT */
const generarToken = (user) => {
    if (!process.env.JWT_SECRET) {
    throw new Error("Falta JWT_SECRET en .env");
    }
    return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
    );
};

/* -------- Registro -------- */
export const signup = async (req, res) => {
    try {
    let { name, email, password } = req.body || {};

    // Validaciones básicas
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Normalizar email
    email = String(email).trim().toLowerCase();

    // ¿Ya existe?
    const existe = await User.findOne({ email });
    if (existe) {
        return res.status(409).json({ msg: "El correo ya está registrado" });
    }

    // Crear usuario (el hash se hace en el pre-save del modelo)
    const nuevo = await User.create({ name: String(name).trim(), email, password });

    const token = generarToken(nuevo);

    return res.status(201).json({
        msg: "Usuario creado correctamente",
        user: { id: nuevo._id, name: nuevo.name, email: nuevo.email, role: nuevo.role },
        token,
    });
    } catch (err) {
    return res.status(500).json({ msg: "Error al registrar usuario", error: err.message });
    }
};

/* -------- Login -------- */
export const login = async (req, res) => {
    try {
    let { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ msg: "Faltan datos" });
    }

    // Normalizar email
    email = String(email).trim().toLowerCase();

    // Traer usuario con password explícito
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const check =
        typeof user.matchPassword === "function"
        ? user.matchPassword.bind(user)
        : typeof user.comparePassword === "function"
        ? user.comparePassword.bind(user)
        : null;

    if (!check) {
      // Fallback de seguridad por si el modelo no define método
        return res
        .status(500)
        .json({ msg: "El modelo de usuario no define método de comparación de contraseña" });
    }

    const esValida = await check(password);
    if (!esValida) {
        return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    const token = generarToken(user);

    return res.json({
        msg: "Login correcto",
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        token,
    });
    } catch (err) {
    return res.status(500).json({ msg: "Error al iniciar sesión", error: err.message });
    }
};
