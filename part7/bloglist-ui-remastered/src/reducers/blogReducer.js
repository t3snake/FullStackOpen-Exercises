import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = {
    isCreateVisible: false,
    blogs: [],
}

const blogPageSlice = createSlice({
    name: "bloglist",
    initialState,
    reducers: {
        toggleCreateVisibility(state, action){
            state.isCreateVisible = !state.isCreateVisible
        },
        addBlog(state, action) {
            state.blogs.push({
                id: action.payload.id,
                title: action.payload.title,
                url: action.payload.url,
                author: action.payload.author,
                likes: 0,
                user: action.payload.user
            })
        },
        deleteBlog(state, action) {
            state.blogs = state.blogs.filter(blog => blog.id !== action.payload)
        },
        setBlogs(state, action) {
            state.blogs = action.payload
        }
    }
})

const { toggleCreateVisibility, addBlog, deleteBlog, setBlogs } = blogPageSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getBlogs()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (title, url, author, user) => {
    return async dispatch => {
        const newBlog = await blogService.addBlog(title, url, author);
        console.log(newBlog)
        newBlog.user = user
        // await getAllBlogs();
        dispatch(addBlog(newBlog))
    }
}

export const toggleCreateFormVisibility = () => {
    return async dispatch => {
        dispatch(toggleCreateVisibility())
    }
}

export default blogPageSlice.reducer