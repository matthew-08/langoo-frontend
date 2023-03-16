/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store'
import {
    User,
    Conversation,
    ConversationId,
    Message,
    InitialConversationFetch,
    MessagePayload,
} from '../types/types'
import { apiURL } from '../utils/apiUrl'

type ConvoState = {
    conversations: Conversation[]
    loading: boolean
    fetched: boolean
    activeConvo: Conversation | null
}

const initialState = {
    conversations: [],
    loading: false,
    fetched: false,
    activeConvo: null,
} as ConvoState

export const fetchConversations = createAsyncThunk<
    InitialConversationFetch[],
    void,
    {
        state: RootState
    }
>('users/fetchConvos', async (_, { getState }) => {
    const { userId } = getState().authReducer.user
    const userConvos = await fetch(`${apiURL}/userInfo/allConvos/${userId}`, {
        credentials: 'include',
    })
    return userConvos.json()
})

export const addConvo = createAsyncThunk<
    Conversation,
    User['userId'],
    {
        state: RootState
    }
>('/convo/addConvo', async (otherUserId, { getState }) => {
    const { userId: currentUserId } = getState().authReducer.user
    const postConvo = await fetch(
        `
  ${apiURL}/convo/addConvo/${currentUserId}/${otherUserId}`,
        {
            method: 'POST',
            credentials: 'include',
        }
    )
    return postConvo.json()
})

const convoSlice = createSlice({
    name: 'convo',
    initialState,
    reducers: {
        setActiveConvo(state, action: PayloadAction<ConversationId>) {
            const findConvo = state.conversations.find(
                (convo) => convo.conversationId === action.payload
            )
            if (findConvo) {
                state.activeConvo = findConvo
            }
        },
        updateLatestMessage(state, action: PayloadAction<MessagePayload>) {
            const { message, conversationId } = action.payload
            const findConvo = state.conversations.find(
                (convo) => convo.conversationId === conversationId
            )
            console.log(message)
            console.log('in updatelatestmessage')
            if (findConvo) {
                findConvo.latestMessage = message
                /* state.conversations.sort(
                    (a, b) =>
                        Number(b.latestMessage.timestamp) -
                        Number(a.latestMessage.timestamp)
                ) */
            }
        },
        conversationFetched(state, action: PayloadAction<ConversationId>) {
            const conversationId = action.payload
            const findConvo = state.conversations.find(
                (convo) => convo.conversationId === conversationId
            )
            if (findConvo) {
                findConvo.fetched = true
            }
            /* state.conversations.sort((a, b) => Number(b.latestMessage.timestamp) - Number(a.latestMessage.timestamp)); */
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConversations.pending, (state) => {
            state.loading = true
            state.fetched = true
        })
        builder.addCase(fetchConversations.fulfilled, (state, action) => {
            state.loading = false
            state.conversations = action.payload
            // eslint-disable-next-line no-return-assign
            state.conversations.map((convo) => (convo.fetched = false))
        })
        builder.addCase(addConvo.fulfilled, (state, action) => {
            state.conversations.push(action.payload)
            state.activeConvo = action.payload
        })
    },
})

export const { setActiveConvo, updateLatestMessage, conversationFetched } =
    convoSlice.actions
export default convoSlice.reducer
