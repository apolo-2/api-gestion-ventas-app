import express from "express";
import dotenv from "dotenv";
import Cors from "cors";
import { connectServer } from "./db/db.js";
import rutasProducto from "./views/producto/routes.js";
import rutasUsuario from "./views/usuarios/routes.js";
import rutasVenta from "./views/ventas/routes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use(Cors());
app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);
let respuesta;
app.use(function (_req, res, next) {
  respuesta = {
    error: true,
    codigo: 404,
    mensaje: "URL no encontrada",
  };
  res.status(404).send(respuesta);
});

function main() {
  return app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
}

connectServer(main);
