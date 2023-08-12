import { Order, OrderStore } from "../order";
import { User, UserStore } from "../user";
import { Product, ProductStore } from "../product";

const orderStore = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()

describe("Order Model", () => {
    let user_id: number, product_id: number;
    beforeAll(async () => {
        const product = await productStore.create({
            name: 'rocket',
            price: 300
        });
        product_id = product.id as number;

        const user = await userStore.create({
            firstname: 'Ahri',
            lastname: 'Smith',
            password: 'password123'
        })
        user_id = user.id as number;
        console.log(`product_id: ${product_id}`)
        console.log(typeof(user_id))
        console.log(`user_id: ${user_id}`)
    })

    afterAll(async () => {
        await productStore.delete("1");
        await userStore.delete(`${user_id}`);
    })
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
    });
    
    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });
    
    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
    });
    
    it('should have a delete method', () => {
        expect(orderStore.delete).toBeDefined();
    });

    it('should have a add product method', () => {
        expect(orderStore.addProduct).toBeDefined();
    });
  
    it('create method should add a order', async () => {
        const result = await orderStore.create({
            user_id: user_id,
            status: "active"
        });
        expect(result).toEqual({
            id: 1,
            user_id: user_id,
            status: "active"
        });

    });
  
    it('index method should return a list of products', async () => {
        const result = await orderStore.index();
        expect(result).toEqual([{
            id: 1,
            user_id: 1,
            status: "active"
        }]);
    });
  
    it('show method should return the correct product', async () => {
        const result = await orderStore.show("1");
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: "active"
        });
    });

    it('add Product method should return the correct order product', async () => {
        const result = await orderStore.addProduct(10, "1", "1");
        expect(result).toEqual({
            id: 1,
            quantity: 10,
            order_id: 1,
            product_id: 1
        });
    });

    it('delete method should remove the product', async () => {
        orderStore.delete("1");
        const result = await orderStore.index()
        expect(result).toEqual([]);
    });
});