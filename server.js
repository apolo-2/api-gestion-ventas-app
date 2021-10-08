// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import express from 'express';
import dotenv from 'dotenv';
import Cors from 'cors';
import { connectServer } from './db/db.js';
import rutasProducto from './views/producto/routes.js';
// import rutasUsuario from './views/user/routes.js';
// import rutasVenta from './views/sale/routes.js';

dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(Cors());
app.use(rutasProducto);
// app.use(rutasUsuario);
// app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
};

connectServer(main);

// Antigua estructura del profesor
/*
require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');
const dbo = require('./db/conn');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(require('./routes/producto'));

// Global error handling
app.use(function (err, _req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
// perform a database connection when the server starts
dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
  
    // start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
});
*/