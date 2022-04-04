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
        default: "debit"
    },
    transactionDescription: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
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

module.exports = mongoose.model("Data", dataSchema);