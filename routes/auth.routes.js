const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/isAuthenticated")


//------------ REGISTRI ---------- PERFIL DE USUARIO Y CREAR EN BD ----------// recibir
// Ruta tipo POST "/api/auth/signup"

router.post("/signup", async (req, res, next) => {
  console.log(req.body); // req.body vemos toda nuestra info

  // validar si el campo esta vacio, null, undifain, algo que no existe
  // se usa status para dar un tipo de error
  if (
    req.body.username === "" ||
    req.body.email === "" ||
    req.body.password === ""
  ) {
    res
      .status(400)
      .json({ errorMessage: "Tienes que rellenar todos los campos" });
    return;
  }

  // Validar la contraseña

  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (passwordRegex.test(req.body.password) === false) {
    res
      .status(400)
      .json({
        errorMessage:
          "Contraseña no  valida, debes tener 8 caracteres, 1 numero ",
      });
    return;
  }

  try {
    // validar si el usuario ya esta registrado

    // validar email

    const foundEmail = await User.findOne({ email: req.body.email });
    console.log(foundEmail); // se va a ver si esta o no

    if (foundEmail === req.body.email) {
      res
        .status(400)
        .json({ errorMessage: "Ya existe un usuario con este email" });
      return;
    }

    // validar name

    const foundName = await User.findOne({ name: req.body.name });
    console.log(foundName); // se va a ver si esta o no

    if (foundName === req.body.name) {
      res
        .status(400)
        .json({ errorMessage: "Ya existe un usuario con este nombre" });
      return;
    }

    // encriptar la contaseña
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, salt); // la contaseña incriptada

    // se crea el usuario en la base da datos
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    res.status(201).json("mi primera ruta wiiiii funciona");
  } catch (error) {
    next(error);
  }
});

//--------------------- INICIAR SESION --------  validar credenciales del usuario

router.post("/login", async (req, res, next) => {
  console.log(req.body); // em req.body estan los datos

  // validar si el campo esta vacio
  if (req.body.email === "" || req.body.password === "") {
    res
      .status(400)
      .json({ errorMessage: "Tienes que rellenar todos los campos" });
    return;
  }

  try {
    // buscamos al usuario si exiet con ese  con el email
    const foundEmail = await User.findOne({ email: req.body.email });
    console.log(foundEmail); // se va a ver si esta o no

    if (foundEmail === null) {
      res.status(400).json({ errorMessage: "usuario no registado " });
      return;
    }

    // vericar la contaseña
    const passwordValid = await bcrypt.compare(req.body.password, foundEmail.password) // esta password viene del body, y el segundo es la contaseña que viene del foundEmail
    console.log("passwordValid", passwordValid) // en el terminal se ve true o false
    
    // si no es correcta notificar al frond
    if(passwordValid === false){
        res.status(400).json({errorMessage: "Contraseña invalida"})
        return
    }

    // verificamos si el usuario es quien dice ser... creamos la sesion
    
    // crear el payload => info del usuario que esta creando el token  ==

    const payload = {
        _id: foundEmail._id,
        email: foundEmail.email
    }

    // se genera el token 
    const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {algorithm: "HS256", expiresIn: "200h"}
    )

    res.json({authToken: authToken})
    
  } catch (error) {
    next(error);
  }
});

// ruta tipo GET -------- VERIFICAR SI EL USUARIO YA ESTA VALIDADO Y ACTIVO -----// 
router.get("/verify", isAuthenticated, (req, res, next) => {

    console.log("se verifica el token")
    console.log(req.payload)

    res.json(req.payload)// recibe en el fron toda la info
})

module.exports = router;
