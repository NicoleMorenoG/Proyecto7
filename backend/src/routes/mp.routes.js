// backend/src/routes/mp.routes.js
import { Router } from "express";
import { createPreference } from "../controllers/mpController.js";

const router = Router();

// ✅ Crear preferencia de Mercado Pago (sin necesidad de login)
router.post("/preference", createPreference);

export default router;
