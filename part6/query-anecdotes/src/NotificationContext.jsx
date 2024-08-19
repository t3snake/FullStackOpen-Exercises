/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useReducer, useContext } from 'react'

const notificationReducer = ( state, action ) => {
    if ( action.type === 'NOTIFY' ) {
        return action.payload
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationContext = useContext(NotificationContext)
    return notificationContext[0]
}

export const useNotificationDispatch = () => {
    const notificationContext = useContext(NotificationContext)
    return notificationContext[1]
}