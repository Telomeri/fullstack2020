const logger = require('./logger')

//straight from github https://github.com/fullstack-hy2020/part3-notes-backend/blob/part4-1/utils/middleware.js
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('tokenmatch ')) {
    request.token = authorization.substring(11)
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.message === 'data and salt arguments required') {
    return response.status(400).send({ error: 'password missing' })
  }  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

module.exports = {
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}