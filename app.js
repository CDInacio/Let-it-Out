require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
const databaseConnection = require('./src/config/db')
const router = require('./src/routes/routes')
const session = require('express-session')
const flash = require('connect-flash')
const { globalVariables }  = require('./src/config/globalVar')
const mongoDBSession = require('connect-mongodb-session')(session);
const passport = require('passport')
const methodOverride = require('method-override')

// connect to the db
databaseConnection()

require('./src/config/passport')(passport)

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )

// set view engine
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// static folder
app.use(express.static(path.join(__dirname, '/public')))

const store = new mongoDBSession({
    uri: process.env.DB_KEY,
    collection: 'mySessions'
})

//sessions
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash
app.use(flash())

//global variables
app.use(globalVariables)

// all my routes
app.use(router)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))