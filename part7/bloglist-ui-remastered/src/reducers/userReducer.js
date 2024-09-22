/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state, action) {
            return null
        }
    }
})

const { login, logout } = userSlice.actions

export const loginUser = (user) => {
    return async dispatch => {
        dispatch(login(user))
    }
}

export const logoutUser = ()  => {
    return async dispatch => {
        dispatch(logout())
    }
}

export default userSlice.reducer