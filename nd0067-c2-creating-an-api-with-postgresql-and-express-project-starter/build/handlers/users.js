"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = require("./verifyAuthToken");
const store = new user_1.UserStore();
const { TOKEN_SECRET, } = process.env;
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
};
const authenticate = async (req, res) => {
    try {
        const authUser = await store.authenticate(req.body.firstname, req.body.lastname, req.body.password);
        res.json(authUser);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
const userRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.verifyAuthToken, index);
    app.post('/users/authenticate', authenticate);
    app.get('/users/:id', verifyAuthToken_1.verifyAuthToken, show);
    app.post('/users', create);
    app.delete('/users/:id', verifyAuthToken_1.verifyAuthToken, destroy);
};
exports.default = userRoutes;
