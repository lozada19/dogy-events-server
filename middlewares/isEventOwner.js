const EventModel = require("../models/Event.model");

const isEventOwner = async (req, res, next) => {
    const isEven = await EventModel.findById(req.params.eventId)

    try {
        if(isEven.owner == req.payload._id) {
            next()
        }else{
            res.status(401).json({errorMessage:"no puedes editar"})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = isEventOwner