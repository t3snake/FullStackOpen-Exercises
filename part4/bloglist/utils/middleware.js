const jwt = require('jsonwebtoken')

const logger = require('./logger')
const config = require('./config')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
    const auth = request.get('authorization')

    if(auth && auth.startsWith('Bearer ')) {
      request.token = auth.replace('Bearer ', '')
    } else {
      request.token = null
    }

  next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    
    if( !decodedToken ) {
        return response.status(401).json({error: 'Invalid token'})
    }

    const user = await User.findById(decodedToken.id)
    request.user = user

    next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'username already exists' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({error: 'Invalid Token'})
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}