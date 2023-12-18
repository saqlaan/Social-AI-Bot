import { createSlice } from '@reduxjs/toolkit';
import {
  fetchConversationHistoryAsync,
  sendActionMessageAsync,
  sendMessageAsync,
} from './thunk';

const initialState = {
  history: [],
  isLoading: false,
  recentBotMessageId: undefined,
  creatorId: null,
} as ConversationState;

const slice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setRecentBotMessageId: (state, { payload: { id } }) => {
      state.recentBotMessageId = id;
    },
    addNewMessage: (state, { payload: { message } }) => {
      state.history = [message, ...state.history];
    },
    setCreatorId: (state, { payload: { id } }) => {
      state.creatorId = id;
    },
  },
  extraReducers: {
    [fetchConversationHistoryAsync.pending]: (state, { meta }) => {
      const fetchSilently = meta?.silentLoading || false;
      if (!fetchSilently) {
        state.isLoading = true;
      }
    },
    [fetchConversationHistoryAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.history = payload;
    },
    [fetchConversationHistoryAsync.rejected]: state => {
      state.isLoading = false;
    },
    [sendMessageAsync.pending]: (state, { meta }) => {
      state.history = [
        {
          creator_id: state.creatorId,
          datetime:
            new Date().toISOString().slice(0, 19).replace('T', ' ') + '.000',
          message: meta.arg?.message || '',
          prompt_id: '',
          role: 'user',
          user_id: '0d5e3866-7d66-438c-8205-617ecb84276sdb',
          message_id: '',
        },
        ...state.history,
      ];
    },
    [sendMessageAsync.fulfilled]: (state, { payload }) => {
      if (payload.message) {
        const { datetime, message: msg, message_id } = payload;
        state.recentBotMessageId = message_id;
        state.history = [
          {
            creator_id: state.creatorId,
            datetime,
            message: msg,
            prompt_id: '',
            role: 'assistant',
            user_id: '0d5e3866-7d66-438c-8205-617ecb84276sdb',
            isNew: true,
            message_id,
          },
          ...state.history,
        ];
      }
    },
    [sendActionMessageAsync.fulfilled]: (state, { payload }) => {
      if (payload.message) {
        const { datetime, message: msg, message_id } = payload;
        state.recentBotMessageId = message_id;
        state.history = [
          {
            creator_id: state.creatorId,
            datetime,
            message: msg,
            prompt_id: '',
            role: 'assistant',
            message_id,
            user_id: '0d5e3866-7d66-438c-8205-617ecb84276sdb',
          },
          ...state.history,
        ];
      }
    },
  },
});

export {
  fetchConversationHistoryAsync,
  sendActionMessageAsync,
  sendMessageAsync,
};
export const { addNewMessage, setRecentBotMessageId, setCreatorId } =
  slice.actions;
export default slice.reducer;

export type ConversationState = {
  history: ChatType[];
  isLoading: boolean;
  recentBotMessageId: string | undefined;
  creatorId: string | null;
};

export type ChatType = {
  creator_id: string;
  datetime: string;
  message: string;
  prompt_id: string;
  role: 'user' | 'assistant';
  user_id: string;
  insight?: string;
  isNew?: boolean;
  message_id: string;
};
