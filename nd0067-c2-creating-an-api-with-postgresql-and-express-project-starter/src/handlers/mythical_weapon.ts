import express, { Request, Response } from 'express'
import { Weapon } from '../models/mythical_weapon'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const MythicalWeaponStore = require('../models/mythical_weapon')

const store = new MythicalWeaponStore()

dotenv.config();

const {
    TOKEN_SECRET,
} = process.env

const index = async (_req: Request, res: Response) => {
    const weapons = await store.index();
    console.log('index');
    res.json(weapons);
}

const show = async (req: Request, res: Response) => {
    const weapon = await store.show(req.params.id);
    console.log('show');
    res.json(weapon);
}

const create = async (req: Request, res: Response) => {
    const weapon: Weapon = {
        id: null,
        name: req.params.name,
        type: req.params.type,
        weight: req.params.weight
    }
    try {
        jwt.verify(req.params.token, TOKEN_SECRET!)
    } catch (err) {
        res.status(401)
        res.json(`Invalid token ${err}`)
        return
    }
    try {
        const newWeapon = await store.create(weapon);
        res.json(newWeapon);
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const mythical_weapon_routes = (app: express.Application) => {
    app.get('/weapons', index);
    app.get('/weapons/:id', show);
    app.post('/weapons', create);
    app.delete('/weapons/:id', destroy);
}

export default mythical_weapon_routes;