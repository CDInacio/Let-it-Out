module.exports = {
    loginRequired: function (req, res, next) {
        if(!req.isAuthenticated()) {
            req.flash('errors', 'Você precisar logar para ver esta página!')
            return res.redirect('/')
        }
        next()
    },
    isLogged: (req, res, next) => {
        if(req.isAuthenticated()) {
            res.redirect('/user')
        }
        next()
    }
}