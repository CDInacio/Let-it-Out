const express = require('express')
const router = express.Router()

const { loginRequired, isLogged } = require('../middleware/auth')
const signupController = require('../controllers/signupController')
const loginController = require('../controllers/loginController')
const homeController = require('../controllers/homeController')
const storyController = require('../controllers/storyController')
const userController = require('../controllers/userController')

// login routes
router.get('/logout', loginController.logout)

// register routes
router.post('/signup', signupController.register)

// main page routes
router.get('/', isLogged, homeController.index)
router.post('/', loginController.login)

// user route
router.get('/user', loginRequired, userController.index)

// user write story route
router.get('/user/writeStory', loginRequired, storyController.writeStoryPage)
router.post('/user/writeStory', loginRequired, storyController.writeStory)

// user show stories route
router.get('/user/story/:id', loginRequired, storyController.singleHistory)
router.get('/user/stories', loginRequired, storyController.allStories)

// user delete and update story route
router.delete('/user/story/:id', loginRequired, storyController.deleteStory)
router.get('/user/story/edit/:id', loginRequired, storyController.showEditStoryPage)
router.put('/user/story/edit/:id', loginRequired, storyController.editStory)



module.exports = router