// @ts-check
class ProductManager{
    constructor(){
        this.products = [];
    }
    getProducts(){
        console.log(this.products);
        return this.products
    }
    #generateId(){
        const id = Math.random().toString(30).substring(2);
        return id
    }
    getProductById(id){
        const searchProduct = this.products.find((value)=> value.id == id);
        if (searchProduct) {
            console.log(searchProduct);
            return searchProduct;
        } else {
            console.log('Not Found');
            return undefined;
        }
    };
    #verificateCode(code){
        const searchCode = this.products.map((value)=> value.code == code);
        return searchCode;
    }
    addProduct(title, description, price, thumbnail, code, quotas){
        let newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            quotas: quotas,
            id: this.#generateId()
        }
        if(Object.values(newProduct).some((values) => values == null || values == undefined || values == '' || this.#verificateCode(values.code))){
            console.log('Error! Fields cannot be empty or repeated.')
        }else{
            this.products = [...this.products, newProduct];
        }
    }
}

const paquete = new ProductManager();
paquete.getProducts();
paquete.addProduct('nueva york', 'La ciudad que nunca duerme', 1200, 'image', 'abc123', 7);
paquete.addProduct('paris', 'La ciudad de la moda y el amor', 1500, 'image2', 'abc1234', 9);
paquete.addProduct('tokio', 'La ciudad más grande del mundo', 1700, 'image3', 'abc134', 11);
paquete.addProduct('sydney', 'La ciudad más linda de Australia', 2000, 'image4', 'abc124', 12);
paquete.getProducts();