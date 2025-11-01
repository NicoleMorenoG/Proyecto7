// backend/src/routes/index.js
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js"; // <-- NUEVA
import productRoutes from "./product.routes.js"; // 👈 nueva import
import mpRoutes from "./mp.routes.js";
import stripeRoutes from './stripe.routes.js';
import orderRoutes from './order.routes.js';

const router = Router();

router.get("/", (_req, res) => {
res.json({ ok: true, msg: "Rutas base funcionando" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes); // <-- NUEVA
router.use("/products", productRoutes); // 👈 monta /api/products
router.use("/checkout/mp", mpRoutes);
router.use('/checkout/stripe', stripeRoutes);
router.use('/orders', orderRoutes);

export default router;

