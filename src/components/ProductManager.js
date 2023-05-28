//@ts-check
// este lo corro con node src/components/ProductManager.js

// ReferenceError: require is not defined in ES module scope, you can use import instead
//const fs = require('fs');
// por eso lo hago con import
import {promises as fs} from 'fs';
// tuve que borrarle todos los .promises. a los metodos de los archivos!! (write, read, etc)

export default class ProductManager{
    constructor(){
        this.path = './src/models/products.json'
        this.products = [];
    }

    static id = 0;

    /* async #verificateCode(code){
        for (let i = 0; i < this.products.length; i++){
            if (this.products[i].code == code){
                console.log(`The code ${code} has already been used.`);
                break;
            }
        }
    } */

    async readProducts(){
        let readProductsFile = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(readProductsFile);
    }

    async writeProducts(product){
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    async searchProduct(id){
        let productById = await this.readProducts();
        return productById.find(product => product.id === id);
    }

    /* async addProduct(title, description, price, thumbnail, code, stock){
        this.#verificateCode(code);
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }
        if(Object.values(newProduct).some((values) => values == null || values == undefined || values == '')){
            console.log('Error! Fields cannot be empty or repeated.')
        }else{
            this.products = [...this.products, newProduct];
        }

        await fs.writeFile(this.path, JSON.stringify(this.products))
        return 'producto agregado'
    } */

    async addProduct(product){
        let productsOld = await this.readProducts();
        ProductManager.id++;
        let newProduct = {
            ...product,
            id: ProductManager.id
        }
        let productsAll = [...productsOld, newProduct];
        await this.writeProducts(productsAll);
        return 'producto agregado'
    }

    async getProducts(){
        return await this.readProducts();
    }

    async getProductById(id){
        /* let getProductFile = await this.readProducts();
        let searchProduct = getProductFile.find((product) => product.id === id);
        if(searchProduct){
            return searchProduct
        }else{
            return 'Not Found'
        } */

        let productById = await this.searchProduct(id);
        if(!productById) return 'producto no encontrado';
        return productById;
    }

    async deleteProduct(id){
        let productsFile = await this.readProducts();
        //let searchProduct = productsFile.filter((products) => products.id != id);
        let searchProduct = productsFile.some(product => product.id === id);
        if(searchProduct){
            let filterProducts = productsFile.filter(product => product.id != id);
            await this.writeProducts(filterProducts);
            return 'producto eliminado'
        }
        return 'el producto que quiere eliminar no existe'
        //await fs.writeFile(this.path, JSON.stringify(searchProduct));
        //console.log('Product successfully removed')
    }

    async updateProduct({id, product}){
        let productById = await this.searchProduct(id);
        if(!productById) return 'producto no encontrado';
        await this.deleteProduct(id);
        let oldProductsFile = await this.readProducts();
        let updateFile = [{...product, id: id}, ...oldProductsFile];
        //await fs.writeFile(this.path, JSON.stringify(updateFile));
        await this.writeProducts(updateFile);
        return 'producto actualizado'
    }

    //------------------------
    /* async writeProducts(product){
        let productsAll = [...productsParse, product];
        await fs.writeFile(this.path, JSON.stringify(productsAll));
        return 'producto agregado'
    } */
}

/* const productManager = new ProductManager();
productManager.getProducts();
productManager.addProduct('nueva york', 'La ciudad que nunca duerme', 1200, 'image', 'abc123', 7);
productManager.addProduct('paris', 'La ciudad de la moda y el amor', 1500, 'image2', 'abc1234', 9);
productManager.addProduct('tokio', 'La ciudad más grande del mundo', 1700, 'image3', 'abc134', 11);
productManager.addProduct('sydney', 'La ciudad más linda de Australia', 2000, 'image4', 'abc124', 12);
productManager.addProduct('roma', 'bella ciudad', 12000, 'image', 'abc4123', 7);
productManager.addProduct('berlín', 'cpital de alemania', 15000, 'image2', 'abc1235', 17);
productManager.addProduct('seúl', 'la capital de corea', 17000, 'image3', 'a3bc134', 16);
productManager.addProduct('bangkok', 'capital de tailandia', 20000, 'image4', 'abc1264', 15);
productManager.addProduct('lima', 'capital de perú', 2900, 'image4', 'abc12kk64', 13);
productManager.addProduct('montevideo', 'capital de uruguay', 2200, 'image4', 'abc1ls264', 14);
productManager.getProducts();
productManager.getProductById(9);
productManager.updateProduct({
    title: 'tokio',
    description: 'La ciudad más grande del mundo',
    price: 200000,
    thumbnail: 'image3',
    code: 'abc134',
    stock: 11,
    id: 3,
}); */