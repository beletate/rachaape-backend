const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const RoomSchema = new mongoose.Schema({
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    cityCode: {
        type: Number,
        require: true,
    },
    district: {
        type: String,
        require: true,
    },
    photos: {
        type: Array,
    },
    details: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const Room = mongoose.model('Room', RoomSchema)

module.exports = Room