require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;
const User = require('./models/User')

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');

app.use('/auth', userRoutes);
app.use('/room', roomRoutes);

app.get('/', (req, res) => {
    res.json({message: 'Hello Express!'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://rachape:rachape@rachape-app.jdlad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectamos ao MongoDB! Porta ' + PORT)
    app.listen(PORT)
})
.catch((err) => console.log(err))
