import request from 'supertest';
import app from '../app.js'; // your Express app
import {closePool} from '../utils/database.js';

afterAll(async () => {
  await closePool();
});

console.log('running tests...');

describe('test cat endpoints', () => {
  /*it('should create cat', async () => {
    const res = await request(app)
      .get('/api/v1/cats')
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });*/

  it('should return a list of cats', async () => {
    const res = await request(app)
      .get('/api/v1/cats')
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should return a cat by id', async () => {
    const res = await request(app)
      .get('/api/v1/cats/1')
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toBeDefined();
  });

  // update cat

  // remove cat

  /*it('should delete cat by id', async () => {
    const res = await request(app)
      .get('/api/v1/cats/1')
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(404);
  });*/

  // get all cats again (should not exist in the list)

  // get cat by id (should not exist)
});

describe('Test User endpoints', () => {
  // test fails as user-router is missing validation and returns wrong error code
  // test with wrong data
  describe('POST /api/v1/users', () => {
    it('should fail to create a new user', async () => {
      const newUser = {
        name: 'Test User',
        //username: 'testuser',
        email: 'testuser@example.com',
        role: 'user',
        password: 'password123',
      };
      const res = await request(app)
        .post('/api/v1/users')
        .send(newUser)
        .set('Accept', 'application/json');
      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@example.com',
        role: 'user',
        password: 'password123',
      };
      const res = await request(app)
        .post('/api/v1/users')
        .send(newUser)
        .set('Accept', 'application/json');
      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result.user_id).toBeDefined();
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return a list of users', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
});

describe('Test Authentication endpoints', () => {
  let token;
  describe('POST /api/v1/auth/login', () => {
    it('should login a user and return a token', async () => {
      const user = {
        username: 'testuser',
        password: 'password123',
      };
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .set('Accept', 'application/json');
      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.token).toBeDefined();
      token = res.body.token;
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return user details based on token auth', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');
      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
    });
  });

  // add user deletion at the end of script (so database does not fill up with test data)
});
