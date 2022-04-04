const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../database/models/user')
const { formattedTimestamp } = require('../utils/timestamp')
const keys = require('../config/keys');

const userRegister = async (req, res) => {
    try {
        let { name, email, phoneNumber, password } = req.body
        password = await bcrypt.hash(password, 5)
        const user = await new User({
            name,
            email,
            phoneNumber,
            password,
            timestamp: formattedTimestamp
        })
        await user.save()
        const token = await jwt.sign({ _id: user._id, name: name, phoneNumber: phoneNumber }, keys.secretKey, { expiresIn: 60 * 60 * 24 * 7 })
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Registerd Successfully.",
            token: 'Bearer ' + token,
            data: user
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const userLogin = async (req, res) => {
    try {
        let { phoneNumber, password } = req.body
        const user = await User.findOne({ phoneNumber })
        if (!user) {
            return res.status(200).json({
                statusCode: 404,
                success: false,
                message: "Invalid User."
            });
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if (!isCorrect) {
            return res.status(404).json({
                statusCode: 400,
                success: false,
                message: "Incorrect Password."
            });
        }
        const token = await jwt.sign({ _id: user._id, name: user.name, phoneNumber: phoneNumber }, keys.secretKey, { expiresIn: 60 * 60 * 24 * 7 })
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Logged in Successfully.",
            token: 'Bearer ' + token,
            data: user
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { userRegister, userLogin }