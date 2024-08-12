import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { pushNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value

        event.target.anecdote.value = ''

        dispatch(createAnecdote(content))

        const message = `You created anecdote with content: '${content}'`
        dispatch(pushNotification(message, 5))
    }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='anecdote' />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm

