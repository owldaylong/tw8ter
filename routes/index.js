const express = require('express')
const router = express.Router()
const port = 3000
const Controller = require("../controllers/landing")
const register = require("./register")
const profile = require("./profiles");
const posts = require("./profiles");

router.get("/", Controller.home)
router.use("/register", register)
router.use("/profile", profile)
// router.use("/posts", posts)


module.exports = router