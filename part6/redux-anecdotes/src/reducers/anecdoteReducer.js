import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

import anecdoteService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload)
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

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const addedAnecdote = await anecdoteService.createAnecdote(content)
        console.log(addedAnecdote)
        dispatch(add(addedAnecdote))
    }
}

export const addVote = (id) => {
    return async dispatch => {
        await anecdoteService.voteAnecdote(id)
        dispatch(vote(id))
    }
}

export default anecdoteSlice.reducer