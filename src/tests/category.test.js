const request = require('supertest')
const app = require('../app')

let TOKEN
let categoryId

const BASE_URL_USERS = '/api/v1/users/login'
const BASE_URL = '/api/v1/categories'

beforeAll(async () => {
    const body = {
        email: "andoy@email.com",
        password: "andy1234"
    }

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(body)

    TOKEN = res.body.token
});

test('POST --> "BASE_URL" should status code 201, res.body.name === category.name ', async () => {
    const category = {
        name: "Tv"
    }

    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(category)

    categoryId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test("GET --> 'BASE_URL' should status code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test('DELETE => BASE_URL/:id should return statusCode 204', async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
});