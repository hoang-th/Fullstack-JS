"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyAuthToken_1 = require("./verifyAuthToken");
const store = new order_1.OrderStore();
const { TOKEN_SECRET, } = process.env;
const index = async (_req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const show = async (req, res) => {
    const order = await store.show(req.params.id);
    res.json(order);
};
const create = async (req, res) => {
    const order = {
        user_id: req.body.user_id,
        status: req.body.status
    };
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const addProduct = async (_req, res) => {
    const orderId = _req.params.id;
    const productId = _req.body.productId;
    const quantity = _req.body.quantity;
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', verifyAuthToken_1.verifyAuthToken, create);
    app.delete('/orders/:id', verifyAuthToken_1.verifyAuthToken, destroy);
    app.post('/orders/:id/products', verifyAuthToken_1.verifyAuthToken, addProduct);
};
exports.default = orderRoutes;
