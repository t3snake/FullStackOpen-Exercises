import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createAnecdote } from "../services/anecdote"

const AnecdoteForm = () => {
    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['anecdotes']})
        }
    })


    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        const newAnecdote = {
            content,
            id: (100000 * Math.random()).toFixed(0),
            votes: 0,
        }
        
        newAnecdoteMutation.mutate(newAnecdote)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
