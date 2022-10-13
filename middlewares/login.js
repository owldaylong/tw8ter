const isLoggedin = function (req, res, next) {
    console.log(req.session);
    if(!req.session.userId) {
        const msg = 'You have to login first'
        res.redirect(`/login?error=${msg}`)
    } else {
        next()
    }
}

module.exports = isLoggedin
