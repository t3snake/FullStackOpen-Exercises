/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

import { getId } from './anecdoteReducer'

const initialState = []

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notify(state, action) {
            state.push({
                message: action.payload.message,
                id: action.payload.id,
            })
        },
        clear(state, action) {
            state.shift()
        }
    }
})

export const { notify, clear } = notificationSlice.actions

export const pushNotification= (message, timeout) => {
    return async dispatch => {
        // Show Notification
        const notification = {
            message,
            id: getId()
        }
        dispatch(notify(notification))

        // Disable notification after timeout seconds
        setTimeout(function(){ dispatch(clear()); }, timeout*1000);
    }
}

export default notificationSlice.reducer