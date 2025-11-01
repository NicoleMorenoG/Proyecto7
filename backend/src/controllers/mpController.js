// backend/src/controllers/mpController.js
import { MercadoPagoConfig, Preference } from "mercadopago";
import Product from "../models/Product.js";

const accessToken = process.env.MP_ACCESS_TOKEN;
if (!accessToken) {
    console.warn("⚠️ Falta MP_ACCESS_TOKEN en .env");
}

// Cliente MP v2
const mpClient = accessToken ? new MercadoPagoConfig({ accessToken }) : null;

export const createPreference = async (req, res) => {
    try {
    if (!mpClient) {
        return res.status(500).json({ msg: "Falta MP_ACCESS_TOKEN en .env" });
    }

    // 1) Tomamos/aseguramos las back_urls
    const base = process.env.CLIENT_URL || "http://localhost:5173";
    const successUrl = process.env.MP_SUCCESS_URL || `${base}/mp/success`;
    const failureUrl = process.env.MP_FAILURE_URL || `${base}/mp/failure`;
    const pendingUrl = process.env.MP_PENDING_URL || `${base}/mp/pending`;

    // 👇 Diagnóstico: esto debe imprimir 3 URLs reales
    console.log("MP back_urls =>", { success: successUrl, failure: failureUrl, pending: pendingUrl });

    // 2) Items del body -> buscamos en Mongo y armamos items de MP
    const { items, payer } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ msg: "items es requerido" });
    }

    const ids = items.map(i => i.productId);
    const dbProducts = await Product.find({ _id: { $in: ids }, isActive: true });

    const mpItems = [];
    for (const it of items) {
        const p = dbProducts.find(x => String(x._id) === String(it.productId));
        if (!p) continue;
        mpItems.push({
        id: String(p._id),
        title: p.name,
        description: p.description || "",
        quantity: Math.max(1, Number(it.qty || 1)),
        currency_id: "CLP",
        unit_price: Number(p.price),
        });
    }

    if (mpItems.length === 0) {
        return res.status(400).json({ msg: "No se encontraron productos válidos" });
    }

    // 3) Creamos la preferencia
    const preference = new Preference(mpClient);
    const response = await preference.create({
        body: {
        items: mpItems,
        back_urls: {
            success: successUrl,
            failure: failureUrl,
            pending: pendingUrl,
        },
        auto_return: "approved",
        payer: payer || undefined,
        statement_descriptor: "Nicole Koi",
        },
    });

    return res.status(201).json({
        msg: "preference creada",
        id: response.id,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point || response.init_point,
        items: mpItems,
    });
    } catch (err) {
    console.error("MP createPreference error:", err);
    return res.status(500).json({
        msg: "Error creando preference",
        error: err?.message || String(err),
    });
    }
};
