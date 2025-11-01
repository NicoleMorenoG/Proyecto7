import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // opcional si guardas referencia
    name: { type: String, required: true },
  unitPrice: { type: Number, required: true }, 
    qty: { type: Number, required: true, min: 1 },
    currency: { type: String, default: 'usd' },
    subtotal: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  email: { type: String }, 
    items: { type: [orderItemSchema], required: true },
    amountSubtotal: { type: Number, required: true },
    amountTotal: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    provider: { type: String, enum: ['stripe', 'mp'], default: 'stripe' },
  providerSessionId: { type: String, index: true }, 
    paymentStatus: { type: String, enum: ['pending', 'paid', 'unpaid', 'canceled'], default: 'pending' },
    status: { type: String, enum: ['created', 'paid', 'canceled'], default: 'created' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
