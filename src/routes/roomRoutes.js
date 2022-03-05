const router = require('express').Router()
const Room = require('../models/Room')

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        if (await Room.findOne({ email })) return res.send(400).send({ error: 'Esse email já foi cadastrado em outra conta.' })

        await Room.create(req.body)
        res.status(201).json({ message: 'Cadastro concluído com sucesso.' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/register', async (req, res) => {

    try {
        const people = await Room.find()

        res.status(200).json(people)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.get('/register/:id', async (req, res) => {

    try {
        const room = await Room.findOne({ _id: req.params.id })

        if (!room) {
            res.status(422).json({ message: 'O usuáro não foi encontrado.' })
            return
        }

        res.status(200).json(room)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.patch('/register/:id', async (req, res) => {

    const { city, state, cityCode, district, photos, details } = req.body

    const updatedAt = Date.now();

    const room = {
        city,
        state,
        cityCode,
        district,
        photos,
        details,
        updatedAt
    }

    try {
        const updatedRoom = await Room.updateOne({ _id: req.params.id }, room)

        if (updatedRoom.matchedCount === 0) {
            res.status(422).json({ message: 'O usuáro não foi encontrado.' })
            return
        }

        res.status(200).json(room)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})
router.delete('/register/:id', async (req, res) => {

    const room = await Room.findOne({ _id: req.params.id })


    if (!room) {
        res.status(422).json({ message: 'O usuáro não foi encontrado.' })
        return
    }

    try {
        await Room.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: 'Usuário removido com sucesso.' })
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

module.exports = router