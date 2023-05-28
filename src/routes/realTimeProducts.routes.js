import express from 'express';
import { ProductManager } from '../components/ProductManager.js';

const productManager = new ProductManager();
export const realTimeProducts = express.Router();

realTimeProducts.get('/', async (req, res) => {
    const allProducts = await productManager.getProducts();
    return res.render('realTimeProducts', {allProducts});
})