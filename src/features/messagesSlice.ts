import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Message } from './convoSlice';
import Conversation from '../pages/dashboard/components/Conversation';
import { RootState } from '../store';

type ConvoId = string;

type ConversationMessages = {
  [key: ConvoId]: {
    messages: Message[]
  }
};

type State = {
  conversationMessages: ConversationMessages,
  loading: boolean
};

const initialState = {
  conversationMessages: {} as ConversationMessages,
  loading: false,
} as State;

const fetchMessages = createAsyncThunk<
Message[],
ConvoId,
{
  state: RootState
}
>('messages/fetchMessages', async (convoId, { getState }) => {
  const state = getState() as RootState;
});

// click conversation =>
// call reducer on messages with conversation id
// reducer (state, action) => if id in state, get messages, else go fetch messages and set
// a new id = messages

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
});
