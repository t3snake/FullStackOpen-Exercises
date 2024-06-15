import { useState } from 'react'
import loginService from '../services/login'

const LoginPage = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async (event) => {
        event.preventDefault()
        
        const user = await loginService.login(username, password)
        setUser(user)
        setUsername('')
        setPassword('')
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
                <button type='submit'> Login </button>
            </form>
        </div>
    )
}

export default LoginPage