// backend/src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    category: { type: String, default: "general", index: true },
    images: [{ type: String }], // URLs (luego las cargamos desde el front)
    isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
