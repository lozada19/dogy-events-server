// ℹ️ Obtiene acceso a las variables/configuraciones de entorno
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// Maneja solicitudes http (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ Esta función se exporta desde la carpeta de configuración. Ejecuta la mayoría de piezas de middleware
require("./config")(app);

// 👇 Comience a manejar rutas aquí
// Al contrario de la versión de vistas, todas las rutas se controlan desde route/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

// ❗ Para manejar errores. Rutas que no existen o errores que manejas en rutas específicas
require("./error-handling")(app);

module.exports = app;
