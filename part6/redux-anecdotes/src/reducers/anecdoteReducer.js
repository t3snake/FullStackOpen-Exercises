const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const addAnecdoteAction = (content) => {
    return {
        type: "New-Anecdote",
        payload: {
            content: content,
            id: getId(),
            votes: 0
        }
    }
}

export const voteAction = (id) => {
    return {
        type: "Vote",
        payload: id,
    }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    let newState

    switch (action.type) {
        case "Vote":
            newState = state.map(anecdote => {
                if (anecdote.id === action.payload) {
                    return {
                        content: anecdote.content,
                        id: anecdote.id,
                        votes: anecdote.votes + 1
                    }
                } else {
                    return anecdote
                }
            })
            break;
        case "New-Anecdote":
            newState = state.concat(action.payload)
            break;
        default:
            newState = state.filter(a => a)
    
    }

    return newState
}

export default anecdoteReducer