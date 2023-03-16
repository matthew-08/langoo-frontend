import { Conversation } from '../types/types'
import { useAppDispatch } from './hooks'
import { onMessage } from '../features/messagesSlice'
import { updateLatestMessage } from '../features/convoSlice'
import { apiURL } from './apiUrl'
import socket from '../socket'

const messageHandler = async (
    convo: Conversation,
    currentUser: string,
    input: string
) => {
    const dispatch = useAppDispatch()

    const date = new Date().getTime()
    const message = {
        timestamp: date,
        content: input,
        userId: currentUser,
        conversationId: convo.conversationId,
    }
    dispatch(
        onMessage({
            conversationId: convo.conversationId,
            message: {
                content: input,
                timestamp: date,
                userId: currentUser as string,
            },
        })
    )
    dispatch(
        updateLatestMessage({
            conversationId: convo.conversationId,
            message: {
                content: input,
                timestamp: date,
                userId: currentUser as string,
            },
        })
    )
    await fetch(`${apiURL}/convo/sendMessage`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
    socket.emit('private_chat', {
        message: {
            timestamp: date,
            content: input,
            userId: currentUser,
        },
        conversationId: convo.conversationId,
        to: convo.userId,
    })
}

export default messageHandler
