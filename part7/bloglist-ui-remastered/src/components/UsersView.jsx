import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getUsers } from "../services/users"


const UsersView = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fillUsers = async () => {
            const usrs = await getUsers()
            setUsers(usrs)
        }
        fillUsers()
    }, [])
    
    return (
        <>
        <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th> </th>
                    <th>blogs created</th>
                </tr>
            </thead>

            <tbody>
                {users.map(user => {
                    return(
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default UsersView