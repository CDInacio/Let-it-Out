const mongoose = require('mongoose')

databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_KEY, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log(error)
    }
}

module.exports = databaseConnection