import colors from 'colors';
import express from 'express';
import router from './router';
import db from './config/db';

afterAll(async () => {
    await db.close(); // Cierra la conexión
});

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

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const server = express();

// Read data from forms
server.use(express.json());

server.use('/api/products', router);

server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' });
});

export default server;