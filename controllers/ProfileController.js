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
}

module.exports = Controller