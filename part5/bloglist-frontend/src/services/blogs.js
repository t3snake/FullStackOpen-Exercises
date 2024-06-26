import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (tokenString) => {
    token = `Bearer ${tokenString}`
}

const getBlogs = async () => {
    const response = await axios.get(baseUrl)
    const users = response.data.toSorted( (user1, user2) => {
        return user2.likes - user1.likes
    })
    return users
}

const addBlog = async (title, url, author) => {
    const response = await axios.post(
        baseUrl,
        {
            title,
            url,
            author
        },
        {
            headers: { Authorization: token }
        })
    return response.data
}

const addLikeOnBlog = async (blog) => {
    const response = await axios.put(
        `${baseUrl}/${blog.id}`,
        {
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes + 1,
            user: blog.user.id
        }
    )

    return response.data
}

const deleteBlog = async (id) => {
    return await axios.delete(
        `${baseUrl}/${id}`,
        {
            headers: { Authorization: token }
        })
}

export default { setToken, getBlogs, addBlog, addLikeOnBlog, deleteBlog }