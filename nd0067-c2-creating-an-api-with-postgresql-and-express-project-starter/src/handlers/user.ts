import express, { Request, Response } from 'express'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const UserStore = require('../models/user')

const store = new UserStore()

dotenv.config();

const {
    TOKEN_SECRET,
} = process.env

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id);
    res.json(user);
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password_digest: req.body.password_digest,
    }
    console.log("create function")
    try {
        const newUser = await store.create(user);
        var token = jwt.sign({user: newUser}, TOKEN_SECRET!);
        res.json(token);
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.params.id)
        res.json(deleted)
    } catch(err) {
        res.status(400).send(`error type is ${err}`);
    }
}

const authenticate = async(req: Request, res: Response) => {
    try {
      const authUser = await store.authenticate(req.body.username, req.body.password_digest);
      res.json(authUser);
    } catch(err) {
      res.status(401).json(err)
   }
}

const user_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get("/users/authenticate", authenticate);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users/:id', destroy);
}

export default user_routes;