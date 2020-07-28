import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

const Button = ({clicked, text}) => (
  <button onClick = {clicked}>
    {text}
  </button>
)

const App = () => {

  useEffect(() => {
    personsService
      .get_json()
      .then(pers => {
        setPersons(pers)
      })
  }, [])

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <FilterInput filterName = {filterName} setFilter = {setFilter}/>
      <h2>add a new</h2>
        <AddPerson newName = {newName} setNewName = {setNewName} 
        newNumber = {newNumber} setNewNumber = {setNewNumber} 
        persons = {persons} setPersons = {setPersons}
        setSuccessMessage = {setSuccessMessage} setErrorMessage = {setErrorMessage}/>
      <h2>Numbers</h2>
        <ShowPersons persons = {persons} filterName = {filterName} setPersons = {setPersons} setSuccessMessage = {setSuccessMessage}/>
    </div>
  )
}


//again handle event here, probably not great
//takes care of the input field, and passes the filterName value 
//so we can filter by it in ShowPersons.
const FilterInput = ({filterName, setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
  <form>
    <div>filter shown with <input value = {filterName} onChange = {handleFilterChange}/></div>
  </form>
)}

//is there any better way to do this (giving a lot of parameters)??
//tried to send it off as list but that did not work 
//also this const is quite long, and gets messy...
const AddPerson = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, setSuccessMessage, setErrorMessage}) => {
  
  //probably not allowed to do this...
  //but so far not causing any errors.
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  //just a easy way to update the json
  const add_to_json = (noteObject) => {
    personsService
      .add_json(noteObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        //to display the message for 5 s
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`${error.response.data.error}`)
      })
  }

  const addName = (event) =>{
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.some(person => person.name === newPerson.name)) {
      //so this is probably not ideal, since I do the same task twice, but It will do for now
      const person_holder = persons.find(person => person.name === newPerson.name)
        if (window.confirm(`${person_holder.name} is already added in to the phonebook, replace the old number with the new one?`)) {
          personsService
          .update_json(person_holder.id,newPerson)
          .then(returnedPerson => {
            //redacted comment¤¤¤
            //again added the real time update, pretty much copied how I did the delete_from_json
            //the only problem is that it moves the changed thing to the end of the list
            // persons.filter(value => value !== person_holder).concat(returnedPerson)
            // that is what the code used to look like ^^, the problem is no longer there
            setPersons(persons.map(person => person.id !== person_holder.id ? person : returnedPerson))
            setSuccessMessage(`Changed ${returnedPerson.name}s number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error =>
            setErrorMessage(`Information of ${person_holder.name} has already been removed from the server`))
        }
    }
    else {
      add_to_json(newPerson)
    }
  }

    return ( 
        <form onSubmit={addName}> 
          <div> name: <input value ={newName} onChange = {handleNameChange}/></div>
          <div> number: <input value = {newNumber} onChange = {handleNumberChange}/></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }
  
//takes care of filtering the list, and showing the persons.
//I have no idea how to make it seperate
const ShowPersons = ({persons,filterName,setPersons,setSuccessMessage}) => {
  //just returns a filtered list to map, also makes everything lowercase
  //when checking
  const filtered = persons.filter(person => 
      person.name.toLowerCase().includes(filterName.toLowerCase()))

  const delete_from_json = (noteObject) => {
    if (window.confirm(`Delete ${noteObject.name}`) === true) {
      personsService
        .delete_json(noteObject)
        .then(returnedPerson => {
          //no idea if I had to do this, but took like an hour to figure out how to update
          //this in realtime
          setPersons(persons.filter(value => value !== noteObject))
          setSuccessMessage(`Deleted ${noteObject.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
        })
    }
  }
  
      return (
        //changed it to use the i key instead of names for now
        //since the json had its own ID:s, but since it was 
        //not required yet to use them I changed it to this.
        <div>
        {filtered.map((person,i) => 
            <div key={i}> 
            {person.name} {person.number}
            <Button clicked = {() => delete_from_json(person)} text = 'delete'/>
            </div>
            )}
        </div>
      )
}

const SuccessNotification = ({ message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App