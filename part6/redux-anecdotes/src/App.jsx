import { useEffect } from "react"
import { useDispatch } from "react-redux"

import anecdoteService from "./services/anecdotes"

import { setAnecdotes } from "./reducers/anecdoteReducer"

import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notifications from "./components/Notifications"



const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        anecdoteService.getAll().then(anecdote => {
            dispatch(setAnecdotes(anecdote))
        })
    }, [])

    const style = {
        width: '40%'
    }

    return (
        <div>
            <span style={style}>
                <h2>Anecdotes</h2>
                <Filter />
                <AnecdoteList />
                <AnecdoteForm />
            </span>
            <span style={style}>
                <Notifications />
            </span>
            
        </div>
    )
}

export default App