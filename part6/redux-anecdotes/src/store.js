import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const anecdoteStore = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filterText: filterReducer,
        notifications: notificationReducer,
    }
})

export default anecdoteStore