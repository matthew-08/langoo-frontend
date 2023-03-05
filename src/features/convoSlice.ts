import {
  createSlice, PayloadAction, createAsyncThunk,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import { UserAuthSchema, SignUpForm } from '../types/types';

export type Message = {
  content: string,
  userId: string,
  timestamp: string,
};

type Conversation = {
  userId: string,
  lastMessageSent: Message,
  conversationId: string,
};

type ConvoState = {
  conversations: Conversation[],
  status: 'idle' | 'loading' | 'success'
};

const initialState = {
  conversations: [],
  status: 'idle',
} as ConvoState;

const fetchConversations = {};

const convoSlice = createSlice({
  name: 'convo',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {

  },
});
