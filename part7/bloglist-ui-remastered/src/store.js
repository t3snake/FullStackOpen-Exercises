import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'

const bloglistStore = configureStore({
    reducer: {
        notifications: notificationReducer,
    }
})

export default bloglistStore