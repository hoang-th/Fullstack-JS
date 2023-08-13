import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model", () => {
    let productId: number;
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
  
    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'robot',
            price: 250
        });
        productId = result.id as number;
        expect(result).toEqual({
            id: result.id,
            name: 'robot',
            price: 250
        });
    });
  
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: productId,
            name: 'robot',
            price: 250
        }]);
    });
  
    it('show method should return the correct product', async () => {
        const result = await store.show(`${productId}`);
        expect(result).toEqual({
            id: productId,
            name: 'robot',
            price: 250
        });
    });

    it('delete method should remove the product', async () => {
        await store.delete(`${productId}`);
        const result = await store.index()
        expect(result).toEqual([]);
    });
});