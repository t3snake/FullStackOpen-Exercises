import axios from "axios";
const baseUrl = 'http://localhost:3001/api/persons'

const getAllUsers = () => {
    return axios.get(baseUrl)
}

const createUser = (userData) => {
    return axios.post(baseUrl, userData)
}

const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateUser = (id, userData) => {
    return axios.put(`${baseUrl}/${id}`, userData)
}

export default {getAllUsers, createUser, deleteUser, updateUser}