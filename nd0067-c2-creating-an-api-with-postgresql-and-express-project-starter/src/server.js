"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mythical_weapon_1 = __importDefault(require("./handlers/mythical_weapon"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/weapons', (_req: Request, res: Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})
app.get('/weapons/:id', (_req: Request, res: Response) => {
    try {
       res.send('this is the SHOW route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})
app.post('/weapons', (req: Request, res: Response) => {
    const weapon: Weapon = {
      name: req.body.name,
      type: req.body.type,
      weight: req.body.weight
    }
    try {
       res.send('this is the CREATE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})
app.put('/weapons/:id', (req: Request, res: Response) => {
    const weapon: Weapon = {
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight
    }
    try {
       res.send('this is the EDIT route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})
app.delete('/weapons/:id', (_req: Request, res: Response) => {
    try {
       res.send('this is the DELETE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})
(0, mythical_weapon_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
