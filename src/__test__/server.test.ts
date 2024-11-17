import request from 'supertest';
import server, { connectDB } from '../server';
import db from '../config/db';


describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.msg).toBe('Desde API');
    });
});

jest.mock('../config/db');

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValue(new Error('Database connection error'));
        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error connecting to DB'));
    });
});