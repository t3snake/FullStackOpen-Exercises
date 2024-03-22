const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {
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
          const newPersons = persons.concat({ name: newName, number: newNumber, id: persons.length + 1 })
          setPersons(newPersons)
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