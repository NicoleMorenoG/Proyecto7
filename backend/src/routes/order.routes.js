import { Router } from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import {
    confirmStripeOrder,
    myOrders,
    getOrder,
    listOrders
} from '../controllers/orderController.js';

const router = Router();

/**
 * CONFIRMAR / CREAR ORDEN (Stripe Checkout)
 * - Puedes descomentar `protect` si quieres que requiera login.
 */
router.post('/confirm/stripe', /* protect, */ confirmStripeOrder);

/**
 * VER MIS ÓRDENES (privado)
 * - Requiere estar logueado.
 */
router.get('/my', protect, myOrders);

/**
 * VER UNA ORDEN ESPECÍFICA
 * - Privado: solo la dueña o el admin pueden verla.
 */
router.get('/:id', protect, getOrder);

/**
 * LISTADO DE ÓRDENES (solo admin)
 */
router.get('/', protect, isAdmin, listOrders);

export default router;
