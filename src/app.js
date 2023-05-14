import express from "express";
import {
    routerPets
} from "./routes/pets.router.js";
import {
    routerProductos
} from "./routes/productos.router.js";

import { __dirname } from "./utils.js";

import handlebars from 'express-handlebars';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));




//config handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "./views");
app.set("view engine", "handlebars");





app.get('/romi', (req,res) => {
    let user = {
        nombre: 'nombre',
        apellido: 'apellido',
        edad: 'edad',
        correo: 'knaskas',
        tel: 737373
    }
    res.render( 'productos-html', user)
})

//TODOS NUESTROS ENDPOINT
app.use("/productos", routerProductos);
app.use("/pets", routerPets);

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "error esa ruta no existe",
        data: {},
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});