const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request,response) => {
  const body = request.body
  const rounds = 10
  if (body.password === null) {
    return response.status(400).json({ error: 'missing password' })
  } else {
    if (body.password <= 3) {
      return response.status(400).json({ error: 'password too short' })
    }
    const passwordHash = await bcrypt.hash(body.password, rounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.json(savedUser)
  }
})
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter