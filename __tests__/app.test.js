const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app');

const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('API Endpoints', () => {
  describe('GET: /api/ - Health Check', () => {
    it('should respond with a 200 status code', () => {
      return request(app).get('/api/').expect(200);
    });

    it('should respond with an "API Healthy" message', async () => {
      const res = await request(app).get('/api/').expect(200);
      expect(res.body.message).toBe('API Healthy');
    });
  });
});
