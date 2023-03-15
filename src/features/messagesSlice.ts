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
import { ConversationId, ConversationMessages } from '../types/types'
import { MessagesState } from '../types/types'
import { apiURL } from '../utils/apiUrl'




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
        `${apiURL}/convo/getAllMessages/${convoId}`
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
        onMessageDelete(state, action: PayloadAction<MessagePayload>) {
          const { conversationId } = action.payload
          const { message } = action.payload
          const convoMessagesRef = state.conversationMessages[conversationId].messages
          const updateState = convoMessagesRef.filter(msg => msg.timestamp !== message.timestamp)
          state.conversationMessages[conversationId].messages = updateState
        }
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
export const { onMessage, onMessageEdit, onMessageDelete } = messagesSlice.actions

export default messagesSlice.reducer
