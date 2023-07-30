import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import jwt from 'jsonwebtoken'

const store = new ProductStore()

const {
    TOKEN_SECRET,
} = process.env

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.params.id)
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
    }

    try {
        jwt.verify(req.body.token, TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.json(`Invalid token ${err}`)
        return
    }

    try {
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.delete('/products/:id', destroy)
}

export default productRoutes