require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')

const cors = require('cors')

morgan.token('data', function(req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return undefined
})
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
//not sure if this was supposed to be only when using post,
//or when using other commands too.. Now sends the data when using post, and undef otherwise
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

/*
let persons = [
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 1
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 2
      },
      {
        "name": "Lari Haapaniemi",
        "number": "9041231",
        "id": 3
      },
      {
        "name": "Keijo Slakas",
        "number": "031231231",
        "id": 4
      },
      {
        "name": "Leera Isojärvi",
        "number": "1310513321",
        "id": 5
      }
]*/
app.get('/info', (request, response, next) => {
  Person.find({}).then(all_persons => {
    response.send(`<p>Phonebook has info for ${all_persons.length} people</p>
    <p> ${Date()}</p>`)
  })
    .catch(error => {
      return next(error)
    })
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(all_persons => {
    response.json(all_persons)
  })
    .catch(error => {
      return next(error)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }else{
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//was requested to be done this way
/*const randomizeId = () => {
    const Id = Math.floor(Math.random() * 1000)
    return Id
}*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number,
    //id: randomizeId(),
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    //i think the message it gives is good enough:
    //Person validation failed: name: Error,
    //expected `name` to be unique. Value: `Lari Haapaniemi`
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})