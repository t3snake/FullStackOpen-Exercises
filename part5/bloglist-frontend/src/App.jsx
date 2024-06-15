import { useState, useEffect } from 'react'
import BlogPage from './components/BlogPage'
import LoginPage from './components/LoginPage'

const App = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {    
        const loggedUserJSON = window.localStorage.getItem('loggedInBlogListUser')    
        if (loggedUserJSON) {      
            const user = JSON.parse(loggedUserJSON)      
            setUser(user)
        }  
    }, [])

    if (user === null) {
        return (
            <LoginPage setUser={setUser} />
        )
    }

    return (
        <BlogPage user={user} setUser={setUser} />
    )
  
}

export default App