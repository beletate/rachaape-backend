const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) return res.status(400).send({ error: 'Usuário já existe.' })

        let user = await User.create(req.body)
        res.status(201).json({ message: 'Ok!', user })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})
router.post('/photo', async (req, res) => {
    console.log(req.body)

    try {
        res.status(201).json({ message: 'Ok!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/register', async (req, res) => {

    try {
        const people = await User.find()

        res.status(200).json(people)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.get('/register/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })

        if (!user) {
            res.status(200).json({ message: 'Autorizado.' })
            return
        }

        res.status(404).json({ message: 'Negado.' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.post('/register/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(404).json({ message: 'Negado.' })
            return
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            res.status(404).json({ message: 'Negado.' })
            return
        } else if (isValid) {
            user["password"] = undefined;
            res.status(200).json({ message: 'Autorizado.', user })
        }

    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/register/itself/:id', async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id }).select(['-password'])

        if (!user) {
            res.status(422).json({ message: 'O usuáro não foi encontrado!' })
            return
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.get('/register/room/:id', async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id }).select([
            '-password', 
            '-lifestyle',
            '-country',
            '-minPrice',
            '-maxPrice',
            '-email',
            '-createdAt',
            ''
        ])

        if (!user) {
            res.status(422).json({ message: 'O usuáro não foi encontrado!' })
            return
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

router.patch('/register/:id', async (req, res) => {

    const { name, email, password } = req.body

    const user = {
        photo,
        age,
        minPrice,
        maxPrice,
        phone,
        name,
        email,
        password
    }

    try {
        const updatedUser = await User.updateOne({ _id: req.params.id }, user)

        if (updatedUser.matchedCount === 0) {
            res.status(422).json({ message: 'O usuáro não foi encontrado!' })
            return
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})
router.delete('/register/:id', async (req, res) => {

    const user = await User.findOne({ _id: req.params.id })


    if (!user) {
        res.status(422).json({ message: 'O usuáro não foi encontrado!' })
        return
    }

    try {
        await User.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: 'Usuário removido com sucesso.' })
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

module.exports = router