/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
    isPending,
    isRejected,
    isFulfilled,
} from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
    AuthState,
    UserAuthSchema,
    SignUpForm,
    LoginForm,
} from '../types/types'
import { apiURL } from '../utils/apiUrl'

type ServerError = {
    status: string
    type: string
}
// USER LOGIN ATTEMPT
export const logInAttempt = createAsyncThunk<
    UserAuthSchema,
    LoginForm,
    {
        rejectValue: ServerError
    }
>('auth/logInAttempt', async (user, { rejectWithValue }) => {
    const response = await fetch(`${apiURL}/auth/signIn`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.status === 404) {
        return rejectWithValue((await response.json()) as ServerError)
    }
    return response.json()
})

// CHECK FOR EXISTING SESSION
export const checkForSession = createAsyncThunk(
    'auth/logInAttempt',
    async () => {
        const response = await fetch(`${apiURL}/auth/signIn`, {
            credentials: 'include',
        })
        return response.json()
    }
)

// REGISTER USER
export const registerAttempt = createAsyncThunk<
    UserAuthSchema,
    SignUpForm,
    {
        rejectValue: ServerError
    }
>('auth/signUpAttempt', async (signUpForm: SignUpForm, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiURL}/auth/register`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(signUpForm),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 404) {
            return rejectWithValue((await response.json()) as ServerError)
        }
        return await response.json()
    } catch (error) {
        return rejectWithValue({
            status: 'Unknown server error',
        } as ServerError)
    }
})

// All auth actions return fulfilled promises and the same payload if successful.
const checkFulfilled = isFulfilled(
    registerAttempt,
    checkForSession,
    logInAttempt
)
const checkPending = isPending(registerAttempt, checkForSession, logInAttempt)
const checkRejected = isRejected(registerAttempt, checkForSession, logInAttempt)

const initialState = {
    user: {
        username: '',
        loggedIn: false,
        userId: null,
        userImg: null,
        bio: null,
        learningLanguages: null,
        nativeLanguage: null,
    },
    loading: false,
    error: null,
} as AuthState

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(checkPending, (state) => {
            state.loading = true
        })
        builder.addMatcher(checkRejected, (state, action) => {
            state.loading = false
            state.user = initialState.user // reset to initial user state for safety
        })
        builder.addMatcher(
            checkFulfilled,
            (state, action: PayloadAction<UserAuthSchema>) => {
                state.loading = false
                state.user = action.payload
            }
        )
    },
})

export const getUser = (state: RootState) => state.authReducer

export default authReducer.reducer
