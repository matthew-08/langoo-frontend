/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/types'
import { apiURL } from '../utils/apiUrl'

interface UsersState {
    allUsers: User[]
    loading: boolean
}

const initialState = {
    allUsers: [],
    loading: false,
} as UsersState

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch(`${apiURL}/userInfo/allUsers/`, {
        credentials: 'include',
    })
    return response.json()
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchUsers.fulfilled,
            (state, action: PayloadAction<User[]>) => {
                state.loading = false
                state.allUsers = action.payload
            }
        )
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
    },
})

export default usersSlice.reducer

// Whenever user conversations are loaded, fetch all conversations for user.  Conversations have a
// userId and the id of last message sent
// inside the conversationCard component itself, we can check if the userId is in state.
// not in state ? fetch it and put it inside of state.
