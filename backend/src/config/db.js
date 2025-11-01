import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('❌ Falta MONGODB_URI en el archivo .env');

  try {
    // Configuración para evitar cuelgues indefinidos y forzar IPv4
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // corta si no responde en 10s
      family: 4, // fuerza IPv4 (evita conflictos con IPv6)
    });

    console.log('🗄️ Conexión a MongoDB iniciada correctamente');
  } catch (error) {
    console.error('📛 Error conectando a MongoDB:', error.message);
    throw error; // lanza el error para que el server.js lo capture
  }

  const { connection } = mongoose;
  connection.on('connected', () => console.log('✅ MongoDB conectado'));
  connection.on('disconnected', () => console.warn('⚠️ MongoDB desconectado'));
  connection.on('error', (err) => console.error('❌ Error MongoDB:', err.message));
};

