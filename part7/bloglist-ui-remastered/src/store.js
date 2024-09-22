import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const bloglistStore = configureStore({
    reducer: {
        blogPage: blogReducer,
        notifications: notificationReducer,
    }
})

export default bloglistStore