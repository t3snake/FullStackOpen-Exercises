import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (tokenString) => {
    token = `Bearer ${tokenString}`
}

const getBlogs = async () => {
    const response = await axios.get(baseUrl)
    return response.data
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
            headers: {Authorization: token}
        })
    return response.data
}

export default { setToken, getBlogs, addBlog }