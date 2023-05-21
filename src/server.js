// este lo corremos como node src/server.js
import express from 'express';
import { routerProducts } from './routes/products.router.js';
import { routerCarts } from './routes/carts.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Todos nuestros endpoints
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

app.get('*', (req, res) => {
    return res.status(404).json({
        status: 'Error',
        msg: 'Not Found',
        data: {}
    })
})

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//para iniciar el servidor. Además lo tuve que guardar el listener en una variable para usar el .on y no encuentro la parte de esto en la clase, lo saqué de un video.
server.on('error', (error) => console.log(`Error server ${error}`))