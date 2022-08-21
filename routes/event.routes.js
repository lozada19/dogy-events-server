const router = require("express").Router();
const EventModel = require("../models/Event.model");
const DogModel = require("../models/Dog.model")
const isAuthenticated = require("../middlewares/isAuthenticated")


//-------------------- CREAR UN EVENTO ------------ //
// POST "/api/event"
router.post("/", isAuthenticated,  async (req, res, next) => {
     
    console.log("REQ.BODY", req.body)
    console.log("PAYLOAD", req.payload)
    try {
        const newEvent = await EventModel.create({
           eventname: req.body.eventname,
           date: req.body.date,
           description: req.body.description,
           address: req.body.address,
           owner: req.payload._id,
          
        })
        //res.json("funciona wiiiii")
        res.json(newEvent)

    } catch (error) {
        next(error)
    }
})

//-------------------- LISTA, TODOS LOS EVENTOS --------- //
// GET "/api/event"
router.get("/", async (req, res, next) => {
    try {
        const allEvent = await EventModel.find().select("namedog")
        res.json(allEvent) // aqui se envia una respuesta a la bd de frontend
       // res.json("funciona wiiiiii")
    } catch (error) {
        next(error)
    }
})

//------------------- MIS EVENTOS ------------------//
// GET "/api/event/myEvent"
router.get("/myEvent", isAuthenticated, async (req, res, next) => {

    try {
        const myEventList = await EventModel.find({owner: req.payload._id})
       res.json(myEventList)
        
        //res.json("wiiii funciona ")
    } catch (error) {
        next(error)
    }
    })

// ------------------- DETALLES DE UN EVENTO -----------//
// GET "/api/event/:id"
router.get("/:eventId", async (req, res, next) => {
    try {
        const eventDetails = await EventModel.findById(req.params.eventId).populate("owner pet")
    
        res.json(eventDetails)
        //res.json("funciona wiiii")
    } catch (error) {
        next(error)
    }
})

// ------------------- ELIMINAR UN EVENTO --------------//
// DELETE "api/event/:id"
router.delete("/:eventId", async (req, res, next) => {

    try {
        await EventModel.findByIdAndDelete(req.params.eventId)
        res.json("borrado")
    } catch (error) {
        next(error)
    }

})

//-------------------- EDITAR UN EVENTO -----------------//
//PATCH "/api/event/:id"

router.patch("/:eventId", async (req, res, next) => {
     
    try {
        await EventModel.findByIdAndUpdate(req.params.eventId, {
           eventname: req.body.eventname,
           date: req.body.date,
           description: req.body.description,
           address: req.body.address,
        })
        res.json("editado")

    } catch (error) {
        next(error)
    }
})

router.patch("/:eventId/addPet", isAuthenticated, async (req, res, next) => {
     
    try {
        const myDog = await DogModel.find({owner: req.payload._id})// BUSCO MIS PERROS CON EL USRUARIO ACTIVO
        console.log("MI PERRO", myDog)
        await EventModel.findByIdAndUpdate(req.params.eventId, { // BUSCO EL EVENTO 
            $push: {pet:myDog} // AQUI SE APUNTAN LOS PERROS
        })
        res.json("editado")

    } catch (error) {
        next(error)
    }
})






module.exports = router;