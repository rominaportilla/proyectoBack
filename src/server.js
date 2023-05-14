import express from 'express';
import ProductManager from "./components/ProductManager.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const paquete = new ProductManager();
const readProducts = paquete.readProducts();

console.log(await readProducts)

// este lo corremos como node src/server.js

app.get('/products', async (req, res) => {
    // usamos parseInt para que el limite sea un número y no un string
    let limit = parseInt(req.query.limit);
    if (!limit) return res.json(await readProducts);
    let allProducts = await readProducts;
    let limitProducts = allProducts.slice(0, limit);
    res.json(await limitProducts);
})

app.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    if (!productById) return res.send('Error. Not found.')
    res.json(productById)
})

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//para iniciar el servidor. Además lo tuve que guardar el listener en una variable para usar el .on y no encuentro la parte de esto en la clase, lo saqué de un video.
server.on('error', (error) => console.log(`Error server ${error}`))