import './global.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { useAppDispatch, useAppSelector } from './utils/hooks'
import { checkForSession } from './features/authSlice'
import { onMessageDelete, onMessageEdit } from './features/messagesSlice'
import socket from './socket'
import Loading from './global_components/Loading'
import Footer from './global_components/Footer'

function App() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector((state) => state.authReducer.loading)
    const isLoggedIn = useAppSelector(
        (state) => state.authReducer.user.loggedIn
    )
    useEffect(() => {
        // Check if user has an unexpired session
        dispatch(checkForSession())
    }, [])
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/chat')
        }
        socket.on('on_edit', (data) => {
            dispatch(onMessageEdit(data))
        })
        socket.on('on_delete', (d) => {
            dispatch(onMessageDelete(d))
        })
        return () => {
            socket.off('on_edit')
        }
    }, [isLoggedIn])
    return (
        <div
            className="App"
            style={{
                position: 'relative',
            }}
        >
            {isLoading ? <Loading /> : <AppRoutes />}
            <Footer />
        </div>
    )
}

export default App
