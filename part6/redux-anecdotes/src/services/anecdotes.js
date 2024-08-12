import axios from 'axios'
import { getId } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (anecdote) => {
    const response = await axios.post(baseUrl, {
        content: anecdote,
        id: getId(),
        votes: 0,
    })
}

export default { getAll, createAnecdote }