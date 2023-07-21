import express, { Request, Response } from 'express'
import { Weapon } from '../models/mythical_weapon'
const MythicalWeaponStore = require('../models/mythical_weapon')

const store = new MythicalWeaponStore()

const index = async (_req: Request, res: Response) => {
    const weapons = await store.index();
    res.json(weapons);
}

const show = async (req: Request, res: Response) => {
    const weapon = await store.show(req.params.id);
    res.json(weapon);
}

const create = async (req: Request, res: Response) => {
    try {
        const weapon: Weapon = {
            id: null,
            name: req.body.name,
            type: req.body.type,
            weight: req.body.weight
        }

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
    app.get('/weapons', create);
    app.get('/weapons', destroy);
}

export default mythical_weapon_routes;