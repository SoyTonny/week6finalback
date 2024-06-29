const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerCart = express.Router();

routerCart.route('/')
    .get(verifyJwt, getAll)
    .post(verifyJwt, create);

routerCart.route('/:id')
    .get(verifyJwt, getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerCart;