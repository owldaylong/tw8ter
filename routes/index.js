const express = require('express')
const router = express.Router()
const port = 3000
const Landing = require("../controllers/landing")
const Home = require("../controllers/UserController")
const Post = require("../controllers/home")
const register = require("./register")
const profile = require("./profiles");
// const posts = require("./post");
const login = require("./login");
const {isLoggedin, isAdmin} = require("../middlewares/login")

router.get("/", Landing.landing)
router.use("/register", register)
router.use("/profile", profile)
router.use("/login", login)

router.use(isLoggedin)

router.get("/home", Home.home)
router.post("/home", Post.postPost)
router.get("/logout", Home.logout )



module.exports = router