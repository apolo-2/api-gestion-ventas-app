import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode  from 'jwt-decode';


const todoUsuarios = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  
  if (
    Object.keys(datosUsuario).includes('correo') &&
    Object.keys(datosUsuario).includes('nombre') &&
    Object.keys(datosUsuario).includes('rol') &&
    Object.keys(datosUsuario).includes('estado')
  ) {
    const baseDeDatos = getDB();
    // implementar código para crear vehículo en la BD
    await baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback);
  } else {
    return 'error';
  }
};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearUsuario = async (req, callback) => {
  // 6.1. obtener los datos del usuario desde el token
  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData']; //Verificar que el token contenga esta info de acuerdo a la regla creada desde Auth0
  console.log('user:',user);

  // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ correo: user.email }, async (err, response) => {
    console.log('response consulta bd', response);
    if (response) {
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(err, response);
    } else {
      // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
      user.auth0ID = user._id;
      delete user._id; //Eliminamos el id que entrega Auth0, no lo necesitamos.
      // user.rol = 'sin rol'; //Segun historias de usuario
      // user.estado = 'pendiente'; //Segun historias de usuario

      //Ajuste de acuerdo a nuestra coleccion usuarios
      const finalUser = {
        nombre: user.name,
        correo: user.email,
        rol :   '', // 'sin rol'; //Segun historias de usuario
        estado: 'Pendiente', //Segun historias de usuario
      }

      console.log('Final user to save:',finalUser)
      await crearUsuario(finalUser, (err, respuesta) => callback(err, user));
    }
  });
};

const editarUsuario = async (id, edicion, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('usuarios')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').deleteOne(filtroUsuario, callback);
};

export { todoUsuarios, crearUsuario, consultarUsuario, editarUsuario, eliminarUsuario, consultarOCrearUsuario };