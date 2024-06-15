import { useState } from 'react'
import loginService from '../services/login'

const LoginPage = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const handleLogin = async (event) => {
        event.preventDefault()

        try{
            const user = await loginService.login(username, password)
            window.localStorage.setItem('loggedInBlogListUser', JSON.stringify(user) )
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            if ( error.response.status === 401 ) {
                setError('Incorrect Credentials')
            } else {
                setError(error.message)
            }
            setTimeout(() => setError(''), 3000)
        }
    }

    const errorStyle = {
        color: 'red'
    }

    return(
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username:
                    <input 
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}/>
                </div>

                <div>
                    Password:
                    <input 
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}/>
                </div>
                { (error !== '') && <div style={errorStyle}> {error} </div>}
                <button type='submit'> Login </button>
            </form>
        </div>
    )
}

export default LoginPage