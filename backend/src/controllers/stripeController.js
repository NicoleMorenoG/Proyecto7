import Stripe from 'stripe';
import Product from '../models/Product.js';

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
    console.warn('⚠️ Falta STRIPE_SECRET_KEY en .env');
}
const stripe = new Stripe(STRIPE_KEY, { apiVersion: '2024-06-20' }); // api version estable

// POST /api/checkout/stripe/session
// body: { items: [{ productId, qty }], currency?: 'usd'|'clp', successUrl?, cancelUrl? }
export const createStripeCheckoutSession = async (req, res) => {
    try {
    const { items, currency, successUrl, cancelUrl } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ msg: 'items es requerido' });
    }

    // 1) Traer productos de la DB
    const ids = items.map(i => i.productId);
    const dbProducts = await Product.find({ _id: { $in: ids }, isActive: true });

    // 2) Mapear a line_items de Stripe
    const line_items = [];
    for (const it of items) {
        const p = dbProducts.find(x => String(x._id) === String(it.productId));
        if (!p) continue;

        const qty = Math.max(1, Number(it.qty || 1));


        const cur = (currency || 'usd').toLowerCase();

        line_items.push({
        quantity: qty,
        price_data: {
          currency: cur, // 'usd' para pruebas; si quieres CLP: 'clp'
            product_data: {
            name: p.name,
            description: p.description || '',
            },
          unit_amount: Number(p.price) * 100, // convertir a centavos
        },
        });
    }

    if (line_items.length === 0) {
        return res.status(400).json({ msg: 'No se encontraron productos válidos' });
    }

    // 3) URLs de retorno
    const base = process.env.CLIENT_URL || 'http://localhost:5173';
    const success = successUrl || `${base}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancel  = cancelUrl  || `${base}/cancel`;

    // 4) Crear sesión de Checkout
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items,
        success_url: success,
        cancel_url: cancel,
      // extras útiles en pruebas:
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
    });

    return res.status(201).json({
        msg: 'checkout session creada',
        id: session.id,
      url: session.url, // abre esta URL en el navegador
    });
    } catch (err) {
    console.error('Stripe create session error:', err);
    return res.status(500).json({ msg: 'Error creando checkout session', error: err.message });
    }
};

// (Opcional) GET /api/checkout/stripe/session/:id  -> para consultar estado
export const getStripeSession = async (req, res) => {
    try {
    const { id } = req.params;
    const session = await stripe.checkout.sessions.retrieve(id);
    return res.json(session);
    } catch (err) {
    return res.status(500).json({ msg: 'Error obteniendo session', error: err.message });
    }
};
