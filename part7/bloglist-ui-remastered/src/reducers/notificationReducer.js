/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notify(state, action) {
            state.push({
                message: action.payload.message,
                type: action.payload.type,
                id: action.payload.id,
            })
        },
        clear(state, action) {
            state.shift()
        }
    }
})

export const { notify, clear } = notificationSlice.actions

export const pushNotification = (message, type, timeout) => {
    return async dispatch => {
        // Show Notification
        const notification = {
            message,
            type,
            id: (Math.random()*10000).toFixed(0)
        }
        dispatch(notify(notification))

        // Disable notification after timeout seconds
        setTimeout(function(){ dispatch(clear()); }, timeout*1000);
    }
}

export default notificationSlice.reducer