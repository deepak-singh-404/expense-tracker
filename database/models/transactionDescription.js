const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionDescriptionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("TransactionDescription", transactionDescriptionSchema);