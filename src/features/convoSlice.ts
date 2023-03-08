/* eslint-disable no-param-reassign */
import {
  createSlice, PayloadAction, createAsyncThunk,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import { User, Conversation, ConversationId } from '../types/types';

type ConvoState = {
  conversations: Conversation[],
  loading: boolean
  fetched: boolean
  activeConvo: Conversation | null
};

const initialState = {
  conversations: [],
  loading: false,
  fetched: false,
  activeConvo: null,
} as ConvoState;

export const fetchConversations = createAsyncThunk<
Conversation[],
void,
{
  state: RootState
}
>(
  'users/fetchConvos',
  async (_, { getState }) => {
    const { userId } = getState().authReducer.user;
    const userConvos = await fetch(`http://localhost:3000/userInfo/allConvos/${userId}`);
    return userConvos.json();
  },
);

export const addConvo = createAsyncThunk<
Conversation,
User['userId'],
{
  state: RootState
}
>('/convo/addConvo', async (otherUserId, { getState }) => {
  const { userId: currentUserId } = getState().authReducer.user;
  const postConvo = await fetch(`
  http://localhost:3000/convo/addConvo/${currentUserId}/${otherUserId}`, {
    method: 'POST',
    credentials: 'include',
  });
  return postConvo.json();
});

const convoSlice = createSlice({
  name: 'convo',
  initialState,
  reducers: {
    setActiveConvo(state, action: PayloadAction<ConversationId>) {
      const findConvo = state.conversations
        .find((convo) => convo.conversationId === action.payload);
      if (findConvo) {
        state.activeConvo = findConvo;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.pending, (state) => {
      state.loading = true;
      state.fetched = true;
    });
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    });
    builder.addCase(addConvo.fulfilled, (state, action) => {
      state.conversations.push(action.payload);
      state.activeConvo = action.payload;
    });
  },
});

export const { setActiveConvo } = convoSlice.actions;
export default convoSlice.reducer;
