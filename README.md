# Dogy Events - server 

## Descripcion 
- Es una app donde puedes crear eventos para tu mascota y tambien hacer inscribir a tu perrito en ellos

- Esta App se hizo en react 

## Estructura 

- pagina de inicio: El usuario puede ver acceder a la pagina de inicio ver las recetas e iniciar sesion y registarse 

- registarse: El usuario se tiene que registar para poder crear las recetas

- iniciar sesion: El usuario al iniciar sesion puede crear, eliminar editar y tener sus propias recetas en su perfil

- cerrar sesion: El usuario tiene que cerrar sesion para asegurarme de que nadie acceda a mi cuenta

# Rutas

# Registro de usuario 

- POST /auth/signup
    - res.status(400).json

# Iniciar sesion

- POST /auth/login
    - res.status(400).json

- payload
    -  _id: foundEmail._id,
    -  email: foundEmail.email

- authToken

# Verificar

- GET /auth/verify 
    - res.json(req.payload)

# ruta dog 

- POST "/api/dog"
    - res.json(newDog)

- GET "/api/dog"
    - res.json(allDog)

- GET "/api/dog/myDog"
    - res.json(myDogList)

- GET "/api/dog/:dogId"
    -  res.json(dogDetails)

- DELETE "api/dog/:dogId"

- PATCH "/api/dog/:dogId"

# ruta event

- POST "/api/event"
    - res.json(newEvent)

- GET "/api/event"
    - res.json(allEvent)

- GET "/api/event/myEvent"
    -  res.json(myEventList)

- GET "/api/event/:id"
    -  res.json(eventDetails)

- DELETE "api/event/:id"

- PATCH "/api/event/:id"

# ruta upload

-  POST "api/upload"

# middlewares

- isAuthenticate
- isDogOwner
- isEventOwner
- upload

## modelos

# User 

- username: 
   - type: String,
   - unique: true,
   - required: true,

- email: 
    - type: String,
    - unique: true,
    - required: true,

- password: 
   - type: String,
   - required: true,

# Dog 

- namedog: 
    - type: String,
    - required: true,

-  dateofBirth: 
    -  type: String,

- breed: 
    - type: String,

-  aboutme: 
    - type: String,

-  image: 
    - type: String,

- owner: 
    - type: Schema.Types.ObjectId,
    - ref: "User",

# event

- eventname: 
    - type: String,
    - required: true,

- date: 
   - type: String,
   - required: true,

- description: 
    - type: String,

- address: 
    - type: String,

- owner: 
    - type: Schema.Types.ObjectId,
    - ref: "User",

- pet: 
    - type: Schema.Types.ObjectId,
    - ref: "Dog",

-  image: 
    - type: String,


### Git
[Repository Link](https://github.com/rebloza/dogy-events-client)
[Repository Link](https://github.com/rebloza/dogy-events-server)
[Deploy Link](https://dogy-events.netlify.app/)

### Diapositivas
[Enlace Slides.com]()