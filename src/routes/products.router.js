import express from 'express';
//import 
export const routerProducts = express.Router();
import ProductManager from '../components/ProductManager.js';

const paquete = new ProductManager();
//const readProducts = paquete.readProducts();

//console.log(await readProducts)

routerProducts.get('/', async (req, res) => {
    // usamos parseInt para que el limite sea un número y no un string
    let limit = parseInt(req.query.limit);
    //if (!limit) return res.json(await readProducts);
    if (!limit) return res.json(await paquete.getProducts());
    let allProducts = await readProducts;
    let limitProducts = allProducts.slice(0, limit);
    res.json(await limitProducts);
})

routerProducts.post('/', async(req, res) => {
    let newProduct = req.body;
    res.json(await paquete.addProduct(newProduct));
})

routerProducts.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    if (!productById) return res.send('Error. Not found.')
    res.json(productById)
})

routerProducts.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const allProducts = await readProducts;
    const deleteProducts = allProducts.filter((product) => product.id != id);

    return res.status(200).json({
        status: 'Success',
        msg: `Removed product ${id}`,
        data: deleteProducts
    })
})
