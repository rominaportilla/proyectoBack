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
    #getProductById(id){
        const searchProduct = this.products.find((value)=>{
            if(value.id == id){
                console.log(searchProduct);
            }
            if (searchProduct == undefined) {
                console.log('Not Found');
            }
        })
    }
    #verificateCode(code){
        const searchCode = this.products.map((value) => value.code !== code);
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
        if(Object.values(newProduct).some((values) => values == null || values == undefined || values == '')){
            console.log('Error! Fields cannot be empty or repeated.')
        }else{
            this.products = [...this.products, newProduct];
        }
    }
}

const paquete = new ProductManager();
paquete.addProduct('paris', 'balbal', 123, 'image', 555, 20);
paquete.addProduct('roma', 'hshsh', 777, 'hola', 222, 9);
paquete.getProducts();

