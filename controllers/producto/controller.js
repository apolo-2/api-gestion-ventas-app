import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const getAll = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("productos").find().limit(50).toArray(callback);
};

const getAvailableProducts = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("productos")
    .find({ estado: "Disponible" })
    .limit(50)
    .sort({ _id: 1 })
    .toArray(callback);
};

const create = async (datosProductos, callback) => {
  const baseDeDatos = getDB();
  console.log("llaves: ", Object.keys(datosProductos));
  if (
    Object.keys(datosProductos).includes("descripcion") &&
    Object.keys(datosProductos).includes("valorUnit") &&
    Object.keys(datosProductos).includes("estado")
  ) {
    // add creation date
    datosProductos["created"] = new Date();
    await baseDeDatos
      .collection("productos")
      .insertOne(datosProductos, callback);
  } else {
    return { err: "conditions not met", result: "" };
  }
};

const edit = async (id, data, callback) => {
  const filtro = { _id: new ObjectId(id) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("productos")
    .findOneAndUpdate(
      filtro,
      operacion,
      { upsert: true, returnNewDocument: true /*returnOriginal: true */ },
      callback
    );
};

const remove = async (id, callback) => {
  const filtro = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("productos").deleteOne(filtro, callback);
};

export { getAll, getAvailableProducts, create, edit, remove };
