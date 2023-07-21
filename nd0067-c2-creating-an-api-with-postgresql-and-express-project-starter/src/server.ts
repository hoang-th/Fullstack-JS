import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Weapon  } from './models/mythical_weapon'
import mythicalWeaponRoutes from './handlers/mythical_weapon'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

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

app.delete('/articles/:id', (_req: Request, res: Response) => {
    try {
       res.send('this is the DELETE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})
mythicalWeaponRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
