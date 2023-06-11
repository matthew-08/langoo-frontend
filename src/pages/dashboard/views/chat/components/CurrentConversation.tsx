import React, { useEffect } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import MessageInput from './MessageInput'
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks'
import { fetchMessages, onMessage } from '../../../../../features/messagesSlice'
import ChatMessage from './ChatMessage'
import ChatHeader from './ChatHeader'
import { Conversation, MessagePayload } from '../../../../../types/types'
import socket from '../../../../../socket'
import { conversationFetched } from '../../../../../features/convoSlice'

export default function CurrentConversation() {
    const dispatch = useAppDispatch()
    const currentConvoView = useAppSelector(
        (state) => state.viewSlice.componentViews.userConversation
    )
    const isMobileView = useAppSelector(
        (state) => state.viewSlice.smallerThan700
    )
    const currentConvo = useAppSelector((state) =>
        state.convoSlice.conversations.find(
            (convo) =>
                convo.conversationId ===
                state.convoSlice.activeConvo?.conversationId
        )
    ) as Conversation
    const convoMessages = useAppSelector(
        (state) =>
            state.messagesSlice.conversationMessages[
                currentConvo.conversationId
            ].messages
    )
    const activeConvo = useAppSelector(
        (state) => state.convoSlice.activeConvo?.conversationId
    )
    useEffect(() => {
        socket.on('chat_message', (data: MessagePayload) => {
            console.log('socket received message')
            console.log(data)
            dispatch(onMessage(data))
        })
        socket.on('on_edit', () => {
            console.log('test')
        })
        return () => {
            socket.off('chat_message')
        }
    }, [])

    useEffect(() => {
        if (!currentConvo.fetched) {
            dispatch(fetchMessages(currentConvo.conversationId))
            dispatch(conversationFetched(currentConvo.conversationId))
        }
    }, [activeConvo])

    return (
        <Flex
            as="main"
            flex="1"
            display={isMobileView ? currentConvoView : 'flex'}
            flexDir="column"
            maxH="100%"
        >
            <ChatHeader />
            <Flex
                as="main"
                flex="1"
                flexDir="column-reverse"
                gap="1rem"
                maxWidth="100%"
                padding="1rem"
                maxH="100%"
                overflow="auto"
                css={{
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#2d3055',
                        borderRadius: '24px',
                    },
                }}
            >
                {convoMessages &&
                    convoMessages.map((message) => (
                        <ChatMessage
                            key={message.timestamp}
                            message={message}
                        />
                    ))}
            </Flex>
            <MessageInput convo={currentConvo} />
        </Flex>
    )
}
