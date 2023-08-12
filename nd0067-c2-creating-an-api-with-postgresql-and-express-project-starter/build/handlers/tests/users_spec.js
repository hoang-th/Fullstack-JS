"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const { TOKEN_SECRET, } = process.env;
describe('USer Handlers', () => {
    let token, userId;
    it('create user api endpoint', async (done) => {
        const res = (await request.post('/users/').send({
            firstname: "Alexa",
            lastname: "Tran",
            password: "password123"
        }));
        const { body } = res;
        token = body;
        const payload = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        // @ts-ignore
        const user = payload.user;
        userId = user.id;
        expect(res.status).toBe(200);
        expect(res.body).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
        done();
    });
    it('delete user api endpoint', async (done) => {
        const res = await request.delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    });
});
