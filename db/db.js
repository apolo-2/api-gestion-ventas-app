// cluster: apolo2-apps
// db: admin-ventas-app

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const connectServer = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    baseDeDatos = db.db('admin-ventas-app');
    console.log('baseDeDatos exitosa');
    return callback();
  });
};

const getDB = () => {
  return baseDeDatos;
};

export { connectServer, getDB };


// Antigua estructura de la API segun el profesor.
/*
const { MongoClient } = require('mongodb');
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('admin-ventas-app');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
*/