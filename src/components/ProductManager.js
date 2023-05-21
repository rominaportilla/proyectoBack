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

    async #verificateCode(code){
        for (let i = 0; i < this.products.length; i++){
            if (this.products[i].code == code){
                console.log(`The code ${code} has already been used.`);
                break;
            }
        }
    }

    async addProduct(title, description, price, thumbnail, code, quotas){
        this.#verificateCode(code);
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            quotas,
            id: ProductManager.id
        }
        if(Object.values(newProduct).some((values) => values == null || values == undefined || values == '')){
            console.log('Error! Fields cannot be empty or repeated.')
        }else{
            this.products = [...this.products, newProduct];
        }

        await fs.writeFile(this.path, JSON.stringify(this.products))
        return 'producto agregado'
    }

    async readProducts(){
        let readProductsFile = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(readProductsFile);
    }

    async getProducts(){
        return await this.readProducts();
    }

    async getProductById(id){
        let getProductFile = await this.readProducts();
        let searchProduct = getProductFile.find((product) => product.id === id);
        if(searchProduct){
            console.log(searchProduct)
        }else{
            console.log('Not Found')
        }
    }

    async deleteProduct(id){
        let deleteProductFile = await this.readProducts();
        let searchProduct = deleteProductFile.filter((products) => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(searchProduct));
        console.log('Product successfully removed')
    }

    async updateProduct({id, ...product}){
        await this.deleteProduct(id);
        let oldProductsFile = await this.readProducts();
        let updateFile = [{...product, id}, ...oldProductsFile];
        await fs.writeFile(this.path, JSON.stringify(updateFile));
    }

    //------------------------
    async writeProducts(product){
        let products = await fs.readFile(this.path, 'utf-8');
        let productsParse = JSON.parse(products);
        let productsAll = [...productsParse, product];
        await fs.writeFile(this.path, JSON.stringify(productsAll));
        return 'producto agregado'
    }
}

/* const paquete = new ProductManager();
paquete.getProducts();
paquete.addProduct('nueva york', 'La ciudad que nunca duerme', 1200, 'image', 'abc123', 7);
paquete.addProduct('paris', 'La ciudad de la moda y el amor', 1500, 'image2', 'abc1234', 9);
paquete.addProduct('tokio', 'La ciudad más grande del mundo', 1700, 'image3', 'abc134', 11);
paquete.addProduct('sydney', 'La ciudad más linda de Australia', 2000, 'image4', 'abc124', 12);
paquete.addProduct('roma', 'bella ciudad', 12000, 'image', 'abc4123', 7);
paquete.addProduct('berlín', 'cpital de alemania', 15000, 'image2', 'abc1235', 17);
paquete.addProduct('seúl', 'la capital de corea', 17000, 'image3', 'a3bc134', 16);
paquete.addProduct('bangkok', 'capital de tailandia', 20000, 'image4', 'abc1264', 15);
paquete.addProduct('lima', 'capital de perú', 2900, 'image4', 'abc12kk64', 13);
paquete.addProduct('montevideo', 'capital de uruguay', 2200, 'image4', 'abc1ls264', 14);
paquete.getProducts();
paquete.getProductById(9);
paquete.updateProduct({
    title: 'tokio',
    description: 'La ciudad más grande del mundo',
    price: 200000,
    thumbnail: 'image3',
    code: 'abc134',
    quotas: 11,
    id: 3,
}); */