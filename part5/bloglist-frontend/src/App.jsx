import { useState, useEffect } from 'react'
import BlogPage from './components/BlogPage'
import LoginPage from './components/LoginPage'

const App = () => {
    const [user, setUser] = useState(null)

    if (user === null) {
        return (
            <LoginPage setUser={setUser} />
        )
    }

    return (
        <BlogPage user={user} />
    )
  
}

export default App