const express = require('express')
const router = express.Router()
const port = 3000
const Controller = require("../controllers/MainController")
const register = require("./register")
const profiles = require("./profiles");
const posts = require("./profiles");

router.get("/", Controller.home)
router.use("/register", register)
// router.use("/profiles", profiles)
// router.use("/posts", posts)


module.exports = router