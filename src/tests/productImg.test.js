const request = require('supertest')
const app = require('../app')
const path = require('path')

let TOKEN

const BASE_URL = '/api/v1/product_images'
const BASE_URL_USERS = '/api/v1/users/login'

beforeAll(async () => {
    const body = {
        email: "andoy@email.com",
        password: "andy1234"
    };

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(body)

    TOKEN = res.body.token
});

test(' should first', () => { second })


test('POST --> "BASE_URL" should status code 201 and res.body.url, res.body.filename to be Defined ', async () => {

    const localImage = path.join(__dirname, 'createData', 'test.jpg')

  const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send('image', localImage)

    expect(res.statusCode).toBe(201)
    expect(res.body.url).toBeDefined()
    expect(res.body.filename).toBeDefined()
});


test("Delete --> 'BASE_URL'first", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/1`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
});
