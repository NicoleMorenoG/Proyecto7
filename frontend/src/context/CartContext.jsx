// src/context/CartContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
    try {
        const raw = localStorage.getItem("cart");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
    });

    const persist = (next) => {
    setItems(next);
    localStorage.setItem("cart", JSON.stringify(next));
    };

    const add = (product, qty = 1) => {
    persist((prev) => {
        const found = prev.find((p) => p.productId === product._id);
        if (found) {
        return prev.map((p) =>
            p.productId === product._id ? { ...p, qty: p.qty + qty } : p
        );
        }
        return [
        ...prev,
        {
            productId: product._id,
            name: product.name,
            price: product.price,
            qty,
        },
        ];
    });
    };

    const remove = (productId) => persist(items.filter((i) => i.productId !== productId));
    const clear = () => persist([]);

    const count = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((a, i) => a + i.price * i.qty, 0), [items]);

    return (
    <CartContext.Provider value={{ items, add, remove, clear, count, total }}>
        {children}
    </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
