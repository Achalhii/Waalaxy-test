import request from 'supertest';
import { app, closeServer } from '../index';

describe('Test app', () => {
  afterAll(async () => {
    closeServer();
  });

  describe('POST /add-to-queue', () => {
    it('should add an action to the queue', async () => {
      const res = await request(app)
        .post('/add-to-queue')
        .send({ name: 'A' });
      expect(res.status).toBe(200);
    });

    it('should return 402 for bad request', async () => {
      const res = await request(app)
        .post('/add-to-queue')
        .send({ name: 123 }); // Sending a non-string value
      expect(res.status).toBe(402);
    });

    it('should return 404 for action not found', async () => {
      const res = await request(app)
        .post('/add-to-queue')
        .send({ name: 'D' }); // Assuming 'D' is not in the available actions
      expect(res.status).toBe(404);
    });
  });

  describe('GET /queue', () => {
    it('should get the current queue', async () => {
      const res = await request(app).get('/queue');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('queue');
    });
  });
});
