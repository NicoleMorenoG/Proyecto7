// backend/src/controllers/productController.js
import Product from "../models/Product.js";

/* Crear producto (admin) */
export const createProduct = async (req, res) => {
    try {
    let { name, description, price, stock, category, images, isActive } = req.body;

    if (!name || price == null) {
        return res.status(400).json({ msg: "name y price son obligatorios" });
    }

    const numPrice = Number(price);
    if (Number.isNaN(numPrice) || numPrice < 0) {
        return res.status(400).json({ msg: "price debe ser un número >= 0" });
    }

    const prod = await Product.create({
        name: String(name).trim(),
        description: description || "",
        price: numPrice,
        stock: stock ?? 0,
        category: category || "general",
        images: images || [],
        isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return res.status(201).json({ msg: "Producto creado", product: prod });
    } catch (err) {
    return res.status(500).json({ msg: "Error al crear producto", error: err.message });
    }
};

/**
 * Listar productos (público) con filtros, paginación y orden
 * GET /api/products
 * Query:
 *  - q: texto (busca en name y description)
 *  - category: string
 *  - min, max: rango de precio
 *  - page (default 1), limit (default 12)
 *  - sort: 'price' | '-price' | 'newest'
 */
export const getProducts = async (req, res) => {
    try {
    const {
        q,
        category,
        min,
        max,
        page = 1,
        limit = 12,
        sort,
    } = req.query;

    // Filtro base
    const filter = { isActive: true };

    // Búsqueda por texto
    if (q) {
        const rx = new RegExp(String(q), "i");
        filter.$or = [{ name: rx }, { description: rx }];
    }

    // Categoría exacta
    if (category) {
        filter.category = String(category);
    }

    // Rango de precios
    if (min != null || max != null) {
        const minNum = min != null ? Number(min) : undefined;
        const maxNum = max != null ? Number(max) : undefined;

        if ((min != null && Number.isNaN(minNum)) || (max != null && Number.isNaN(maxNum))) {
        return res.status(400).json({ msg: "min/max deben ser numéricos" });
        }

        filter.price = {
        ...(min != null ? { $gte: minNum } : {}),
        ...(max != null ? { $lte: maxNum } : {}),
        };
    }

    // Sort
    const sortMap = { price: "price", "-price": "-price", newest: "-createdAt" };
    const sortBy = sortMap[sort] || "-createdAt";

    // Paginación segura
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
        Product.find(filter).sort(sortBy).skip(skip).limit(limitNum),
        Product.countDocuments(filter),
    ]);

    return res.json({
        items,
        pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum) || 1,
        },
    });
    } catch (err) {
    return res.status(500).json({ msg: "Error al listar productos", error: err.message });
    }
};

/* Obtener uno por id (público) */
export const getProductById = async (req, res) => {
    try {
    const prod = await Product.findById(req.params.id);
    if (!prod || prod.isActive === false) {
        return res.status(404).json({ msg: "No encontrado" });
    }
    return res.json(prod);
    } catch (err) {
    return res.status(500).json({ msg: "Error al obtener producto", error: err.message });
    }
};

/* Actualizar (admin) */
export const updateProduct = async (req, res) => {
    try {
    const updates = { ...req.body };

    // Limpieza y validaciones mínimas
    if (updates.name) updates.name = String(updates.name).trim();
    if (updates.price != null) {
        const numPrice = Number(updates.price);
        if (Number.isNaN(numPrice) || numPrice < 0) {
        return res.status(400).json({ msg: "price debe ser un número >= 0" });
        }
        updates.price = numPrice;
    }
    if (updates.isActive != null) {
        updates.isActive = Boolean(updates.isActive);
    }

    const prod = await Product.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
    });

    if (!prod) return res.status(404).json({ msg: "No encontrado" });
    return res.json({ msg: "Actualizado", product: prod });
    } catch (err) {
    return res.status(500).json({ msg: "Error al actualizar", error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
    const prod = await Product.findByIdAndDelete(req.params.id);
    if (!prod) return res.status(404).json({ msg: "No encontrado" });
    return res.json({ msg: "Eliminado" });
    } catch (err) {
    return res.status(500).json({ msg: "Error al eliminar", error: err.message });
    }
};
