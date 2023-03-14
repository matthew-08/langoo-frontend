import './global.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { useAppDispatch, useAppSelector } from './utils/hooks'
import { checkForSession } from './features/authSlice'
import { onMessageDelete, onMessageEdit } from './features/messagesSlice'
import socket from './socket'
import { Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

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
        socket.on('on_delete', (d) => {
            dispatch(onMessageDelete(d))
        })
        return () => {
            socket.off('on_edit')
        }
    }, [isLoggedIn])
    return (
        <div className="App">
            {isLoading ? <div>LOADING</div> : <AppRoutes />}
            <Flex
                as={'footer'}
                width="100%"
                position={'fixed'}
                bottom="0"
                align={'center'}
                justify="center"
            >
                <Text>Made by {'   '}</Text>
                <Text
                    ml={'0.2rem'}
                    color={'blue.400'}
                    as={'a'}
                    href="http://github.com/matthew-08"
                >
                    Matthew Crosby
                </Text>
            </Flex>
        </div>
    )
}

export default App
