const express = require("express")
const router = express.Router()
const Controller = require("../controllers/UserController")

router.get("/", Controller.getRegister)
router.post("/", Controller.postRegister)

module.exports = router