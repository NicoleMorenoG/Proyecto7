// backend/src/routes/product.routes.js
import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Listar productos (público) con filtros, paginación y orden
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Búsqueda por nombre/descr (insensible a mayúsculas)
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: min
 *         schema: { type: number }
 *         description: Precio mínimo
 *       - in: query
 *         name: max
 *         schema: { type: number }
 *         description: Precio máximo
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 12 }
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price, -price, newest]
 *         description: price=asc, -price=desc, newest=nuevos primero
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", getProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Obtener producto por ID (público)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: No encontrado
 */
router.get("/:id", getProductById);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Crear producto (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               stock: { type: integer }
 *               category: { type: string }
 *               images:
 *                 type: array
 *                 items: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       201:
 *         description: Creado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Requiere admin
 */
router.post("/", protect, isAdmin, createProduct);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Actualizar producto (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Actualizado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Requiere admin
 *       404:
 *         description: No encontrado
 */
router.put("/:id", protect, isAdmin, updateProduct);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Eliminar producto (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Eliminado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Requiere admin
 *       404:
 *         description: No encontrado
 */
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
