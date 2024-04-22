import { useState } from "react"
import PhonebookService from "./service/PhonebookService"

const PersonForm = ({persons, setPersons, setMessage, setIsError}) => {
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const startMessageTimer = () => {
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const addEntry = (event) => {
      event.preventDefault()
      const existingUser = persons.find(p=>p.name === newName)
      if (existingUser){
        let message = `${newName} is already added to phonebook, replace old number with a new one?`
        
        if( window.confirm(message) ) {
          const updatedUser = { ...existingUser, number: newNumber}
          
          PhonebookService
            .updateUser(updatedUser.id, updatedUser)
            .then(response => {
              const newPersons = persons.map(person => person.id === updatedUser.id ? response.data : person)
              setPersons(newPersons)
              setMessage(`Updated ${newName}`)
              setIsError(false)

              startMessageTimer()
            })
            .catch(error => {
              setIsError(true)
              if (error.response.status === '404'){
                setMessage(`User ${updatedUser.name} already deleted from the server`)
                const newPersons = persons.filter(person => person.id !== updatedUser.id)
                setPersons(newPersons)
              } else {
                setMessage(error.response.data.error)
              }
  
              startMessageTimer()
            })
        }
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
            setIsError(false)
            setMessage(`Added ${newName}`)
            
            startMessageTimer()
          })
          .catch(error => {
            setIsError(true)
            setMessage(error.response.data.error)

            startMessageTimer()
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