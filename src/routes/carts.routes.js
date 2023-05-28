import { Router } from 'express';
import CartManager from '../components/CartManager.js';

export const routerCarts = Router();
const cartManager = new CartManager()

routerCarts.post('/', async(req, res) => {
    res.json(await cartManager.addCarts());
})

routerCarts.get('/', async(req, res) => {
    res.json(await cartManager.readCarts())
})

routerCarts.get('/:cid', async(req, res) => {
    res.json(await cartManager.getCartsById(parseInt(req.params.id)))
})

routerCarts.post('/:cid/products/:pid', async(req, res) => {
    let cartId = parseInt(req.params.cid);
    let productId = parseInt(req.params.pid);
    res.json(await cartManager.addProductInCart(cartId, productId));
})