import { Router} from 'express';
import CartManager from '../components/CartManager.js';

export const routerCarts = Router();
const carts = new CartManager()

routerCarts.post('/', async(req, res) => {
    res.json(await carts.addCarts());
})

routerCarts.get('/', async(req, res) => {
    res.json(await carts.readCarts())
})

routerCarts.get('/:id', async(req, res) => {
    res.json(await carts.getCartsById(parseInt(req.params.id)))
})

routerCarts.post('/:cid/products/:pid', async(req, res) => {
    let cartId = parseInt(req.params.cid);
    let productId = parseInt(req.params.pid);
    res.json(await carts.addProductInCart(cartId, productId));
})