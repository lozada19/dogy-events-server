// const router = require("express").Router();
// const DogModel = require("../models/Dog.model");
// const isAuthenticated = require("../middlewares/isAuthenticated")

// //----------- LISTA DE MIS PERRITOS ----------//
// // GET "/api/profile/myDog"
// router.get("/myDog", isAuthenticated, async (req, res, next) => {

//     try {
//         const myDogList = await DogModel.find({owner: req.payload._id})
//        res.json(myDogList)
        
//         //res.json("wiiii funciona ")
//     } catch (error) {
//         next(error)
//     }
// })