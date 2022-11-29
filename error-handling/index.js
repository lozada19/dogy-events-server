module.exports = (app) => {
  app.use((req, res, next) => {
    // este middleware se ejecuta cuando la página solicitada no está disponible
    res.status(404).json({ errorMessage: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // cada vez que llame a next (err), este middleware manejará el error
    // siempre registra el error
    console.error("ERROR", req.method, req.path, err);

    if (err.status === 401) {
      //si el token no es valido 
      res.status(401).json({errorMessage: "Usuario no autorizado"})
    }

    // solo renderizar si el error ocurrió antes de enviar la respuesta
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          errorMessage: "Internal server error. Check the server console",
        });
    }
  });
};
