const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const cors = require('cors')
dotenv.config({})
const app = express()

const { connectDatabase } = require('./database/index')

app.use(express.json())
app.use(cors())

//Passport Middleware
app.use(passport.initialize());

//Passport Config.
require('./config/passport')(passport)

app.use('/api/v1', require('./routes/index'))

const bootstrap = ()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            await connectDatabase();
            resolve(true);
            return;
        }
        catch(error){
            reject(error);
            return;
        }
    })
}

const PORT = process.env.PORT || 5000

bootstrap().then(()=>{
    app.listen(PORT, ()=>{
        console.log({
            "instance": true,
            "boostrap": true,
            "message": "SERVER IS UP.",
            "port": PORT
        })
    })
}).catch((error)=>{
    console.log({
        "instance": false,
        "boostrap": false,
        "error": error.message
    })
})

