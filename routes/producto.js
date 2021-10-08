const express = require('express');
var ObjectID = require('mongodb').ObjectID;

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

const listaProductos = [
    {
      codigo: '0001',
      descripcion: 'KOrinaaaaa',
      valorUnit: 685000,
      estado: 'Disponible',
    },
    {
      codigo: '0002',
      descripcion: 'Disco SSD Kingston 256GB',
      valorUnit: 168500,
      estado: 'No Disponible',
    },
    {
      codigo: '0003',
      descripcion: 'Monitor LG 27"',
      valorUnit: 568500,
      estado: 'Disponible',
    }
];

//GET
recordRoutes.route('/producto').get(async function (req, res) {

    // console.log('Respuesta de la ruta GET ok!')
    // res.send(listaProductos)

    // Get records
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('productos')
        .find({})
        .limit(50)
        .toArray(function (err, result) {
        if (err) {
            res.status(400).send('Error fetching productos!');
        } else {
            console.log(result)
            res.json(result);
        }
    });
});

//POST
// This section will help you create a new record.
recordRoutes.route('/producto/crear').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const producto = {
    descripcion: req.body.descripcion,
    valorUnit: req.body.valorUnit,
    estado: req.body.estado,
    created: new Date(),
  };

  dbConnect.collection('productos').insertOne(producto, function (err, result) {
    if (err) {
      res.status(400).send('Error inserting product!');
    } else {
      console.log(`Added a new producto with id ${result.insertedId}`);
      res.json({ id: result.insertedId });
    }
  });
});


// pendiente cambiar que el id sea enviado como AudioParam, en la ruta****
// This section will help you update a record by id.
// recordRoutes.route('/producto/actualizar').patch(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const producto = { _id: new ObjectID(req.body.id) };
//   delete req.body.id;
//   const updates = { $set: req.body };
//   dbConnect
//     .collection('productos')
//     .findOneAndUpdate(
//       vehicle,
//       updates,
//       { new: true, upsert: true, returnOriginal: false },
//       function (err, _result) {
//         if (err) {
//           res.status(400).send(`Error updating likes on listing with id ${producto.id}!`);
//         } else {
//           console.log('1 product updated');
//           res.json({ result: _result });
//         }
//       }
//     );
// });

// // This section will help you delete a record
// recordRoutes.route('/producto/eliminar/:id').delete((req, res) => {
//   // Delete documents
//   const dbConnect = dbo.getDb();
//   // console.log(req.body.id);
//   console.log(req.params.id);
//   const productoQuery = { _id: new ObjectID(req.params.id) };

//   dbConnect.collection('productos').deleteOne(productoQuery, function (err, _result) {
//     if (err) {
//       res.status(400).send(`Error deleting listing with id ${productoQuery._id}!`);
//     } else {
//       console.log('1 document deleted');
//       res.json({ status: 'deletion successful' });
//     }
//   });
// });

module.exports = recordRoutes;