<<<<<<< HEAD
import Express from 'express';
=======
import Express from "express";
>>>>>>> ajuste-ventas
import {
  todoUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  consultarUsuario,
  consultarOCrearUsuario,
<<<<<<< HEAD
} from '../../controllers/usuarios/controller.js';
=======
} from "../../controllers/usuarios/controller.js";
>>>>>>> ajuste-ventas

const rutasUsuario = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
<<<<<<< HEAD
    res.status(500).send('Error consultando los usuarios');
=======
    res.status(500).send("Error consultando los usuarios");
>>>>>>> ajuste-ventas
  } else {
    res.json(result);
  }
};

<<<<<<< HEAD
rutasUsuario.route('/usuarios').get((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios');
=======
rutasUsuario.route("/usuarios").get((req, res) => {
  console.log("alguien hizo get en la ruta /usuarios");
>>>>>>> ajuste-ventas
  //res.send('alguien hizo get en la ruta /usuarios');
  todoUsuarios(genercCallback(res));
});

<<<<<<< HEAD
rutasUsuario.route('/usuarios').post((req, res) => {
  crearUsuario(req.body, genercCallback(res));
});

rutasUsuario.route('/usuarios/self').get((req, res) => {
  console.log('GET en la ruta /self');
=======
rutasUsuario.route("/usuarios").post((req, res) => {
  crearUsuario(req.body, genercCallback(res));
});

rutasUsuario.route("/usuarios/self").get((req, res) => {
  console.log("email");
>>>>>>> ajuste-ventas
  consultarOCrearUsuario(req, genercCallback(res));
  // consultarUsuario(, genercCallback(res));
});

<<<<<<< HEAD
rutasUsuario.route('/usuarios/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios');
  consultarUsuario(req.params.id, genercCallback(res));
});

rutasUsuario.route('/usuarios/:id').patch((req, res) => {
  editarUsuario(req.params.id, req.body, genercCallback(res));
});

rutasUsuario.route('/usuarios/:id').delete((req, res) => {
  eliminarUsuario(req.params.id, genercCallback(res));
});

export default rutasUsuario;
=======
rutasUsuario.route("/usuarios/:id").get((req, res) => {
  console.log("alguien hizo get en la ruta /usuarios/:id");
  consultarUsuario(req.params.id, genercCallback(res));
});

rutasUsuario.route("/usuarios/:id").patch((req, res) => {
  editarUsuario(req.params.id, req.body, genercCallback(res));
});

rutasUsuario.route("/usuarios/:id").delete((req, res) => {
  eliminarUsuario(req.params.id, genercCallback(res));
});

export default rutasUsuario;
>>>>>>> ajuste-ventas
