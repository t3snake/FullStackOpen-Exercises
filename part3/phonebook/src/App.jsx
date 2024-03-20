import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    if (persons.filter(p=>p.name === newName).length > 0){
      let message = `${newName} is already added to phonebook`
      alert(message)
    }
    else if (persons.filter(p=>p.number === newNumber).length > 0) {
      let message = `${newNumber} is already added to phonebook`
      alert(message)
    }
    else{
      const newPersons = persons.concat({ name: newName, number: newNumber, id: persons.length })
      setPersons(newPersons)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={ (event) => { setFilter(event.target.value) } }/>
      <h2>Add a new</h2>
      <form onSubmit={addEntry}>
        <div>
          Name: <input value={newName} onChange={ (event) => { setNewName(event.target.value) } }/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={ (event) => { setNewNumber(event.target.value) } }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons
        .filter( (person) => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map( (person) => <div key={person.id}>{person.name}: {person.number}</div> )
      }
    </div>
  )
}

export default App