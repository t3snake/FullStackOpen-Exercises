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
    return response.data
}

const voteAnecdote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const anecdote = response.data
    await axios.put(`${baseUrl}/${id}`, {
        content: anecdote.content,
        id: id,
        votes: anecdote.votes + 1
    })
}

export default { getAll, createAnecdote, voteAnecdote }