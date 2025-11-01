// backend/src/routes/user.routes.js
import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getMe, updateMe } from "../controllers/userController.js";

const router = Router();

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Devuelve el perfil del usuario autenticado
 *       401:
 *         description: No autorizado (sin token o token inválido)
 */
router.get("/me", protect, getMe);

/**
 * @openapi
 * /users/me:
 *   put:
 *     summary: Actualizar datos del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 */
router.put("/me", protect, updateMe);

export default router;

