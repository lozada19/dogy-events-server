//Reutilizamos esta importación para tener acceso a la propiedad `body` en las solicitudes
const express = require("express");

// ℹ️ Responsable de los mensajes que ve en la terminal a medida que ingresan las solicitudes
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Necesario cuando tratamos con cookies (lo haremos cuando tratemos con autenticación)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

// ℹ️ Necesitaba aceptar solicitudes de 'afuera'. CORS significa intercambio de recursos de origen cruzado
// a menos que la solicitud sea del mismo dominio, por defecto express no aceptará solicitudes POST
const cors = require("cors");

// Middleware configuration
module.exports = (app) => {
  // Debido a que este es un servidor que aceptará solicitudes externas y estará alojado en un servidor con un "proxy", express necesita saber que debe confiar en esa configuración.
  // Los servicios como heroku usan algo llamado proxy y necesita agregar esto a su servidor
  app.set("trust proxy", 1);

  // controla un encabezado muy específico para pasar encabezados desde la interfaz
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );

  // En el entorno de desarrollo, la aplicación registra
  app.use(logger("dev"));

  // Para tener acceso a la propiedad `cuerpo` en la solicitud
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
