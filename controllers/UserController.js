const { User, Profile } = require("../models")
const { Op } = require("sequelize")
const bcrypt = require('bcryptjs')
// const { getProfile } = require("./ProfileController")

class Controller {
    // get register form 
    static getRegister(req, res) {
        res.render("register-page")
    }
    // post register
    static postRegister(req, res) {
        const { username, email, password, role, firstName, lastName } = req.body
        User.createUser(username, email, password, role)
            .then((createdUser) => {
                return User.findOne({
                    where: {username}
                })
            })
            .then((findUsername) => {
                return Profile.create({UserId:findUsername.id, firstName, lastName })
            })
            .then(() => {
                res.redirect("/")
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static renderLogin(req, res){
        let {errors} = req.query
        res.render('login-page')
    }
    static handlerLogin(req,res){
        let {username, password} = req.body

        User.findOne({
            where: {username}
        })
        .then((login)=>{
        if (login) {
            const validPassword = bcrypt.compareSync(password, login.password)
            if (validPassword) {
                req.session.userId = login.id
                req.session.role = login.role
                res.redirect('/home')
            } else {
                const errors = 'Invalid password'
                res.redirect(`/login?error=${errors}`)
            }
        } else {
            const errors = 'Username does not exists'
            res.redirect(`/login?error=${errors}`)
        }
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }
    static home(req,res){
        let userData
        let profileData

        User.findAll({
            include: [Profile]
        })
        .then((data)=>{
            userData = data
            return Profile.findAll()
        })
        .then((data)=>{
            profileData = data
            return User.findByPk(req.session.userId)
        })
        .then((data)=>{
            res.render('home', { userData, profileData, data})
        })
    }
    
}

module.exports = Controller