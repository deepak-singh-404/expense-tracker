const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        default: "debit",
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    month: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    paymentMode:{
        type: String,
        required: true,
        trim: true
    },
    paymentModePlatfrom : {
        type: String,
        trim: true
    },
    timestamp: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Data", dataSchema);