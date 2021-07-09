const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
const passport = require('passport')

module.exports.login = (req, res, next) => {
     passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
}

module.exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}
