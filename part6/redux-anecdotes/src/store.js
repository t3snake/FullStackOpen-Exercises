import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const anecdoteStore = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filterText: filterReducer
    }
})

export default anecdoteStore