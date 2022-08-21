const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    count: {
        type: Number,
        default: 0
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

module.exports = mongoose.model("Category", categorySchema);