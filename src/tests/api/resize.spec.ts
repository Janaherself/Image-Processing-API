import supertest from 'supertest';
import app from '../../index.js';

const request = supertest(app);

describe('GET /resize API endpoint', () => {
  it('should return 200 and resized image for valid parameters', async () => {
    const response = await request.get('/resize?path=everest.jpg&width=200&height=300');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/image/);
  });

  it('should return 400 if parameters are missing', async () => {
    const response = await request.get('/resize');
    expect(response.status).toBe(400);
  });

  it('should return 404 if file does not exist', async () => {
    const response = await request.get('/resize?path=noteverest.jpg&width=200&height=200');
    expect(response.status).toBe(404);
  });

  it('should return 400 for invalid dimensions', async () => {
    const response = await request.get('/resize?path=everest.jpg&width=-1&height=0');
    expect(response.status).toBe(400);
  });
});
