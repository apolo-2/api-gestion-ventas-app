// cluster: apolo2-apps
// db: admin-ventas-app

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


// gen desde mongo connection con driver
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://apolo2:<password>@apolo2-apps.jdkug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// sin driver
// mongodb+srv://apolo2:<password>@apolo2-apps.jdkug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority