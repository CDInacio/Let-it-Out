const Story = require('../models/StoryModel')

module.exports = {
    writeStoryPage: (req, res) => {
        res.render('writeStory')
    },
    writeStory: async function (req, res) {
        try {
            req.body.user = req.user.id
            await Story.create(req.body)
            res.redirect('/user')
        } catch (error) {
            console.log(error)
        }
    },
    singleHistory: async (req, res) => {
        try {
            const story = await Story.findById(req.params.id).populate('user').lean()

            if (!story) {
                res.render('404')
            }
            //if(story.user._id != req.user.id || story.status == 'private')
           
            res.render('singleStory', {
                story: story
            })
            
        } catch (error) {
            console.log(error)
            res.render('404')
        }
    },
    allStories: async (req, res) => {
        try {
            const stories = await Story.find({ status: 'public' }).populate('user').sort({ createdAt: 'desc' }).lean()
            res.render('stories', {
                stories
            })
        } catch (error) {
            console.log(error)
        }
    },
    deleteStory: async (req, res) => {
        try {
            const story = await Story.findById(req.params.id).lean()

            if (!story) {
                return res.send('error')
            }

            if (story.user != req.user.id) {
                return res.redirect('/user')
            } 

            await Story.remove({ _id: req.params.id })
            res.redirect('/user')
            
        } catch (error) {
            console.log('error')
        }
    },
    showEditStoryPage: async (req, res) => {
        try {
            const story = await Story.findById(req.params.id).lean()

            if (!story) {
                return res.render('404')
            }

            //if(story.user._id != req.user.id || story.status == 'private')
            if (story.user._id != req.user.id) {
                res.render('404')
            } 

            return res.render('editStory', {
                story
            })
            
        } catch (error) {
            console.log(error)
            res.render('404')
        }
    },
    editStory: async (req, res) => {
        try {
            let story = await Story.findById(req.params.id).lean()

            if (!story) {
                res.render('404')
            }

            if (story.user._id != req.user.id) {
               res.redirect('/user/stories')
            }

            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })

            res.redirect('/user')

        } catch (error) {
            console.log('error')
        }
    }
}
