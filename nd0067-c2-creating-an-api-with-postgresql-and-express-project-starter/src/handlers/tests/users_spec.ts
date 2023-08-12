import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../../server'

const request = supertest(app)

const {
    TOKEN_SECRET,
} = process.env

describe('USer Handlers', () => {
    let token: string, userId: number;
    it('create user api endpoint', async (done) => {
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
        done();
    })
    it('delete user api endpoint', async (done) => {
        const res = await request.delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    })
})