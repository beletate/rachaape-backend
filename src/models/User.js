const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    photo: {
        type: Object,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    minPrice: {
        type: String,
        require: true,
    }, 
    maxPrice: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema)

module.exports = User