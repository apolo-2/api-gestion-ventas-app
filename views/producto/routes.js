<<<<<<< HEAD
import express from 'express';
=======
import express from "express";
>>>>>>> ajuste-ventas
import {
  create,
  remove,
  edit,
  getAll,
<<<<<<< HEAD
} from '../../controllers/producto/controller.js';
=======
  getAvailableProducts,
} from "../../controllers/producto/controller.js";
>>>>>>> ajuste-ventas

const rutasProducto = express.Router();

const genericCallback = (res, type) => (err, result) => {
<<<<<<< HEAD
// const genericCallback = (res) => (err, result) => {
=======
  // const genericCallback = (res) => (err, result) => {
>>>>>>> ajuste-ventas

  if (err) {
    res.status(500).send(err);
  } else {
    // res.json(result);
<<<<<<< HEAD
    res.json(type==='PATH'? result.value : result);
  }
};

rutasProducto.route('/producto').get((req, res) => {
  getAll(genericCallback(res));
});

rutasProducto.route('/producto').post((req, res) => {
  create(req.body, genericCallback(res));
});

rutasProducto.route('/producto/:id').patch((req, res) => {
  edit(req.params.id, req.body, genericCallback(res, 'PATH'));
});

rutasProducto.route('/producto/:id').delete((req, res) => {
  remove(req.params.id, genericCallback(res));
});

export default rutasProducto;
=======
    res.json(type === "PATH" ? result.value : result);
  }
};

rutasProducto.route("/producto").get((req, res) => {
  console.log("alguien hizo get en la ruta /producto");
  getAll(genericCallback(res));
});

rutasProducto.route("/productosDisponibles").get((req, res) => {
  console.log("alguien hizo get en la ruta /productosDisponibles");
  getAvailableProducts(genericCallback(res));
});

rutasProducto.route("/producto").post((req, res) => {
  create(req.body, genericCallback(res));
});

rutasProducto.route("/producto/:id").patch((req, res) => {
  edit(req.params.id, req.body, genericCallback(res, "PATH"));
});

rutasProducto.route("/producto/:id").delete((req, res) => {
  remove(req.params.id, genericCallback(res));
});

export default rutasProducto;
>>>>>>> ajuste-ventas
