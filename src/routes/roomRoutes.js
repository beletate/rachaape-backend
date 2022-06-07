const router = require('express').Router()
const Room = require('../models/Room')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    try {

        let room = await Room.create(req.body)
        res.status(201).json({ message: 'Ok!', room })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/', async (req, res) => {

    try {
        const rooms = await Room.find()

        res.status(200).json(rooms)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.patch('/edit/:id', async (req, res) => {

    const roomBody = req.body
    console.log(roomBody)

    try {
        const updatedRoom = await Room.updateOne({ _id: req.params.id }, roomBody)

        if (updatedRoom.matchedCount === 0) {
            res.status(422).json({ message: 'O quarto não foi encontrado!' })
            return
        }

        res.status(200).json("Quarto atualizado!")
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.get('/all/:id', async (req, res) => {

    try {
        const rooms = await Room.find({
            owner: {
                $ne: req.params.id
            }
        })

        res.status(200).json(rooms)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})


router.get('/owner/:id', async (req, res) => {

    try {
        const room = await Room.find().where('owner').in(req.params.id)

        if (!room) {
            res.status(422).json({ message: 'O quarto não foi encontrado!' })
            return
        }

        res.status(200).json(room)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.delete('/delete/:id', async (req, res) => {

    const room = await Room.findOne({ _id: req.params.id })


    if (!room) {
        res.status(422).json({ message: 'O quarto não foi encontrado!' })
        return
    }

    try {
        await Room.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: 'Quarto removido com sucesso.' })
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

module.exports = router