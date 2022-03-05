const router = require('express').Router()
const Locator = require('../models/Locator')

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        if (await Locator.findOne({ email })) return res.send(400).send({ error: 'Esse email já foi cadastrado em outra conta.' })

        await Locator.create(req.body)
        res.status(201).json({ message: 'Cadastro concluído com sucesso.' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/register', async (req, res) => {

    try {
        const people = await Locator.find()

        res.status(200).json(people)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.get('/register/:id', async (req, res) => {

    try {
        const locator = await Locator.findOne({ _id: req.params.id })

        if (!locator) {
            res.status(422).json({ message: 'O usuáro não foi encontrado.' })
            return
        }

        res.status(200).json(locator)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.patch('/register/:id', async (req, res) => {

    const { firstName, lastName, email, dtBirth, phoneNumber, rooms, password } = req.body

    const updatedAt = Date.now();

    const locator = {
        firstName,
        lastName,
        email,
        dtBirth,
        phoneNumber,
        rooms,
        password,
        updatedAt
    }

    try {
        const updatedLocator = await Locator.updateOne({ _id: req.params.id }, locator)

        if (updatedLocator.matchedCount === 0) {
            res.status(422).json({ message: 'O usuáro não foi encontrado.' })
            return
        }

        res.status(200).json(locator)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})
router.delete('/register/:id', async (req, res) => {

    const locator = await Locator.findOne({ _id: req.params.id })


    if (!locator) {
        res.status(422).json({ message: 'O usuáro não foi encontrado.' })
        return
    }

    try {
        await Locator.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: 'Usuário removido com sucesso.' })
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

module.exports = router