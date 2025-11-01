import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Success() {
    const { clear } = useCart();

    useEffect(() => {
    // al volver de Stripe, deja el carrito limpio
    clear();
    }, [clear]);

    return (
    <div style={{ padding: 16 }}>
        <h1>🎉 ¡Pago realizado con éxito!</h1>
        <p>Gracias por tu compra. Te llegará un correo con el comprobante.</p>
        <a href="/" style={{ display: "inline-block", marginTop: 12 }}>Volver a la tienda</a>
    </div>
    );
}
