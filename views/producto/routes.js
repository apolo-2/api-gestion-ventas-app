import express from 'express';
import {
  create,
  remove,
  edit,
  getAll,
} from '../../controllers/producto/controller.js';

const rutasProducto = express.Router();

const genericCallback = (res, type) => (err, result) => {
// const genericCallback = (res) => (err, result) => {

  if (err) {
    res.status(500).send(err);
  } else {
    // res.json(result);
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