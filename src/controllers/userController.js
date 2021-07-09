const Story = require('../models/StoryModel')

module.exports = {
    index: async (req, res) => {
        try {
            const stories = await Story.find({ user: req.user.id }).lean()
            res.render('userPage', {stories})
        } catch (error) {
            console.log(error)
        }
    }
   
}
