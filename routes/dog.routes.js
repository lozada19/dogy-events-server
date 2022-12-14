const router = require("express").Router();
const DogModel = require("../models/Dog.model");
const isAuthenticated = require("../middlewares/isAuthenticated")
const isDogOwner= require("../middlewares/isDogOwner")


//-------------------- CREAR UN PERRITO ------------ //
// POST "/api/dog"
router.post("/", isAuthenticated, async(req,res, next) => {
  
   // console.log("CREAR", req.body)
   // console.log("PAYLOAD", req.payload) // EN EL REQ.PAYLOAD UNDEFINED
  
   
    try {

        const newDog = await DogModel.create({

            namedog: req.body.namedog,
            dateofBirth: req.body.dateofBirth,
            breed: req.body.breed,
            aboutme: req.body.aboutme,
            image: req.body.image,
            owner: req.payload._id // preguntar si se puede hacer asi URGE

        })
      

        res.json(newDog)

    } catch (error) {
        next(error)
    }
})

//-------------------- LISTA, TODOS LOS PERRITOS --------- //
// GET "/api/dog"

router.get("/",isAuthenticated, async (req, res, next) => {
    try {
        const allDog = await DogModel.find().select("namedog image")
        res.json(allDog) // aqui se envia una respuesta a la bd de frontend
    } catch (error) {
        next(error)
    }
})

//------------------- MIS PERRITOS ------------------//   PREGUNTAR URGE
// GET "/api/dog/myDog"
router.get("/myDog", isAuthenticated, async (req, res, next) => {

try {
    const myDogList = await DogModel.find({owner: req.payload._id})
   res.json(myDogList)
    
    //res.json("wiiii funciona ")
} catch (error) {
    next(error)
}
})


// ------------------- DETALLES DE UN PERRITO -----------//
// GET "/api/dog/:dogId"
router.get("/:dogId",isAuthenticated, async (req, res, next) => {
    try {
        const dogDetails = await DogModel.findById(req.params.dogId).populate("owner")
        
        res.json(dogDetails)

    } catch (error) {
        next(error)
    }
})


// ------------------- ELIMINAR UN PERRITO --------------//
// DELETE "api/dog/:dogId"
router.delete("/:dogId",isAuthenticated, async (req, res, next) => {

    try {
        await DogModel.findByIdAndDelete(req.params.dogId)
        res.json("borrado")
    } catch (error) {
        next(error)
    }

})


//-------------------- EDITAR UN PERRITO -----------------//
//PATCH "/api/dog/:dogId"
router.patch("/:dogId", isAuthenticated, isDogOwner, async (req, res, next) => {
    try {
    
        await DogModel.findByIdAndUpdate(req.params.dogId, {
            namedog: req.body.namedog,
            dateofBirth: req.body.dateofBirth,
            breed: req.body.breed,
            aboutme: req.body.aboutme,
            image: req.body.image,
        })


        res.json("Actualizado")
    } catch (error) {
        next(error)
    }
})




module.exports = router;