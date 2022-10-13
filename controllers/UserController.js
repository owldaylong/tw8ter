const { Model } = require("../models")
const { Op } = require("sequelize")

class Controller {
    // get register form 
    static getRegister(req, res) {
        res.render("register-page")
    }
    // post register form
    static postRegister(req, res) {
        const { username, email, password, role } = req.body

        User.create({ username, email, password, role })
            .then(newUser => {
                res.redirect("/profile")
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller