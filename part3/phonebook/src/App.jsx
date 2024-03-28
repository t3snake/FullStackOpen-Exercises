import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import PhonebookService from './service/PhonebookService'

const App = () => {

  useEffect(() => {
    PhonebookService
      .getAllUsers()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(true)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setIsError={setIsError} />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
      <br />
      <Notification message={message} isError={isError} />
    </div>
  )
}

export default App