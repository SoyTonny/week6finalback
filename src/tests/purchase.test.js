require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')

let TOKEN
let product
let purchase


const BASE_URL_USERS = '/api/v1/users/login'
const BASE_URL = '/api/v1/purchase'


beforeAll(async () => {
    const body = {
        email: "andoy@email.com",
        password: "andy1234"
    }

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(body)

    TOKEN = res.body.token

    product = await Product.create({
        title: 'Tv',
        description: 'tv smart 32 pulgadas',
        price: 1500
    });

    purchase = {
        quantity: 1,
        productId: product.id,
        userId: res.body.id
    };
});

afterAll(async () => {
    await product.destroy()
});

test("POST --> 'BASE_URL' should return 201 and res.body.purchase.userid === purchase.userId", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        // .send(purchase)

        console.log(res.body);
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.userId).toBe(purchase.userId)
});

test("GET --> 'BASE_URL/' should return 200 and res.body..purchase.userid === purchase.userId", async () =>{
    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.userId).toBe(purchase.userId)
});