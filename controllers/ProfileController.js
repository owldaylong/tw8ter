const { Profile } = require("../models")
const { Op } = require("sequelize")

class Controller {
    // get profile form
    static getProfile(req, res) {
        res.render("profile-custom")
    }
    // create profile 
    static createProfile(req, res) {
        const { profilePicture, firstName, lastName } = req.body

        Profile.create({ profilePicture, firstName, lastName})
            .then(newProfile => {
                res.redirect("/home")
            })
            .catch(err => {
                res.send(err)
            })
    }
    static renderEdit(req,res){
        let id = req.params.id
        Profile.findOne({
            where: id
        })
        .then((profile)=>{
            res.render('profile-custom', {profile})
        })
    }
    static handlerEdit(req,res){
        let id = req.params.id
        let {profilePicture, firstName, lastName} = req.body
        Profile.update({
            profilePicture, firstName, lastName
        },{
            where : id
        })
        .then((profile)=>{
            res.redirect('/home')
        })
        .catch((err)=>{
            res.send(err)
        })
    }
}

module.exports = Controller