const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const dogRoutes = require("./dog.routes")
router.use("/dog", dogRoutes)

const eventRoutes = require("./event.routes")
router.use("/event", eventRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

// const profileRoutes = require("./profile.routes")
// router.use("/profile", profileRoutes)

module.exports = router;
