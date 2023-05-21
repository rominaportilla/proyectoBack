//import express from 'express';
import { Router } from 'express';
import ProductManager from '../components/ProductManager.js';

export const routerProducts = Router();
const paquete = new ProductManager();
//const readProducts = paquete.readProducts();

//console.log(await readProducts)

routerProducts.get('/', async (req, res) => {
    // usamos parseInt para que el limite sea un número y no un string porque los params pasan strings
    let limit = req.query.limit;
    //if (!limit) return res.json(await readProducts);
    if (!limit) return res.json(await paquete.getProducts());
    let allProducts = await paquete.readProducts();
    let limitProducts = allProducts.slice(0, limit);
    res.json(await limitProducts);
})

routerProducts.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await paquete.readProducts();
    let productById = allProducts.find(product => product.id === id);
    if (!productById) return res.send('Error. Not found.')
    res.json(productById)
})

routerProducts.post('/', async(req, res) => {
    let newProduct = req.body;
    res.json(await paquete.addProduct(newProduct));
})

routerProducts.put('/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    let updateProduct = req.body;
    res.json(await paquete.updateProduct(id, updateProduct));
})

routerProducts.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    //const allProducts = await paquete.readProducts();
    //const deleteProducts = allProducts.filter((product) => product.id != id);
    res.json(await paquete.deleteProduct(id));

    /* return res.status(200).json({
        status: 'Success',
        msg: `Removed product ${id}`,
        data: deleteProducts
    }) */
})
