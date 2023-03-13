import './global.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { useAppDispatch, useAppSelector } from './utils/hooks'
import { checkForSession } from './features/authSlice'
import { onMessageEdit } from './features/messagesSlice'
import socket from './socket'

function App() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector((state) => state.authReducer.loading)
    const isLoggedIn = useAppSelector(
        (state) => state.authReducer.user.loggedIn
    )
    useEffect(() => {
        dispatch(checkForSession())
    }, [])
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/chat')
        }
        socket.on('on_edit', (data) => {
            dispatch(onMessageEdit(data))
        })
        return () => {
            socket.off('on_edit')
        }
    }, [isLoggedIn])
    return (
        <div className="App">
            {isLoading ? <div>LOADING</div> : <AppRoutes />}
        </div>
    )
}

export default App
