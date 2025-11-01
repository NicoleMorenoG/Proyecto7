import Stripe from 'stripe';
import Order from '../models/Order.js';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

// POST /api/orders/confirm/stripe?session_id=cs_test_xxx
export const confirmStripeOrder = async (req, res) => {
    try {
    if (!stripe) return res.status(500).json({ msg: 'Falta STRIPE_SECRET_KEY' });

    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ msg: 'session_id es requerido' });

    // ¿Ya existe?
    const exists = await Order.findOne({ providerSessionId: session_id });
    if (exists) return res.json({ msg: 'OK (ya existía)', order: exists });

    // Traer la session y sus items
    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'line_items.data.price.product']
    });

    // Mapear items (unit_amount viene en centavos)
    const items = (session.line_items?.data || []).map(li => ({
        name: li.description || li.price?.product?.name || 'Producto',
        unitPrice: Math.round((li.price?.unit_amount || 0) / 100),
        qty: li.quantity || 1,
        currency: (li.price?.currency || 'usd').toLowerCase(),
      subtotal: Math.round(((li.price?.unit_amount || 0) * (li.quantity || 1)) / 100)
    }));

    const currency = (session.currency || 'usd').toLowerCase();
    const amountSubtotal = Math.round((session.amount_subtotal || 0) / 100);
    const amountTotal = Math.round((session.amount_total || 0) / 100);
    const email = session.customer_details?.email || session.customer_email || null;
    const paymentStatus = session.payment_status || 'unpaid';

    const order = await Order.create({
      user: req.user?._id || undefined, // si estabas logueada y usamos protect
        email,
        items,
        amountSubtotal,
        amountTotal,
        currency,
        provider: 'stripe',
        providerSessionId: session.id,
        paymentStatus,
        status: paymentStatus === 'paid' ? 'paid' : 'created'
    });

    return res.status(201).json({ msg: 'Orden creada', order });
    } catch (err) {
    console.error('confirmStripeOrder error:', err);
    return res.status(500).json({ msg: 'Error confirmando orden', error: err.message });
    }
};

// GET /api/orders/my
export const myOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ orders });
};

// GET /api/orders/:id  (dueña o admin)
export const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'No encontrada' });
    const isOwner = req.user && order.user?.toString() === req.user._id.toString();
    if (!isOwner && req.user?.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
    return res.json({ order });
};

// (Opcional admin) GET /api/orders
export const listOrders = async (_req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json({ orders });
};
