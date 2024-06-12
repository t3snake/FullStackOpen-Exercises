const userRouter = require('express').Router()
const { response } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.get('/', async (request, response) => {
    const users =  await User
        .find({})
        .populate('blogs', {title: 1, url: 1, author: 1})

    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password} = request.body

    if( !username || !name || !password ) {
        response
            .status(400)
            .send({error: 'Malformed request body. Check if username, name and password are non empty'})
        return
    } else if( username.length < 3) {
        response
            .status(400)
            .send({error: 'Use a username with more than 3 characters'})
        return
    } else if( username.length < 3) {
        response
            .status(400)
            .send({error: 'Use a password with more than 3 characters'})
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