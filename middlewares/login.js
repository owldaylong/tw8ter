const isLoggedin = function (req, res, next) {
    if(!req.session.userId) {
        const msg = 'You have to login first'
        res.redirect(`/login?errors=${msg}`)
    } else {
        next()
    }
}

const isAdmin = function (req, res, next) {
    if(req.session.userId && req.session.role != 'Admin') {
        const msg = 'You need an admin permission'
        res.redirect(`/home?errors=${msg}`)
    } else {
        next()
    }
}

module.exports = {isLoggedin, isAdmin}
