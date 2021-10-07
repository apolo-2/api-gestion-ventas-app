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

module.exports = recordRoutes;