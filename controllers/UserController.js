const { User, Profile, Post } = require("../models")
const { Op, where } = require("sequelize")
const bcrypt = require('bcryptjs')
// const { getProfile } = require("./ProfileController")

class Controller {
    // get register form 
    static getRegister(req, res) {
        let {errors} = req.query
        res.render("register-page", {errors})
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
                let errors = err.errors.map(el=> el.message)
                // res.send(err)
                res.redirect(`/register?errors=${errors}`)
            })
    }
    static renderLogin(req, res){
        let {errors} = req.query
        res.render('login-page', {errors})
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
                res.redirect(`/login?errors=${errors}`)
            }
        } else {
            const errors = 'Username does not exists'
            res.redirect(`/login?errors=${errors}`)
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
        let {errors} = req.query
        let {search} = req.query
        let optionPost = {
            model : Post,
            where : {}
        }
        if (search) {
            optionPost.where.content = {[Op.iLike] : `%${search}%`}
        }
        User.findAll({
            include: ['Profile',optionPost]
        })
        .then((data)=>{
            userData = data
            console.log(userData[0].Profile.profilePicture);
            return Profile.findAll()
        })
        .then((data)=>{
            profileData = data
            return User.findByPk(req.session.userId)
        })
        .then((data)=>{
            res.render('home', { userData, profileData, data, errors})
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static renderUsersList(req,res){
        User.findAll()
        .then((data)=>{
            res.render('users-list', {data})
        })
    }
    static deleteUser(req,res){
        let id = req.params.id;
        User.destroy({
            where: { 
                id
            }
        })
        .then((data)=>{
            res.redirect('/listUsers')
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static handlePost(req,res) {
        const { title, content, imgURL} = req.body
        Post.create({ title, content, imgURL, UserId : req.session.userId})
        .then(() => {
            res.redirect('/home')
        })
        .catch((err) => {
            res.send(err)
        })
    }
    
}

module.exports = Controller