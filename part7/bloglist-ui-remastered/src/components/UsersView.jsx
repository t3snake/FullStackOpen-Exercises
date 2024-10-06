import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

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
        <Box sx={{my:2}}>
            <Typography variant="h3">Users</Typography>
            <TableContainer component={Paper} sx={{my: 2}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell variant="h4">blogs created</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map(user => {
                            return(
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Link to={`/users/${user.id}`}>
                                            {user.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {user.blogs.length}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default UsersView