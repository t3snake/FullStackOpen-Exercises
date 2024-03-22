import PhonebookService from './service/PhonebookService'

const Persons = ({persons, setPersons, filter}) => {
    
    const deleteUserHandler= (user) => {
        if( window.confirm(`Delete ${user.name} ?`) ) {
            PhonebookService
                .deleteUser(user.id)
                .then(response => {
                    const newPersons = persons.filter(person => person.id !== user.id)
                    setPersons(newPersons)
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