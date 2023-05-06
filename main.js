class ProductManager{
    constructor(){
        this.products = [];
    }

    static id = 0;

    getProducts(){
        console.log(this.products);
        return this.products
    }

    searchProductById(id){
        return this.products.find((product)=> product.id == id);
    }

    getProductById(id){
        this.searchProductById(id) ? console.log(this.searchProductById(id)) : console.log('Not Found');
    }

    #verificateCode(code){
        for (let i = 0; i < this.products.length; i++){
            if (this.products[i].code == code){
                console.log(`The code ${code} has already been used.`);
                break;
            }
        }
    }

    addProduct(title, description, price, thumbnail, code, quotas){
        this.#verificateCode(code);
        ProductManager.id++;
        let newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            quotas: quotas,
            id: ProductManager.id
        }
        if(Object.values(newProduct).some((values) => values == null || values == undefined || values == '')){
            console.log('Error! Fields cannot be empty or repeated.')
        }else{
            this.products = [...this.products, newProduct];
        }
    }
}

const paquete = new ProductManager();
paquete.getProducts();
paquete.addProduct('nueva york', 'La ciudad que nunca duerme', 1200, 'image', 'abc123', 7);
paquete.addProduct('paris', 'La ciudad de la moda y el amor', 1500, 'image2', 'abc124', 9);
paquete.addProduct('tokio', 'La ciudad más grande del mundo', 1700, 'image3', 'abc125', 11);
paquete.addProduct('sydney', 'La ciudad más linda de Australia', 2000, 'image4', 'abc126', 12);
paquete.getProducts();
paquete.getProductById(3);
paquete.addProduct('sydney', 'La ciudad más linda de Australia', 2000, 'image4', 'abc126', 12);
paquete.addProduct('cancún', '', 1500, 'image5', 'abc1235', 9)