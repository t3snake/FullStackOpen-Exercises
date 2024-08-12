import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

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

const selectNotifications = state => state.notifications

export const getNotifications = createSelector([selectNotifications], (notifications) => {
    return notifications
})

export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer