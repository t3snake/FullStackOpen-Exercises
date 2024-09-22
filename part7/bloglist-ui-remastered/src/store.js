import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const bloglistStore = configureStore({
    reducer: {
        user: userReducer,
        blogPage: blogReducer,
        notifications: notificationReducer,
    }
})

export default bloglistStore