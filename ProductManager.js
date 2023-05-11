const fs = require('fs');

class ProductManager{
    constructor(){
        this.path = './products.json'
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

        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }

    async readProducts(){
        let readProductsFile = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(readProductsFile);
    }

    async getProducts(){
        let getProductsFile = await this.readProducts();
        return console.log(getProductsFile)
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
        await fs.promises.writeFile(this.path, JSON.stringify(searchProduct));
        console.log('Product successfully removed')
    }

    async updateProduct({id, ...product}){
        await this.deleteProduct(id);
        let oldProductsFile = await this.readProducts();
        let updateFile = [{...product, id}, ...oldProductsFile];
        await fs.promises.writeFile(this.path, JSON.stringify(updateFile));
    }
}

const paquete = new ProductManager();
paquete.getProducts();
paquete.addProduct('nueva york', 'La ciudad que nunca duerme', 1200, 'image', 'abc123', 7);
paquete.addProduct('paris', 'La ciudad de la moda y el amor', 1500, 'image2', 'abc1234', 9);
paquete.addProduct('tokio', 'La ciudad más grande del mundo', 1700, 'image3', 'abc134', 11);
paquete.addProduct('sydney', 'La ciudad más linda de Australia', 2000, 'image4', 'abc124', 12);
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
});