export default function Cancel() {
    return (
    <div style={{ padding: 16 }}>
        <h1>⚠️ Pago cancelado</h1>
        <p>No te preocupes, puedes intentarlo otra vez cuando quieras.</p>
        <a href="/cart" style={{ display: "inline-block", marginTop: 12 }}>Volver al carrito</a>
    </div>
    );
}
