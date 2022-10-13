const { User, Profile } = require("../models")
const { Op } = require("sequelize")
const { getProfile } = require("./ProfileController")

class Controller {
    // get register form 
    static getRegister(req, res) {
        res.render("register-page")
    }
    // post register
    static postRegister(req, res) {
        const { username, email, password, role, firstName, lastName } = req.body

        User.create({ username, email, password, role })
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
}

module.exports = Controller