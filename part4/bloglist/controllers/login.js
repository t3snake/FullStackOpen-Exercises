const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({username})
    if( !user ) {
        response.status(401).json({
            error: 'Invalid username'
        })
        return
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

    if( !passwordCorrect ) {
        response.status(401).json({
            error: 'Invalid password'
        })
        return
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ 
            token: token,
            username: user.username,
            name: user.name
        })
})



module.exports = loginRouter