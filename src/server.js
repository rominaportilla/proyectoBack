import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { ProductManager } from './components/ProductManager.js';
import { routerCarts } from './routes/carts.routes.js';
import { routerProducts } from './routes/products.routes.js';
import { realTimeProducts } from './routes/realTimeProducts.routes.js';
import { __dirname } from './utils.js';

const app = express();
const port = 8080;

const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//archivos públicos
app.use(express.static(__dirname + '/public'));
// configuración del motor de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
// Todos nuestros endpoints - datos crudos en json
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use("/realtimeproducts", realTimeProducts)

app.get('/', async (req, res) => {
    const allProducts = await productManager.getProducts();
    res.render('home', {allProducts})
})

app.get('*', (req, res) => {
    return res.status(404).json({
        status: 'Error',
        msg: 'Not Found',
        data: {}
    })
})

const httpServer = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
httpServer.on('error', (error) => console.log(`Error server ${error}`))

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    socket.on('newProductCreated', async(newProduct) => {
        const productCreated = await productManager.addProduct(newProduct);
        if(productCreated){
            const productList = await productManager.getProducts();
            socketServer.emit('products', productList);
        }else{
            socketServer.emit('products', productCreated)
        }
    });

    socket.on('deleteProduct', async (deleteId) => {
        await productManager.deleteProduct(deleteId);
        socketServer.emit('deleteProductHTML', deleteId)
    });
})