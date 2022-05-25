const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const RoomSchema = new mongoose.Schema({
    photos: {
        type: Array,
    },
    type: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    cep: {
        type: Number,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    neighborhood: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    additional: {
        type: String,
    },
    street: {
        type: String,
        required: true,
    },
    details: {
        description: {
            type: String,
            required: true,
        },
        people: {
            type: Boolean,
            required: true,
        },
        visit: {
            type: Boolean,
            required: true,
        },
        furniture: {
            type: Boolean,
            required: true,
        },
        wifi: {
            type: Boolean,
            required: true,
        },
        garage: {
            type: Boolean,
            required: true,
        },
        pets: {
            type: Boolean,
            required: true,
        },
        party: {
            type: Boolean,
            required: true,
        },
        smoker: {
            type: Boolean,
            required: true,
        },
        song: {
            type: Boolean,
            required: true,
        },
    },
    owner: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Room = mongoose.model('Room', RoomSchema)

module.exports = Room