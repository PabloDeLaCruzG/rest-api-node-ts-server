import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => { 
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);
    });

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'product name',
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
    });

    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'product name',
            price: 'hola'
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);
    });

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'product name',
            price: 100
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('errors');
    });
 })

describe('GET /api/products', () => { 
    it('check if api/products url exists', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
    });

    it('should return all products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).not.toHaveProperty('errors');
    });
 })

 describe('GET /api/products/:id', () => { 
    it('check if url is valid', async () => {
        const response = await request(server).get('/api/products/not-valid-url');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
    });

    it('should return a 404 if product does not exist', async () => {
        const response = await request(server).get('/api/products/4000');
        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toHaveProperty('message');
    });

    it('should return a product by id', async () => {
        const response = await request(server).get('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).not.toHaveProperty('errors');
    });
 })

 describe('PUT /api/products/:id', () => { 
    it('should display validation errors', async () => {
        const response = await request(server).put('/api/products/1').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(5);
        expect(response.body.errors).toBeTruthy();

        expect(response.status).not.toBe(200);
    });

    it('should display validation errors', async () => {
        const response = await request(server).put('/api/products/1')
            .send({
                name: 'product name',
                price: 0,
                availability: true
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors).toBeTruthy();

        expect(response.status).not.toBe(200);
    });
 })

 describe('DELETE /api/products/:id', () => { 
    it('should display validation errors', async () => {
        const response = await request(server).delete('/api/products/4000').send({});
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');

        expect(response.status).not.toBe(200);
    });

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toBe('Product deleted');
    });
 })