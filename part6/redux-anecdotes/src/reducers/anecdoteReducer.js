import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push({
                content: action.payload,
                id: getId(),
                votes: 0
            })
        },
        vote(state, action) {
            return state.map(anecdote => {
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
        },
        setAnecdotes(state, action) {
            return action.payload
        }

    }
})

const selectAnecdotes = state => state.anecdotes
const selectFilterText = state => state.filterText

export const getFilteredAnecdotes = createSelector([selectAnecdotes, selectFilterText], (anecdotes, filterText) => {
    return anecdotes.filter(anecdote => anecdote.content.includes(filterText))
})

export const {add, vote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer