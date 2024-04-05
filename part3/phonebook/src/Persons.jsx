import PhonebookService from './service/PhonebookService'

const Persons = ({persons, setPersons, filter, setMessage, setIsError}) => {
    
    const deleteUserHandler= (user) => {
        if( window.confirm(`Delete ${user.name} ?`) ) {
            PhonebookService
                .deleteUser(user.id)
                .then(response => {
                    const newPersons = persons.filter(person => person.id !== user.id)
                    setPersons(newPersons)
                })
                .catch(error => {
                    setIsError(true)
                    setMessage(`User ${user.name} already deleted from the server`)
                    const newPersons = persons.filter(person => person.id !== user.id)
                    setPersons(newPersons)

                    setTimeout(() => {
                        setMessage(null)
                      }, 3000)
                })
        }
    }

    return (
        <>
        {
            persons
            .filter( (person) => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map( (person) => {
                return(
                    <div key={person.id}>
                        {person.name}: {person.number}
                        <button onClick={() => { deleteUserHandler(person) } }>delete</button>
                    </div>
                )
            }  )
        }
        </>
    )
}

export default Persons