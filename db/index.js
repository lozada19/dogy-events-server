// ℹ️ paquete responsable de hacer la conexión con mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Establece la URI de MongoDB para que nuestra aplicación tenga acceso a ella.
// Si no se ha configurado un entorno, lo configuramos dinámicamente con el nombre de la carpeta al crear la aplicación.

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/dogy-events-server";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
