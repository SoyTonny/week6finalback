const request = require('supertest')
const app = require('../app')
const path = require('path')

const BASE_URL='/api/v1/product_images'
const BASE_URL_LOGIN = '/api/v1/users/login'
let TOKEN, imageId


beforeAll(async()=>{
    const body = {
        email: "andoy@email.com",
        password: "andy1234"
    }
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(body)

    TOKEN = res.body.token

})

test('POST => BASE_URL should return statusCode 201, and res.body.filename and res.boby.url to be defined', async() => {

    const localImage = path.join(__dirname, 'createData', 'imgtest.jpeg')

    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        .attach('image', localImage)

    imageId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.url).toBeDefined()
    expect(res.body.filename).toBeDefined()

})

test('DELETE => BASE_URL should return status 204', async() => {

    const res = await request(app)
        .delete(`${BASE_URL}/${ imageId }`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
});