const router = require("express").Router();

const uploader = require("../middlewares/uploader")

// POST "api/upload"
router.post("/", uploader.single("image"), (req, res,next) => {
    
    if(req.file === undefined) {
        res.status(400).json({errorMessage: "formato incorrecto"})
        return
    }
    res.json({imageUrl: req.file.path})

})


module.exports = router;