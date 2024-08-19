import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createAnecdote } from "../services/anecdote"

import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
    const queryClient = useQueryClient()

    const dispatch = useNotificationDispatch()

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

        // Notify
        dispatch({
            type: 'NOTIFY',
            payload: `Created '${content}'`
        })

        // Disable notification after 3 seconds
        setTimeout(function(){ 
            dispatch({
                type: 'NOTIFY',
                payload: ''
            }) 
        }, 5000);
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
