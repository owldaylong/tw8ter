const express = require("express")
const router = express.Router()
const Controller = require("../controllers/UserController")


router.get('/', Controller.renderLogin)
router.post('/', Controller.handlerLogin)


module.exports =router