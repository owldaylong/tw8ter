const { User, Profile, Post} = require('../models')

class Controller{
    static home(req,res){
        let userData
        let profileData

        User.findAll({
            include: [Profile, Post]
        })
        .then((data)=>{
            userData = data
            return Profile.findAll({
                where: {
                    id: req.session.userId
                }
            })
        })
        .then((data)=>{
            profileData = data
            return User.findByPk(req.session.userId)
        })
        .then((data)=>{
            res.render('home', { userData, profileData, data})
        })
    }
    static postPost(req,res){
        let {title, content, imageUrl} = req.body
        Post.create({title, content, imageUrl, UserId : req.session.userId})
        .then((data)=>{
            res.redirect('/home')
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = Controller