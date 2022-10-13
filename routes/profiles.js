const express = require("express")
const router = express.Router()
const Controller = require("../controllers/ProfileController")
const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    } 
})

const upload = multer({storage : storage})

router.get("/:id", Controller.renderEdit)
router.post("/:id",upload.single('profilePicture'),Controller.handlerEdit)

module.exports = router