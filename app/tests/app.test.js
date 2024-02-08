const request = require("supertest");

const app = require("../../server");

//integration tests checking for request and response formats and statuses

describe('get healthz route without payload', () => {
  it('should return 200 OK if the database connection is successful', async () => { 

  // Make a GET request to the /healthz endpoint
  const res = await request(app).get('/healthz');
  // Expect a 200 OK status response
  expect(res.status).toBe(200);
  expect(res.body).toBe("");
  });
});

describe('post healthz route without payload', () => {
  it('should return 405 as only get is allowed', async () => { 

    // Make a post request to the /healthz endpoint
    const res = await request(app).post('/healthz');
    expect(res.status).toBe(405);
    expect(res.body).toBe("");
    
  });
});

describe('put healthz route without payload', () => {
  it('should return 405 as only get is allowed', async () => { 

    // Make a put request to the /healthz endpoint
    const res = await request(app).put('/healthz');
    expect(res.status).toBe(405);
    expect(res.body).toBe("");
    
  });
});

describe('delete healthz route without payload', () => {
  it('should return 405 as only get is allowed', async () => { 

    // Make a delete request to the /healthz endpoint
    const res = await request(app).delete('/healthz');
    expect(res.status).toBe(405);
    expect(res.body).toBe("");
    
  });
});

describe('get healthz route with plaintext payload', () => {
  it('should return 400', async () => { 

    // Make a GET request to the /healthz endpoint but with text payload
    const res = await request(app).get('/healthz').send("asdf").set('Content-Type', 'text/plain');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});

describe('get healthz route with json payload', () => {
  it('should return 400', async () => { 

    // Make a GET request to the /healthz endpoint but with json payload
    const res = await request(app).get('/healthz').send({
      'asf': 'fdsa'
    }).set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});

describe('post healthz route with json payload', () => {
  it('should return 400', async () => { 

    // Make a post request to the /healthz endpoint but with json payload
    const res = await request(app).post('/healthz').send({
      'asf': 'fdsa'
    }).set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});

describe('put healthz route with json payload', () => {
  it('should return 400', async () => { 

    // Make a put request to the /healthz endpoint but with json payload
    const res = await request(app).put('/healthz').send({
      'asf': 'fdsa'
    }).set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});

describe('delete healthz route with json payload', () => {
  it('should return 400', async () => { 

    // Make a delete request to the /healthz endpoint but with json payload
    const res = await request(app).delete('/healthz').send({
      'asf': 'fdsa'
    }).set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});