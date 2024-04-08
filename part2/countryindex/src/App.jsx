import { useEffect, useState } from 'react'
import FilterBox from './FilterBox'
import CountryList from './CountryList'
import axios from 'axios'

function App() {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  
  useEffect( () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })

      console.log('countries fetched')
  }, [])

  return (
    <>
      <FilterBox filter={filter} setFilter={setFilter} />
      <br />
      <CountryList filter={filter} countries={countries} />
    </>
  )
}

export default App
