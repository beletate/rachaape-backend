const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const LocatorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    dtBirth: {
        type: Date,
        require: true,
    },
    phoneNumber: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    rooms: {
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

LocatorSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const Locator = mongoose.model('Locator', LocatorSchema)

module.exports = Locator