import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../../server'

const request = supertest(app)

const {
    TOKEN_SECRET,
} = process.env

describe('User Handlers', () => {
    let token: string, userId: number;
    it('post /users/ endpoint', async () => {
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
        expect(res.status).toBe(200);
        expect(res.body).toMatch(
            /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
        );
    })

    it('get /users/ endpoint', async () => {
        const res = await request.get(`/users/`).set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
    })

    it('get /users/:id endpoint', async () => {
        const res = await request.get(`/users/${userId}`).set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
    })

    it('post /users/authenticate endpoint', async () => {
        const res = (await request.post(`/users/authenticate`).send({
            firstname: "Alexa",
            lastname: "Tran",
            password: "password123"
        }));
        expect(res.status).toBe(200);
    })

    it('delete /users/:id endpoint', async () => {
        const res = await request.delete(`/users/${userId}`).set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    })
})