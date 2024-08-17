import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { getAnecdotes, voteAnecdote } from './services/anecdote'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const queryClient = useQueryClient()

    const addVoteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['anecdotes']})
        }
    })

    const handleVote = (anecdote) => {
        console.log('vote')

        addVoteMutation.mutate(anecdote)
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes
    })

    if ( result.isLoading ) {
        return (
            <div>
                Loading data...
            </div>
        )
    } else if ( result.isError ) {
        return (
            <div>
                Anecdote service not available due to problems in server
            </div>
        )
    }

    console.log(JSON.parse(JSON.stringify(result.data)))

    const anecdotes = result.data

    return (
        <div>
        <h3>Anecdote app</h3>
        
        <Notification />
        <AnecdoteForm />
        
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default App
