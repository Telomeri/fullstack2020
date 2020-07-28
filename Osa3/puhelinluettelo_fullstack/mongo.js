const mongoose = require('mongoose')

//given arguments
const password = process.argv[2]
const new_name = process.argv[3]
const new_number = process.argv[4]

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length<3) {
  console.log('give password as third argument')
  process.exit(1)
}
else if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
else if (process.argv.length === 5) {
  const person = new Person({
    name: new_name,
    number: new_number,
  })
  // eslint-disable-next-line no-unused-vars
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}



const database_url = `mongodb+srv://fullstack:${password}@cluster0.5nn6o.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true })









