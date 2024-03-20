import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas', 
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

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
      const newPersons = persons.concat({name: newName, number: newNumber})
      setPersons(newPersons)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map( (person) => <div key={person.name}>{person.name}: {person.number}</div> )}
    </div>
  )
}

export default App