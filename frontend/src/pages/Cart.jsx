// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { createStripeSession } from "../api/checkout";

export default function Cart() {
    const { items, remove, clear, total } = useCart();

    const handlePay = async () => {
    try {
      // Armamos el payload que espera el backend: [{ productId, qty }]
        const payload = items.map((i) => ({
        productId: i.productId,
        qty: i.qty,
    }));

      const session = await createStripeSession(payload); // { url, id }
        if (session?.url) {
        // Redirige al checkout de Stripe
        window.location = session.url;
        } else {
        alert("No se pudo crear la sesión de pago.");
        }
    } catch (e) {
        console.error(e);
        alert("Error creando la sesión de pago.");
    }
    };

    if (!items.length) return <div style={{ padding: 16 }}>Tu carrito está vacío.</div>;

    return (
    <div style={{ padding: 16 }}>
        <h1>Carrito</h1>

        <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((i) => (
            <li
            key={i.productId}
            style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
            }}
            >
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{i.name}</div>
                <div style={{ color: "#666" }}>
                ${i.price?.toLocaleString?.("es-CL")} × {i.qty}
                </div>
            </div>

            <button
                onClick={() => remove(i.productId)}
                style={{
                padding: "6px 10px",
                border: "1px solid #ddd",
                borderRadius: 8,
                cursor: "pointer",
                }}
            >
                Quitar
            </button>
            </li>
        ))}
        </ul>

        <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 16,
            alignItems: "center",
        }}
        >
        <div style={{ fontWeight: 700 }}>
        Total: ${total.toLocaleString?.("es-CL")}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
        <button
            onClick={clear}
            style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
            cursor: "pointer",
            background: "white",
            }}
            >
            Vaciar
            </button>

            <button
            onClick={handlePay}
            style={{
                padding: "8px 12px",
                border: "1px solid #222",
                background: "#111",
                color: "#fff",
                borderRadius: 8,
                cursor: "pointer",
            }}
            >
            Pagar con Stripe
            </button>
        </div>
        </div>
    </div>
    );
}

