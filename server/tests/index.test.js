const request = require('supertest');
const express = require('express');

const router = require('../src/routes/index');

const app = express();
app.use('/', router);

describe('Routes', () => {
  test('GET / should return status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  test('GET /acti should return status 200', async () => {
    const response = await request(app).get('/acti');
    expect(response.status).toBe(200);
  });

  test('GET /:id should return status 200', async () => {
    const response = await request(app).get('/123');
    expect(response.status).toBe(200);
  });
});
