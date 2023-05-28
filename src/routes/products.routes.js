import { Router } from 'express';
import { ProductManager } from '../components/ProductManager.js';

export const routerProducts = Router();
const productManager = new ProductManager();

routerProducts.get('/', async (req, res) => {
    let limit = req.query.limit;
    if (!limit) return res.json(await productManager.getProducts());
    let allProducts = await productManager.readProducts();
    let limitProducts = allProducts.slice(0, limit);
    res.json(await limitProducts);
})

routerProducts.get('/:pid', async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await productManager.readProducts();
    let productById = allProducts.find(product => product.id === id);
    if (!productById) return res.send('Error. Not found.')
    res.json(productById)
})

routerProducts.post('/', async(req, res) => {
    let newProduct = req.body;
    res.json(await productManager.addProduct(newProduct));
})

routerProducts.put('/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    let updateProduct = req.body;
    res.json(await productManager.updateProduct(id, updateProduct));
})

routerProducts.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    res.json(await productManager.deleteProduct(id));
})
