import { promises as fs } from 'fs';
import ProductManager from './ProductManager.js';

const productsAll = new ProductManager();

export default class CartManager{
    constructor(){
        this.path = './src/models/carts.json'
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

    async searchCart(id){
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id)
    }

    async addCarts(){
        let cartsOld = await this.readCarts();
        let carts = [{id: CartManager.id++, products: []}, ...cartsOld];
        await this.writeCarts(carts);
        return 'carrito agregado';
    }

    async getCartsById(id){
        let cartById = await this.searchCart(id);
        if(!cartById) return 'carrito no encontrado';
        return cartById;
    }

    async addProductInCart(cartId, productId){
        let cartById = await this.searchCart(id);
        if(!cartById) return 'carrito no encontrado';
        let productById = await productsAll.searchProduct(productId);
        if(!productById) return 'producto no encontrado';
        let carts = await this.readCarts();
        let filterCarts = carts.filter(cart => cart.id != id);

        if(cartById.products.some(product => product.id === productId)){
            let otherProductInCart = cartById.products.find(product => product.id === productId);
            otherProductInCart.quantity++;
            let concatCarts = [cartById, ...filterCarts];
            await this.writeCarts(concatCarts);
            return 'otro producto agregado al carrito';
        }

        cartById.products.push({ id: productById.id, quantity: 1})
        let concatCarts = [cartById, ...filterCarts];
        await this.writeCarts(concatCarts);
        return 'producto agregado al carrito'
    }
}