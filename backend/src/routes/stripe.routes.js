// backend/src/routes/stripe.routes.js
import { Router } from "express";
import {
    createStripeCheckoutSession,
    getStripeSession,
} from "../controllers/stripeController.js";
// import { protect } from "../middleware/auth.js"; // opcional si quieres exigir login

const router = Router();

/**
 * @openapi
 * /checkout/stripe/session:
 *   post:
 *     summary: Crear una Stripe Checkout Session (modo test)
 *     tags: [Checkout - Stripe]
 *     description: Crea una sesión de pago en Stripe a partir del carrito. Devuelve la URL para redirigir al checkout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 description: Lista de ítems del carrito
 *                 items:
 *                   type: object
 *                   required: [productId, qty]
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID de producto en MongoDB
 *                     qty:
 *                       type: integer
 *                       minimum: 1
 *               payer:
 *                 type: object
 *                 description: (Opcional) Datos del pagador
 *                 properties:
 *                   name: { type: string }
 *                   email: { type: string }
 *     responses:
 *       201:
 *         description: Sesión creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string, description: "ID de la sesión (cs_test_...)" }
 *                 url: { type: string, description: "URL del checkout para redirigir" }
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error creando la sesión
 */
router.post("/session", /* protect, */ createStripeCheckoutSession);

/**
 * @openapi
 * /checkout/stripe/session/{id}:
 *   get:
 *     summary: Obtener detalles de una Stripe Checkout Session
 *     tags: [Checkout - Stripe]
 *     description: Recupera una sesión de Stripe por su ID (ej. `cs_test_...`) para depurar/confirmar datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID de la sesión devuelto por Stripe
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: No encontrada
 *       500:
 *         description: Error al obtener la sesión
 */
router.get("/session/:id", /* protect, */ getStripeSession);

export default router;
