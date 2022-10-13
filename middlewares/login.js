const isLoggedin = function (req, res, next) {
    if(!req.session.userId) {
        const msg = 'You have to login first'
        res.redirect(`/login?error=${msg}`)
    } else {
        next()
    }
}

const isAdmin = function (req, res, next) {
    if(req.session.userId && req.session.role != 'Admin') {
        const msg = 'You need an admin permission'
        res.redirect(`/home?error=${msg}`)
    } else {
        next()
    }
}

module.exports = {isLoggedin, isAdmin}
