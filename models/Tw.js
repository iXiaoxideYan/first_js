const mongoose = require('mongoose')

const Twschema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tw', Twschema);