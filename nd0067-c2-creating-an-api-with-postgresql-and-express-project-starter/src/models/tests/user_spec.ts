import { User, UserStore } from "../user";

const store = new UserStore()

describe("User Model", () => {
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

	it('should have a authenticate method', () => {
		expect(store.authenticate).toBeDefined();
	});

    it('create method should add a user', async () => {
        const result = await store.create({
            firstname: 'Alexa',
            lastname: 'David',
            password: 'password123'
        });
        expect(result.firstname).toEqual('Alexa');
        expect(result.lastname).toEqual('David');
    });
  
    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).not.toBeNull();
    });
  
    it('show method should return the correct user', async () => {
        const result = await store.show("2");
        expect(result).not.toBeNull();
    });

    it("authenticate user with password", async () => {
        const output = await store.authenticate("Alexa", "David", "password123");
        expect(output).not.toBeNull();
    });
  
    it('delete method should remove the user', async () => {
        await store.delete("2");
        const result = await store.index()
        expect(result).toEqual([]);
    });
});