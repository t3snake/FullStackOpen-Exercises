import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (tokenString) => {
    token = tokenString
}

const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getBlogs, setToken }