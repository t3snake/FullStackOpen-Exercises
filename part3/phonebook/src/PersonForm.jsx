import { useState } from "react"
import PhonebookService from "./service/PhonebookService"

const PersonForm = ({persons, setPersons}) => {
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
        const newUser = { name: newName, number: newNumber, id: `${persons.length + 1}` }
        PhonebookService
          .createUser(newUser)
          .then((response) => {
            const newPersons = persons.concat(response.data)
            setPersons(newPersons)
          })
      }
      setNewName('')
      setNewNumber('')
  }

  return (
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
  )
}

export default PersonForm