import { useEffect, useState } from "react"

import { getUsers } from "../services/users"
import { Link, useParams } from "react-router-dom"

const UserView = () => {
    const id = useParams().id

    const [user, setUser] = useState(null)

    useEffect(() => {
        const fillUser = async () => {
            const users = await getUsers()
            const userWithId = users.find(user => user.id === id)
            setUser(userWithId)
        }
        fillUser()
    }, [])

    if ( !user ) {
        return null
    }

    return (
        <>
            <h2>{user.name}</h2>

            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog => {
                    return (
                        <li key={blog.id}>
                            {blog.title}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default UserView