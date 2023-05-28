const socket = io();

let formProducts = document.getElementById('formProducts');
let title = document.getElementById('titleProduct');
let description = document.getElementById('descriptionProduct');
let price = document.getElementById('priceProduct');
let thumbnail = document.getElementById('thumbnailProduct');
let code = document.getElementById('codeProduct');
let stock = document.getElementById('stockProduct');

formProducts.addEventListener('submit', (e) => {
    e.preventDefault();
    let newProduct = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value
    };
    socket.emit('newProductCreated', newProduct);
});

socket.on('products', (products) => {
    if (products) {
        let lastProduct = products.slice(-1).pop();
        let container = document.getElementById('dinamicProducts');
        let data = document.createElement('div');
        container.append(data);
        data.innerHTML = `<p>${lastProduct.id}</p>
                        <p>${lastProduct.title}</p>
                        <p>${lastProduct.description}</p>
                        <p>${lastProduct.price}</p>
                        <p>${lastProduct.thubmail}</p>
                        <p>${lastProduct.code}</p>
                        <p>${lastProduct.stock}</p>
                        <div>
                        <button type="button" class="buttonDelete" value=${lastProduct.id}></button>
                        </div>`;
}});

socket.on('deleteProductHTML', (deleteId) => {
    buttonDelete = document.querySelectorAll(".buttonDelete");
    
})