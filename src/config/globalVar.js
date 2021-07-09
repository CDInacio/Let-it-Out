const {truncate} = require('../config/helper')

module.exports.globalVariables = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.stories = req.stories
    res.locals.user = req.user
    res.locals.moment = require('moment');
    res.locals.truncate = truncate
    next()
}

