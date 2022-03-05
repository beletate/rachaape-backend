const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const TenantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    city: {
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
    persona: {
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

TenantSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const Tenant = mongoose.model('Tenant', TenantSchema)

module.exports = Tenant