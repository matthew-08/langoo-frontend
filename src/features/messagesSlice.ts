/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
    Conversation,
    Message,
    InitialConversationFetch,
    MessagePayload,
} from '../types/types'
import { addConvo, fetchConversations } from './convoSlice'

type ConversationId = string

type ConversationMessages = {
    [key: ConversationId]: {
        messages: Message[]
    }
}

type MessagesState = {
    conversationMessages: ConversationMessages
    loading: boolean
}

const initialState = {
    conversationMessages: {} as ConversationMessages,
    loading: false,
} as MessagesState

type ServerReturn = {
    messages: Message[]
    convoId: ConversationId
}

export const fetchMessages = createAsyncThunk<
    ServerReturn,
    ConversationId,
    {
        state: RootState
    }
>('messages/fetchMessages', async (convoId) => {
    const messages = await fetch(
        `http://localhost:3000/convo/getAllMessages/${convoId}`
    )
    const payload = {
        messages: await messages.json(),
        convoId,
    }
    return payload
})

// click conversation =>
// call reducer on messages with conversation id
// reducer (state, action) => if id in state, get messages, else go fetch messages and set
// a new id = messages

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        onMessage(state, action: PayloadAction<MessagePayload>) {
            const { conversationId } = action.payload
            const { message } = action.payload
            if (state.conversationMessages[conversationId]) {
                state.conversationMessages[conversationId].messages.push(
                    message
                )
            }
        },
        onMessageEdit(state, action: PayloadAction<MessagePayload>) {
            const { conversationId } = action.payload
            const { message } = action.payload
            const fetchExistingMessage = state.conversationMessages[
                conversationId
            ].messages.find((msg) => msg.timestamp === message.timestamp)
            if (fetchExistingMessage) {
                fetchExistingMessage.content = message.content
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.loading = false
            const { convoId, messages } = action.payload
            state.conversationMessages[convoId] = {
                messages,
            }
        })
        builder.addCase(
            fetchConversations.fulfilled,
            (state, action: PayloadAction<InitialConversationFetch[]>) => {
                action.payload.forEach((convo) => {
                    state.conversationMessages[convo.conversationId] = {
                        messages: convo.latestMessage
                            ? [convo.latestMessage]
                            : [],
                    }
                })
            }
        )
        builder.addCase(
            addConvo.fulfilled,
            (state, action: PayloadAction<Conversation>) => {
                state.conversationMessages[action.payload.conversationId] = {
                    messages: [],
                }
            }
        )
    },
})
export const { onMessage, onMessageEdit } = messagesSlice.actions

export default messagesSlice.reducer
