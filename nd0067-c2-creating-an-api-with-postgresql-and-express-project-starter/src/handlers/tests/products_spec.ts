import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../../server'

const request = supertest(app)

const {
    TOKEN_SECRET,
} = process.env

describe('Products Handlers', () => {
    let token: string, userId: number, productId: number;
    beforeAll(async () => {
        const res = (await request.post('/users/').send({
            firstname: "Alexa",
            lastname: "Tran",
            password: "password123"
        }))
        const { body } = res;
        token = body;
        const payload = jwt.verify(token, TOKEN_SECRET as string);
        // @ts-ignore
        const user = payload.user;
        userId = user.id;
    })

    afterAll(async () => {
        await request.delete(`/users/${userId}`).set('Authorization', 'Bearer ' + token)
    })

    it('post /products/ endpoint', async () => {
        const res = (await request.post('/products/').set('Authorization', 'Bearer ' + token).send({
            name: 'shield',
            price: 500
        }))
        productId = res.body.id
        expect(res.status).toBe(200);
    })

    it('get /products/ endpoint', async () => {
        const res = await request.get(`/products/`);
        expect(res.status).toBe(200);
    })

    it('get /products/:id endpoint', async () => {
        const res = await request.get(`/products/${productId}`);
        expect(res.status).toBe(200);
    })

    it('delete /products/:id endpoint', async () => {
        const res = await request.delete(`/products/${productId}`).set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    })
})