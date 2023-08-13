import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import { verifyAuthToken } from './verifyAuthToken';

const store = new OrderStore();

const {
    TOKEN_SECRET,
} = process.env

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.params.id)
        res.json(order)
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        user_id: req.body.user_id,
        status: req.body.status
    }

    try {
        const newOrder = await store.create(order)
        res.json(newOrder)
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
        res.status(400).json(err)
    }
}

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = _req.body.quantity
  
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', verifyAuthToken, create)
    app.delete('/orders/:id', verifyAuthToken, destroy)
    app.post('/orders/:id/products', verifyAuthToken, addProduct)
}

export default orderRoutes