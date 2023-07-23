import express, { Request, Response } from 'express'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const UserStore = require('../models/user')

const store = new UserStore()

dotenv.config()

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
    try {
        const newUser = await store.create(user);
        var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET);
        res.json(token);
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
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
    app.post('/users', index);
    app.get("/users/authenticate", authenticate);
    app.get('/users/:id', show);
    app.get('/users', create);
    app.get('/users', destroy);
}

export default user_routes;