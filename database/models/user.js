const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        trim:true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);