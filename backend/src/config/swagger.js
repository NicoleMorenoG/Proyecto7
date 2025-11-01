// backend/src/config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
    openapi: '3.0.0',
    info: {
        title: 'Nicole Koi E-Commerce API',
        version: '1.0.0',
        description: 'API del Proyecto 7 (productos, auth, checkout, órdenes).',
    },
    servers: [{ url: 'http://localhost:4000/api' }],
    components: {
        securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
        },
    },
    },
  apis: ['./src/routes/*.js'], // escanear anotaciones en rutas
};

export const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
