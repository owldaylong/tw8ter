const express = require("express")
const router = express.Router()
const Controller = require("../controllers/ProfileController")
const multer = require('multer')

router.get("/", Controller.getProfile)
router.post("/", Controller.createProfile)

module.exports = router