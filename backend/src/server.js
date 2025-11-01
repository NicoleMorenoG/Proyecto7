import 'dotenv/config';
import dns from 'dns';
import { setDefaultResultOrder } from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); // fuerza DNS estables (solo este proceso)
setDefaultResultOrder('ipv4first'); // fuerza IPv4 en este proceso

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { setupSwagger } from './config/swagger.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const allowed = [process.env.CLIENT_URL || 'http://localhost:5173'];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Middlewares
app.use(cors({
    origin: (origin, cb) => {
    if (!origin) return cb(null, true);            // ← permite pings/health checks
    if (allowed.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

setupSwagger(app);
console.log('📘 Swagger disponible en: http://localhost:4000/api/docs');

// 🔹 Ruta de salud (para probar que el backend responde)
app.get('/api/health', (_req, res) => res.json({ ok: true, msg: 'API viva' }));

// 🔹 Router principal
app.use('/api', routes);

app.use("/images", express.static(path.join(__dirname, "public", "images")));

const PORT = process.env.PORT || 4000;

// 🔹 Arranque del servidor
const start = async () => {
    try {
    console.log('🔌 Intentando conectar a MongoDB con URI:', process.env.MONGODB_URI ? 'OK (oculta)' : 'FALTA');
    await connectDB();
    console.log('🗄️ MongoDB conectado con éxito');
    } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err?.message || err);
    } finally {
    app.listen(PORT, () => {
        console.log(`✅ Backend escuchando en puerto ${PORT}`);
        console.log(`👉 Prueba: http://localhost:${PORT}/api/health`);
    });
    }
};

start();

