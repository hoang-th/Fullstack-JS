import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../../server'

const request = supertest(app)

const {
    TOKEN_SECRET,
} = process.env

describe('Orders Handlers', () => {
    let token: string, userId: number, productId: number, orderId: number;
    beforeAll(async () => {
        const user_test = (await request.post('/users/').send({
            firstname: "Alexa",
            lastname: "Tran",
            password: "password123"
        }))
        const { body } = user_test;
        token = body;
        const payload = jwt.verify(token, TOKEN_SECRET as string);
        // @ts-ignore
        const user = payload.user;
        userId = user.id;

        const product_test = (await request.post('/products/').set('Authorization', 'Bearer ' + token).send({
            name: 'sword',
            price: 900
        }))
        productId = product_test.body.id
    })

    afterAll(async () => {
        await request.delete(`/users/${userId}`).set('Authorization', 'Bearer ' + token)
        await request.delete(`/products/${productId}`).set('Authorization', 'Bearer ' + token)
    })

    it('post /orders/ endpoint', async () => {
        const res = (await request.post('/orders/').set('Authorization', 'Bearer ' + token).send({
            user_id: userId,
            status: 'active'
        }))
        orderId = res.body.id
        expect(res.status).toBe(200);
    })

    it('get /orders/ endpoint', async () => {
        const res = await request.get(`/orders/`);
        expect(res.status).toBe(200);
    })

    it('get /orders/:id endpoint', async () => {
        const res = await request.get(`/orders/${orderId}`);
        expect(res.status).toBe(200);
    })

    it('post /orders/:id/products endpoint', async () => {
        const res = (await request.post(`/orders/${userId}/products`).set('Authorization', 'Bearer ' + token).send({
            orderId: orderId,
            productId: productId,
            quantity: 10
        }));
        expect(res.status).toBe(200);
    })

    it('delete /orders/:id endpoint', async () => {
        const res = await request.delete(`/orders/${orderId}`).set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    })
})