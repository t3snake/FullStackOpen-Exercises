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
        add(state, action) {
            state.blogs.push({
                id: action.payload.id,
                title: action.payload.title,
                url: action.payload.url,
                author: action.payload.author,
                likes: 0,
                user: action.payload.user,
                comments: action.payload.comments,
            })
        },
        remove(state, action) {
            state.blogs = state.blogs.filter(blog => blog.id !== action.payload)
        },
        like(state, action) {
            state.blogs = state.blogs.map(blog => 
                blog.id === action.payload 
                ? {
                    id: blog.id,
                    title: blog.title,
                    url: blog.url,
                    author: blog.author,
                    likes: blog.likes + 1,
                    user: blog.user,
                    comments: blog.comments,
                }
                : blog
            )
        },
        comment(state, action) {
            state.blogs = state.blogs.map(blog => {
                const allComments = [...blog.comments]
                allComments.push(action.payload.comment)

                return (
                    blog.id === action.payload.id
                    ? {
                        id: blog.id,
                        title: blog.title,
                        url: blog.url,
                        author: blog.author,
                        likes: blog.likes,
                        user: blog.user,
                        comments: allComments,
                    }
                    : blog
                )
            })
        },
        setBlogs(state, action) {
            state.blogs = action.payload
        }
    }
})

const { toggleCreateVisibility, add, remove, like, setBlogs, comment } = blogPageSlice.actions

let token = ''
export const setToken = (tokenString) => {
    blogService.setToken(tokenString)
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getBlogs()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (title, url, author, user) => {
    return async dispatch => {
        const newBlog = await blogService.addBlog(title, url, author);
        newBlog.user = user
        
        dispatch(add(newBlog))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        const response = await blogService.deleteBlog(id);
        if (response.status === 204) {
            dispatch(remove(id))
        }
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        await blogService.addLikeOnBlog(blog)
        dispatch(like(blog.id))
    }
}

export const commentOnBlog = (id, commentString) => {
    return async dispatch => {
        await blogService.addCommentOnBlog(id, commentString)
        dispatch(comment({id,comment: commentString}))
    }
}

export const toggleCreateFormVisibility = () => {
    return async dispatch => {
        dispatch(toggleCreateVisibility())
    }
}

export default blogPageSlice.reducer