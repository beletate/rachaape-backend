const router = require('express').Router()
const Tenant = require('../models/Tenant')

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        if (await Tenant.findOne({ email })) return res.send(400).send({ error: 'Esse email já foi cadastrado em outra conta.' })

        await Tenant.create(req.body)
        res.status(201).json({ message: 'Cadastro concluído com sucesso.' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/register', async (req, res) => {

    try {
        const people = await Tenant.find()

        res.status(200).json(people)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.get('/register/:id', async (req, res) => {

    try {
        const tenant = await Tenant.findOne({ _id: req.params.id })

        if (!tenant) {
            res.status(422).json({ message: 'O usuáro não foi encontrado.' })
            return
        }

        res.status(200).json(tenant)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.patch('/register/:id', async (req, res) => {

    const { firstName, lastName, state, city, email, dtBirth, phoneNumber, persona, password } = req.body

    const updatedAt = Date.now();

    const tenant = {
        firstName,
        lastName,
        email,
        dtBirth,
        state, 
        city,
        phoneNumber,
        persona,
        password,
        updatedAt
    }

    try {
        const updatedLocator = await Tenant.updateOne({ _id: req.params.id }, tenant)

        if (updatedLocator.matchedCount === 0) {
            res.status(422).json({ message: 'O usuáro não foi encontrado.' })
            return
        }

        res.status(200).json(tenant)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})
router.delete('/register/:id', async (req, res) => {

    const tenant = await Tenant.findOne({ _id: req.params.id })


    if (!tenant) {
        res.status(422).json({ message: 'O usuáro não foi encontrado.' })
        return
    }

    try {
        await Tenant.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: 'Usuário removido com sucesso.' })
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

module.exports = router