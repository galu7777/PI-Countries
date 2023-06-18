const router = require('../src/routes/index.js');
const request = require('supertest');

describe('Pruba de Status de ruta', () => {
    test('la ruta deberia responder con status 200', async () => {
        const response = await request(router).get('/acti')
        expect(response.statusCode).send(200)
    })
})
