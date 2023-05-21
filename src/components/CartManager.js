import { promises as fs } from 'fs';

export default class CartManager{
    constructor(){
        this.path = './src/models/carts.json'
        //yo prefiero arrancar el array vacío de acá
        this.cart = [];
    }

    static id = 0;

    async readCarts(){
        let readCartsFile = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(readCartsFile);
    }

    async writeCarts(carts){
        await fs.writeFile(this.path, JSON.stringify(carts));
    }

    async addCarts(){
        let cartsOld = await this.readCarts();
        CartManager.id++;
        let carts = [{id: id, products: []}, ...cartsOld];
        await this.writeCarts(carts);
        return 'Carrito Agregado';
    }
}