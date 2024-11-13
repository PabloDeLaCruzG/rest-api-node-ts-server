import express from 'express';
import router from './router';
import db from './config/db';

// Conect to DB
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log('Connected to DB');
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }
}

connectDB();

const server = express();

server.use('/api/products', router)

export default server;