import colors from 'colors';
import express from 'express';
import router from './router';
import db from './config/db';


// Conect to DB
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgGreen.white('Connected to DB'));
    } catch (error) {
        console.log(colors.bgRed.white(`Error connecting to DB: ${error}`));
    }
}

connectDB();

const server = express();

server.use('/api/products', router)

export default server;