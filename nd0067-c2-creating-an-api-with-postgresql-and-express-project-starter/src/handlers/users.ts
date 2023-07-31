import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import dotenv  from 'dotenv'

const store = new UserStore();

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
    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        }

        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string)
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
        const authUser = await store.authenticate(req.body.firstName, req.body.lastName, req.body.password);
        res.json(authUser);
    } catch(err) {
        res.status(401).json(err)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.post('/users/authenticate', authenticate);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users/:id', destroy);
}

export default userRoutes;