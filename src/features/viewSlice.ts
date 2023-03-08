/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MobileViewOptions = 'allConversations' | 'userConversation';

interface ViewState {
  smallerThan700: boolean,
  currrentMobileView: MobileViewOptions
  componentViews: {
    allConversations: 'flex' | 'none',
    userConversation: 'flex' | 'none',
  }
}

const initialState = {
  smallerThan700: false,
  currrentMobileView: 'allConversations',
  componentViews: {
    allConversations: 'flex',
    userConversation: 'none',
  },
} as ViewState;

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    isSmallerThan700(state, action: PayloadAction<boolean>) {
      state.smallerThan700 = action.payload;
    },
    viewStatusSet(state, action: PayloadAction<MobileViewOptions>) {
      state.currrentMobileView = action.payload;
      if (action.payload === 'allConversations') {
        state.componentViews.allConversations = 'flex';
        state.componentViews.userConversation = 'none';
      } else {
        state.componentViews.userConversation = 'flex';
        state.componentViews.allConversations = 'none';
      }
    },
  },
});

export const { isSmallerThan700, viewStatusSet } = viewSlice.actions;

export default viewSlice.reducer;
