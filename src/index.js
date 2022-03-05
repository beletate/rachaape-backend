require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const User = require('./models/User')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const locatorRoutes = require('./routes/locatorRoutes')
const tenantRoutes = require('./routes/tenantRoutes')

app.use('locator/auth', locatorRoutes)
app.use('tenant/auth', tenantRoutes)
app.use('room', tenantRoutes)

app.get('/', (req, res) => {
    res.json({message: 'Hello Express!'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@rachape-app.jdlad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3001)
})
.catch((err) => console.log(err))
