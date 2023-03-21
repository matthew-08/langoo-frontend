import { Conversation, Message } from '../types/types'
import {
    onMessage,
    onMessageEdit,
    onMessageDelete,
} from '../features/messagesSlice'
import { updateLatestMessage } from '../features/convoSlice'
import { apiURL } from './apiUrl'
import socket from '../socket'
import { store } from '../store'

const messageHandler = async (
    convo: Conversation,
    currentUserId: string,
    input: string
) => {
    const date = new Date().getTime()
    const message = {
        timestamp: date,
        content: input,
        userId: currentUserId,
        conversationId: convo.conversationId,
    }
    store.dispatch(
        onMessage({
            conversationId: convo.conversationId,
            message: {
                content: input,
                timestamp: date,
                userId: currentUserId as string,
            },
        })
    )
    store.dispatch(
        updateLatestMessage({
            conversationId: convo.conversationId,
            message: {
                content: input,
                timestamp: date,
                userId: currentUserId as string,
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
            userId: currentUserId,
        },
        conversationId: convo.conversationId,
        to: convo.userId,
    })
}

const messageDelete = async ({
    message,
    conversationId,
    userTo,
}: {
    message: Message
    conversationId: Conversation['conversationId']
    userTo: string
}) => {
    store.dispatch(
        onMessageDelete({
            message,
            conversationId,
        })
    )
    socket.emit('msg_delete', {
        message,
        conversationId,
        to: userTo,
    })
    await fetch(
        `${apiURL}/convo/deleteMessage/${conversationId}/${message.timestamp}`,
        {
            method: 'DELETE',
            credentials: 'include',
        }
    )
}

const messageEdit = async ({
    message,
    updatedContent,
    conversationId,
    userTo,
}: {
    message: Message
    updatedContent: string
    conversationId: string
    userTo: string
}) => {
    const updatedMessage: Message = {
        timestamp: message.timestamp,
        userId: message.userId,
        content: updatedContent,
    }
    const updatedData = {
        conversationId,
        message: updatedMessage,
        to: userTo,
    }
    store.dispatch(onMessageEdit(updatedData))
    await fetch(`${apiURL}/convo/updateMessage`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(updatedMessage),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    socket.emit('edit_message', updatedData)
}

export default messageHandler
export { messageDelete, messageEdit }
