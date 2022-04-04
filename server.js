const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
dotenv.config({})
const app = express()

const { connectDatabase } = require('./database/index')

//
app.use(express.json())

//Passport Middleware
app.use(passport.initialize());

//Passport Config.
require('./config/passport')(passport)

app.use('/api/v1', require('./routes/index'))

const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
    try {
        await connectDatabase()
        console.log("SERVER LISTENING ON PORT ", PORT)
    }
    catch (error) {
        console.log("====SERVER UP ERROR====")
        console.log(error.message)
    }
})

