import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

  const Button = ({clicked, text}) => (
    <button onClick = {clicked}>
      {text}
    </button>
  )

  const FilterInput = ({filterName, setFilter}) => {
    const handleFilterChange = (event) => {
      setFilter(event.target.value)
    }
    return (
    <form>
      <div>find countries <input value = {filterName} onChange = {handleFilterChange}/></div>
    </form>
  )}
  
  //kind of messy, should prob be divided into components
  const SearchResult = ({countries,filterName, setFilter}) => {
    
    //gives the filtered countries
    const filteredlist = 
    countries.filter(country => 
    country.name.toLowerCase().includes(filterName.toLowerCase()))

    //the country that was searched
    const searched_country = filteredlist[0]
    
    //const of svg adress location to help
    const flag_address = "https://restcountries.eu/data/"
    
    //if filtered list is between 2-10, will show that amount of countries, 
    //with show button, and if that is clicked will complete the search for that  country
    //displaying it fully.
    if ( filteredlist.length > 1 && filteredlist.length <= 10){
      return(
        <div>
          {filteredlist.map((country,i) => 
            <div key={i}> {country.name} <Button clicked = {() => setFilter(filterName = country.name)} text = "show"/></div>)}
        </div>
        )}
    else if (filteredlist.length === 1) {
      return (
      <div>
        <h1>{searched_country.name}</h1>
        <div>capital {searched_country.capital}</div>
        <div>population {searched_country.population}</div>
        <h2>languages</h2>
        <ul>{searched_country.languages.map((language, i) =>
          <li key={i}> {language.name}</li>)}
        </ul>
        <img src = {String(flag_address)+
            String(searched_country.alpha3Code.toLowerCase())+".svg"}
            width = "100" height = "100"/>
      </div>
      )}
    else {
        return (
        <div> Too many matches, specify another filter</div>
        )}
  }

const App = (props) => {
  
  require('dotenv').config()

  const [countries, setCountries] = useState([])
  const [filterName, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <FilterInput filterName = {filterName} setFilter = {setFilter}/>
      <SearchResult countries = {countries} filterName = {filterName} 
      setFilter = {setFilter}/>
    </div>
  ) 
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)