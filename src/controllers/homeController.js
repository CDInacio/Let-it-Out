const Story = require('../models/StoryModel')

module.exports = {
   index: (req, res) => {
       res.render('homePage')
   }
}

