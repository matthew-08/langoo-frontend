/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {
  createSlice, PayloadAction, createAsyncThunk, isPending, isRejected, isFulfilled,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import {
  AuthState, UserAuthSchema, SignUpForm, LoginForm,
} from '../types/types';

type ServerError = {
  status: string
  type: string
};

export const logInAttempt = createAsyncThunk<
UserAuthSchema,
LoginForm,
{
  rejectValue: ServerError
}
>(
  'auth/logInAttempt',
  async (user, { rejectWithValue }) => {
    const response = await fetch('http://localhost:3000/auth/signIn', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 404) {
      return rejectWithValue((await response.json()) as ServerError);
    }
    return response.json();
  },
);
// GET request sent at initial load, check for existing session.
// Success returns auth schema.
export const checkForSession = createAsyncThunk(
  'auth/logInAttempt',
  async () => {
    const response = await fetch(
      'http://localhost:3000/auth/signIn',
      {
        credentials: 'include',
      },
    );
    return response.json();
  },
);

export const registerAttempt = createAsyncThunk<
UserAuthSchema,
SignUpForm,
{
  rejectValue: ServerError
}
>(
  'auth/signUpAttempt',
  async (signUpForm:SignUpForm, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(signUpForm),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 404) {
        return rejectWithValue((await response.json()) as ServerError);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue({ status: 'Unknown server error' } as ServerError);
    }
  },
);

// All auth actions return fulfilled promises and the same payload if successful.
const checkFulfilled = isFulfilled(registerAttempt, checkForSession, logInAttempt);
const checkPending = isPending(registerAttempt, checkForSession, logInAttempt);
const checkRejected = isRejected(registerAttempt, checkForSession, logInAttempt);

const initialState = {
  user: {
    username: '',
    loggedIn: false,
    userId: null,
    userImg: null,
  },
  loading: false,
  error: null,
} as AuthState;

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(checkPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(checkRejected, (state, action) => {
      state.loading = false;
      state.user = initialState.user; // reset to initial user state for safety
      if (action.payload) {
        state.error = action.payload.status;
      }
    });
    builder.addMatcher(checkFulfilled, (state, action: PayloadAction<UserAuthSchema>) => {
      state.loading = false;
      state.user = action.payload;
    });
  },
});

export const getUser = (state: RootState) => state.authReducer;

export default authReducer.reducer;
