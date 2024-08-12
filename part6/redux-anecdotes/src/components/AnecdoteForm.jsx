import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'
import { createSelector } from '@reduxjs/toolkit'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value

        event.target.anecdote.value = ''

        dispatch(add(content))

        // Show Notification
        const notification = {
            message: `You created anecdote with content: '${content}'`,
            id: (10000*Math.random()).toFixed(0)
        }
        dispatch(notify(notification))

        // Disable notification after 3 seconds
        setTimeout(function(){ dispatch(clear()); }, 5000);
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

