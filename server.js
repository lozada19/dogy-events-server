const app = require("./app");

// ℹ️ Establece el PUERTO para que nuestra app tenga acceso a él. Si no se ha configurado env, lo codificamos a 3000
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
