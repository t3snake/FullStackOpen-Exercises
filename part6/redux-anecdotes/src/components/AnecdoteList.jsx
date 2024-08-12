import { useSelector, useDispatch } from 'react-redux'

import { getFilteredAnecdotes, addVote } from '../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(getFilteredAnecdotes)

    const dispatch = useDispatch()

    const voteOnClick = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))

        // Show Notification
        const votedAnecdote = anecdotes.find(a => a.id === id)
        const messageId = (10000*Math.random()).toFixed(0)
        const notification = `You voted '${votedAnecdote.content}'`
        dispatch(
            notify({
                message: notification,
                id: messageId,
            })
        )

        // Disable notification after 3 seconds
        setTimeout(function(){ dispatch(clear()) }, 5000)
    }  

    return(
        <div>
            {
                anecdotes
                    .sort((a, b) => b.votes - a.votes)
                    .map(anecdote =>
                        <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => voteOnClick(anecdote.id)}>vote</button>
                        </div>
                        </div>
                    )
            }
        </div>
    )
}

export default AnecdoteList