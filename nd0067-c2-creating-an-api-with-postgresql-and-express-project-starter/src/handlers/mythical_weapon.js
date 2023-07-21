"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MythicalWeaponStore = require('../models/mythical_weapon');
const store = new MythicalWeaponStore();
const index = async (_req, res) => {
    const weapons = await store.index();
    res.json(weapons);
};
const show = async (req, res) => {
    const weapon = await store.show(req.params.id);
    res.json(weapon);
};
const create = async (req, res) => {
    try {
        const weapon = {
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
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const mythical_weapon_routes = (app) => {
    app.get('/weapons', index);
    app.get('/weapons/:id', show);
    app.get('/weapons', create);
    app.get('/weapons', destroy);
};
exports.default = mythical_weapon_routes;
