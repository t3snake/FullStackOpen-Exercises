import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filterText))
    })

    const dispatch = useDispatch()

    const voteOnClick = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
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