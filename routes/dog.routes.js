const router = require("express").Router();
const DogModel = require("../models/Dog.model");
const isAuthenticated = require("../middlewares/isAuthenticated")


//-------------------- CREAR UN PERRITO ------------ //
// POST "/api/dog"
router.post("/", isAuthenticated, async(req,res, next) => {
  
    console.log("CREAR", req.body)
    console.log("PAYLOAD", req.payload) // EN EL REQ.PAYLOAD UNDEFINED
  
   
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

router.get("/", async (req, res, next) => {
    try {
        const allDog = await DogModel.find().select("namedog")
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

        //let isOwer = false
       // if (req.payload.user._id == dogDetails.owner._id){
          //  isOwer = true
      //  } else {
      //      isOwer = false
      //  }
        res.json(dogDetails)
          //   {
           // dogDetails,
          //  isOwer
       // })
    } catch (error) {
        next(error)
    }
})


// ------------------- ELIMINAR UN PERRITO --------------//
// DELETE "api/dog/:dogId"
router.delete("/:dogId", async (req, res, next) => {

    try {
        await DogModel.findByIdAndDelete(req.params.dogId)
        res.json("borrado")
    } catch (error) {
        next(error)
    }

})


//-------------------- EDITAR UN PERRITO -----------------//
//PATCH "/api/dog/:dogId"
router.patch("/:dogId", async (req, res, next) => {
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