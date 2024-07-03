require('../models')
const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')
const ProductImg = require('../models/ProductImg')
const Product = require('../models/Product')

let TOKEN
let category
let productId
let product
let productImage

const BASE_URL_USERS = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'



beforeAll(async () => {
    const body = {
        email: "andoy@email.com",
        password: "andy1234"
    };

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(body)

    TOKEN = res.body.token

    category = await Category.create({
        name: "SmartPhone"
    })

    product = {
        title: "Phone",
        description: "lorem1",
        price: 100,
        categoryId: category.id
    }
});

afterAll(async () => {
    await category.destroy()
    await productImage.destroy()
})

test("POST --> 'BASE_URL' should return status code 201, res.body.title === product.title and res.body.categoryId === category.id", async () => {


    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(product)

    productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
    expect(res.body.categoryId).toBe(category.id)
});

test("GET ---> 'BASE_URL' should return status code 200, res.boby.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET ----> 'BASE_URL/:id' should return status code 200, res.body.title === product.title", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${productId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
});

test("PUT --> 'BASE_URL/:id', should return status code 200, res.body.tittle === productUpdate.title", async () => {
    const productUpdate = {
        title: "loremUpdate",
        description: "loremUpdate",
        price: 200
    }

    const res = await request(app)
        .put(`${BASE_URL}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(productUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(productUpdate.title)
});

test("POST --> 'BASE_URL/:id//images' should return status code 200 and res.body.length = 1", async () => {

    productImage = await ProductImg.create({
        url: 'lorem',
        filename: 'lorem'
    });

    const res = await request(app)
        .post(`${BASE_URL}/${productId}/images`)
        .send([productImage.id])
        .set('Authorization', `Bearer ${TOKEN}` )

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()

    expect(res.body[0].productId).toBeDefined()
    expect(res.body[0].productId).toBe(productImage.id)
});

test("DELETE --> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
});