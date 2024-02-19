const request = require("supertest");

const app = require("../../server");

//integration tests checking for request and response formats and statuses

describe('A01- get healthz route without payload', () => {
  it('should return 200 OK if the database connection is successful', async () => { 

  // Make a GET request to the /healthz endpoint
  const res = await request(app).get('/healthz');
  // Expect a 200 OK status response
  expect(res.status).toBe(200);
  expect(res.body).toBe("");
  });
});

describe('A01- post healthz route without payload', () => {
  it('should return 405 as only get is allowed', async () => { 

    // Make a post request to the /healthz endpoint
    const res = await request(app).post('/healthz');
    expect(res.status).toBe(405);
    expect(res.body).toBe("");
    
  });
});

describe('A01- put healthz route without payload', () => {
  it('should return 405 as only get is allowed', async () => { 

    // Make a put request to the /healthz endpoint
    const res = await request(app).put('/healthz');
    expect(res.status).toBe(405);
    expect(res.body).toBe("");
    
  });
});

describe('A01- delete healthz route without payload', () => {
  it('should return 405 as only get is allowed', async () => { 

    // Make a delete request to the /healthz endpoint
    const res = await request(app).delete('/healthz');
    expect(res.status).toBe(405);
    expect(res.body).toBe("");
    
  });
});

describe('A01- get healthz route with plaintext payload', () => {
  it('should return 400', async () => { 

    // Make a GET request to the /healthz endpoint but with text payload
    const res = await request(app).get('/healthz').send("asdf").set('Content-Type', 'text/plain');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});

describe('A01- get healthz route with json payload', () => {
  it('should return 400', async () => { 

    // Make a GET request to the /healthz endpoint but with json payload
    const res = await request(app).get('/healthz').send({
      'asf': 'fdsa'
    }).set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});

describe('A01- post healthz route with json payload', () => {
  it('should return 400', async () => { 

    // Make a post request to the /healthz endpoint but with json payload
    const res = await request(app).post('/healthz').send({
      'asf': 'fdsa'
    }).set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});

describe('A01- put healthz route with json payload', () => {
  it('should return 400', async () => { 

    // Make a put request to the /healthz endpoint but with json payload
    const res = await request(app).put('/healthz').send({
      'asf': 'fdsa'
    }).set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});

describe('A01- delete healthz route with json payload', () => {
  it('should return 400', async () => { 

    // Make a delete request to the /healthz endpoint but with json payload
    const res = await request(app).delete('/healthz').send({
      'asf': 'fdsa'
    }).set('Content-Type', 'application/json');
    expect(res.status).toBe(400);
    expect(res.body).toBe("");
  });
});

describe('A03- Create an account', () => {
  it('should validate that account exists using the GET call', async () => { 

    // Make a post request to the /v1/user endpoint to create new user
    const res = await request(app).post('/v1/user').send({
      "first_name": "Anuraag",
      "last_name": "Bathula",
      "password": "AnuraagPWD",
      "username": "anuraag@example.com"
    }).set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body.first_name).toEqual("Anuraag");
    expect(res.body.last_name).toEqual("Bathula");
    expect(res.body.id).not.toBe("");
    expect(res.body.account_created).not.toBe("");
    expect(res.body.account_updated).not.toBe("");

    // Make a get request to the /v1/user endpoint to verify user
    const res1 = await request(app).get('/v1/user')
    .auth('anuraag@example.com', 'AnuraagPWD')
    .set('Content-Type', 'application/json');

    expect(res1.status).toBe(200);
    expect(res1.body.first_name).toEqual(res.body.first_name);
    expect(res1.body.last_name).toEqual(res.body.last_name);
    expect(res1.body.id).toEqual(res.body.id);
    expect(res1.body.account_created).toEqual(res.body.account_created);
    expect(res1.body.account_updated).toEqual(res.body.account_updated);
  });
});

describe('A03- Update the account', () => {
  it('should validate that account was updated using the GET call', async () => { 

    // Make a put request to the /v1/user endpoint to update user
    const res = await request(app).put('/v1/user')
    .auth('anuraag@example.com', 'AnuraagPWD')
    .send({
      "first_name": "AnuraagMOD",
      "last_name": "BathulaMOD",
      "password": "AnuraagPWDMOD"
    }).set('Content-Type', 'application/json');

    expect(res.status).toBe(204);

    // Make a get request to the /v1/user endpoint to verify user
    const res1 = await request(app).get('/v1/user')
    .auth('anuraag@example.com', 'AnuraagPWDMOD')
    .set('Content-Type', 'application/json');

    expect(res1.status).toBe(200);
    expect(res1.body.first_name).toEqual("AnuraagMOD");
    expect(res1.body.last_name).toEqual("BathulaMOD");
  });
});

describe('A04- Test failure', () => {
  it('test failure', async () => { 

    expect(true).toEqual(false);
  });
});
