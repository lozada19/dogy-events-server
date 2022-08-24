
const DogModel = require("../models/Dog.model");


const isDogOwner =  async (req, res, next) =>  {

    const isdog = await DogModel.findById(req.params.dogId)
    try {
        if(isdog.owner == req.payload._id){
            next()
         }else {
             res.status(401).json({errorMessage:"No puedes editar"})
         }
        
    } catch (error) {
        next(error)
    }
    
}

module.exports = isDogOwner