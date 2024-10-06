import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Paper from '@mui/material/Paper'
import Typography from "@mui/material/Typography"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import { getUsers } from "../services/users"

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
        <Paper sx={{my: 2, p: 2}}>
            <Typography variant="h3">{user.name}</Typography>

            <Typography variant="h4">added blogs</Typography>
            <List>
                {user.blogs.map(blog => {
                    return (
                        <ListItem key={blog.id}>
                            {blog.title}
                        </ListItem>
                    )
                })}
            </List>
        </Paper>
    )
}

export default UserView