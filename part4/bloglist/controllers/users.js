const userRouter = require('express').Router()
const { response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.get('/', async (request, response) => {
    const users =  await User.find({})

    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password} = request.body

    console.log({username, name, password})

    if( !username || !name || !password ) {
        response.status(404).send({error: 'Malformed request body. Check if username, name and password are non empty'})
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = userRouter