const User = require('../models/UserModel')

module.exports = {
    register: async (req, res) => {
        let errors = []
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            errors.push('Preencha todos os campos!')
        }

        if (password.length < 6) {
            errors.push('A senha deve ter 8 ou mais caracteres')
        }

        if (errors.length > 0) {
            req.flash('errors', errors)
            res.redirect('/')
        } else {
            try {
                let user = await User.findOne({ email })
                if (user) {
                    errors.push('Usuário ja cadastrado!')
                    req.flash('errors', errors)
                    res.redirect('/')
                }
                user = new User({ name, email, password })
                await user.save()
                req.flash('success', 'Usuário criado com sucesso')
                res.redirect('/')
            } catch (e) {
                console.log(e)
            }
        }
    }
}

