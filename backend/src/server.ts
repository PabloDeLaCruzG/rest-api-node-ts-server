import colors from 'colors';
import express from 'express';
import router from './router';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';

// Conect to DB
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgGreen.white('Connected to DB'));
    } catch (error) {
        console.log(colors.bgRed.white('Error connecting to DB'));
    }
}

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const server = express();

// Read data from forms
server.use(express.json());

server.use('/api/products', router);

// DOCS
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;