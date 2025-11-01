// backend/scripts/seed.mjs
import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../src/models/Product.js';

const productos = [
    {
    name: 'Collar Perlas Margaritas Nácar',
    description: 'Collar perlas naturales con flores de nácar y terminaciones de plata 925.',
    price: 35,
    stock: 10,
    category: 'collares',
    images: ['/images/collar-perlas-plata-margaritas-nacar.jpg']
    },
    {
    name: 'Collar Perlas Barrocas',
    description: 'Collar perlas barrocas naturales con cierre de plata 925.',
    price: 68,
    stock: 5,
    category: 'collares',
    images: ['/images/collar-perlas-barrocas-plata.jpg']
    },
    {
    name: 'Collar Perlas & Nácar Conchitas',
    description: 'Collar de perlas naturales combinadas con figuras de nácar y detalles de plata 925.',
    price: 45,
    stock: 8,
    category: 'collares',
    images: ['/images/collar-perlas-conchitas-nacar-plata.png']
    },
    {
    name: 'Cadena Luna y Sol Piedra Aura',
    description: 'Cadena plata 925 con colgante de luna y sol, piedra aura',
    price: 29,
    stock: 20,
    category: 'cadenas',
    images: ['/images/cadena-luna-sol-cuarzo-aura-plata.jpg']
    },
    {
    name: 'Cadena Luna Estrellada & Piedra Aura',
    description: 'Cadena plata 925 con colgante de luna estrellada, piedra aura.',
    price: 29,
    stock: 15,
    category: 'cadenas',
    images: ['/images/cadena-luna-circones-cuarzo-aura-estrellitas-plata.jpg']
    },
    {
    name: 'Cadena Sol Cuarzo Rosa',
    description: 'Cadena plata 925 con colgante de sol, cuarzo rosa.',
    price: 24,
    stock: 9,
    category: 'cadenas',
    images: ['/images/cadena-sol-cuarzo-rosa-plata.jpg']
    },
    {
    name: 'Pulsera Nácar & Perlas',
    description: 'Pulsera con perlas, conchitas de nácar y detalles de plata 925.',
    price: 29,
    stock: 14,
    category: 'pulseras',
    images: ['/images/pulsera-nacar-perlas.png']
    },
    {
    name: 'Pulsera Luna Circones & Ópalo Amarillo',
    description: 'Pulsera con dije de luna con circones y ópalo amarillo, en plata 925.',
    price: 45,
    stock: 25,
    category: 'pulseras',
    images: ['/images/pulsera-plata-opalo-amarillo-luna-circones.jpg']
    },
    {
    name: 'Pulsera Cristales & Perla Barroca',
    description: 'Pulsera con cristales facetados y perla barroca natural, en plata 925.',
    price: 29,
    stock: 7,
    category: 'pulseras',
    images: ['/images/pulsera-cristales-plata-perla-barroca.jpg']
    },
    {
    name: 'Aros Mariposas Circones',
    description: 'Aros de plata 925 con diseño de mariposas y circones blancos.',
    price: 17,
    stock: 11,
    category: 'aros',
    images: ['/images/aros-mariposas-circones-plata.jpg']
    },
    {
    name: 'Aros Golondrinas',
    description: 'Aros de plata 925 con diseño de golondrinas.',
    price: 14,
    stock: 6,
    category: 'aros',
    images: ['/images/aros-golondrinas-plata.jpg']
    },
    {
    name: 'Aros Argollas Perlas Barrocas & Nácar',
    description: 'Aros argollas de plata 925 con perlas barrocas naturales y detalles de nácar.',
    price: 45,
    stock: 4,
    category: 'aros',
    images: ['/images/aros-perlas-nacar-argollas-conchitas.png']
    }
];

async function run() {
    try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('Falta MONGODB_URI en .env');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000, family: 4 });

    await Product.deleteMany({});
    const inserted = await Product.insertMany(productos);
    console.log(`✅ Seed OK: ${inserted.length} productos cargados`);
    } catch (err) {
    console.error('❌ Seed error:', err.message);
    } finally {
    await mongoose.disconnect();
    process.exit(0);
    }
}
run();
