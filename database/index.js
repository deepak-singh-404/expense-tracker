const mongoose = require('mongoose')

const connectDatabase = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD), { useNewUrlParser: true, useUnifiedTopology: true })
            console.log("===DB CONNECTED===")
            resolve({ message: "Database Connected" })
        }
        catch (error) {
            reject(error)
        }
    })
}

module.exports = { connectDatabase }