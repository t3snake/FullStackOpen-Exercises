import { useState } from 'react'
import Toast from './Toast'
import loginService from '../services/login'

const LoginPage = ({ setUser, message, setMessage, messageType, setMessageType }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    
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
                setMessage('Incorrect Credentials')
            } else {
                setMessage(error.message)
            }
            setMessageType('error')
        }
    }

    return(
        <div>
            <Toast message={message} setMessage={setMessage} messageType={messageType} setMessageType={setMessageType} />
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