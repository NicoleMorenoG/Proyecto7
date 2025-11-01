# 🌸 Proyecto 7 — E-commerce Full Stack: *Wildflower Joyas*

**Stack:**  
🟢 Node.js + Express + MongoDB (Mongoose)  
🟣 React + Vite + TailwindCSS  
💎 JWT + Stripe + Axios  

---

## 🚀 Despliegues

- **🌐 API activa (Render):**  
  👉 [https://proyecto7-5x71.onrender.com](https://proyecto7-5x71.onrender.com)

- **📘 Documentación interactiva (Swagger):**  
  👉 [https://proyecto7-5x71.onrender.com/api/docs](https://proyecto7-5x71.onrender.com/api/docs)

- **💫 Frontend (Netlify):**  
  👉 [https://proyecto7wildflower.netlify.app](https://proyecto7wildflower.netlify.app)

---

## 💡 Funcionalidades principales

✅ Catálogo con buscador  
✅ Detalle de producto  
✅ Carrito (Context API)  
✅ Checkout con Stripe (pasarela funcional)  
✅ Login / Signup (JWT)  
✅ Navbar + Footer persistentes  
✅ Rutas: `Home`, `Products`, `About`, `Cart`, `Login`, `Signup`, `Success`, `Cancel`  
✅ Swagger Documentado  
✅ Deploy Full Stack (Render + Netlify)  

---

## ⚙️ Cómo ejecutar localmente

### 🔧 Requisitos previos
- Node.js v18 o superior  
- MongoDB Atlas (o local)  
- Claves de Stripe (Secret + Public)

---

### 🧩 Backend

```bash
cd backend
npm install
# Editar .env (ver abajo)
```

---

📍 Frontend local:
http://localhost:5173

---

🔑 Variables de entorno
📂 backend/.env

```bash
PORT=4000
MONGODB_URI=<tu cadena de Mongo Atlas>
JWT_SECRET=<tu_secreto_seguro>

# CORS
CLIENT_URL=http://localhost:5173

# Stripe
STRIPE_SECRET_KEY=<sk_live_o_test>
STRIPE_PUBLIC_KEY=<pk_live_o_test>

# (Opcionales)
# MP_ACCESS_TOKEN=
# MP_SUCCESS_URL=
# MP_FAILURE_URL=
# MP_PENDING_URL=

```

---

📂 frontend/.env

```bash
VITE_API_URL=http://localhost:4000/api
VITE_STRIPE_PUBLIC_KEY=<pk_live_o_test>

```

---

📦 En producción:
```bash
VITE_API_URL=https://proyecto7-5x71.onrender.com/api

```

---

## 🧭 Endpoints principales

### 🧍‍♀️ Auth
| Método | Endpoint | Descripción |
|:-------:|:----------|:-------------|
| `POST` | `/api/auth/signup` | Crear usuario |
| `POST` | `/api/auth/login` | Iniciar sesión (retorna JWT) |

---

### 💍 Productos
| Método | Endpoint | Descripción |
|:-------:|:----------|:-------------|
| `GET` | `/api/products` | Listado de productos (permite búsqueda con `?q=`) |
| `GET` | `/api/products/:id` | Detalle de producto individual |

---

### 💳 Checkout (Stripe)
| Método | Endpoint | Descripción |
|:-------:|:----------|:-------------|
| `POST` | `/api/checkout/stripe/session` | Crea sesión de pago en Stripe |

**Body ejemplo:**
```json
[
  { "productId": "662e3e7b9d53b48b50c9d50e", "qty": 1 }
]

```

---
Respuesta:
```json
{
  "id": "cs_test_a1b2c3",
  "url": "https://checkout.stripe.com/pay/cs_test_a1b2c3..."
}

```

---
### 🌱 Otros

| Método | Endpoint | Descripción |
|:-------:|:----------|:-------------|
| `GET` | `/api/health` | Prueba de conexión API |
| `GET` | `/images/:file` | Sirve imágenes estáticas |

---

## 🗂️ Estructura del proyecto

```bash
proyecto7/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   ├── public/images/
│   ├── scripts/seed.mjs
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── utils/
    │   └── main.jsx
    ├── index.css
    └── .env

```

---

## 🧠 Decisiones técnicas

- ⚛️ **React Router + Layout con Outlet:** Navbar y Footer persistentes  
- 🛒 **Context API:** Manejo del carrito sin necesidad de backend  
- 🪄 **Axios centralizado:** en `/api/client.js` para mantener la conexión limpia  
- 💳 **Checkout seguro:** Stripe server-side (evita exponer precios o montos)  
- 🎨 **TailwindCSS:** Diseño rápido con paleta personalizada “koi”  
- 📘 **Swagger:** Documentación interactiva del backend  
- 🧩 **Arquitectura modular:** Controladores, modelos y rutas separadas  

---

## 🧪 Pruebas mínimas

- [x] Catálogo carga correctamente  
- [x] Búsqueda de productos funcional  
- [x] Carrito suma, resta y totaliza  
- [x] Checkout redirige a Stripe  
- [x] Login / Signup guardan token JWT  
- [x] Swagger disponible en `/api/docs`  

---

## 🌍 Despliegue

### 🔹 Backend (Render)

- **Root Directory:** `backend/`  
- **Build Command:** `npm install`  
- **Start Command:** `npm start`  
- **Variables de entorno:** mismas que `backend/.env`  
- **CORS:** `CLIENT_URL` apunta al dominio de Netlify  

---

### 🔹 Frontend (Netlify)

- **Base directory:** `frontend/`  
- **Build command:** `npm run build`  
- **Publish directory:** `frontend/dist`  
- **Variables de entorno:**

  ```env
  VITE_API_URL=https://proyecto7-5x71.onrender.com/api
  VITE_STRIPE_PUBLIC_KEY=<pk_live_o_test>
  
 ```
