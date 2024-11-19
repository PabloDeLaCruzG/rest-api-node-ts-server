import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
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

// CORS
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            console.log(colors.bgGreen.white('Allowed by CORS'));
            callback(null, true);
        } else {
            console.log(colors.bgRed.white('Not allowed by CORS'));
            callback(new Error(colors.bgRed.white('Not allowed by CORS')));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

server.use(cors(corsOptions));

// Read data from forms
server.use(express.json());

// With morgan you can see info about de requests
server.use(morgan('dev'));

server.use('/api/products', router);

// DOCS
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;