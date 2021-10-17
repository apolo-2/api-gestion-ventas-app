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
    console.log('Conectado a la BD exitosamente!');
    return callback();
  });
};

const getDB = () => {
  return baseDeDatos;
};

export { connectServer, getDB };