import { useSelector } from 'react-redux'
import { getNotifications } from '../reducers/notificationReducer'

const Notifications = () => {
    const notifications = useSelector(getNotifications)
    console.log(notifications)

    const notificationStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        margin: 10
    }

    return (
        <>
            {
                notifications.map(notification => 
                    <div key={notification.id} style={notificationStyle}>
                        {notification.message}
                    </div>
                )
            }
        </>
    )
}

export default Notifications