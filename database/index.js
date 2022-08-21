const mongoose = require('mongoose')

const connectDatabase = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect("mongodb+srv://sample_project_user:m1RNPhjfk78CaxXl@cluster0.b6pao.mongodb.net/expense-tracker-prod?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
            console.log("DATABASE CONNECTED")
            resolve({ message: "Database Connected" })
        }
        catch (error) {
            reject(error)
        }
    })
}

module.exports = { connectDatabase }