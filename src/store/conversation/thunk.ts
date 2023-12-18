import { createAsyncThunk } from '@reduxjs/toolkit';
import { getChatHistory, writeMessage } from 'rnprototype/src/services/modules';

const fetchConversationHistoryAsync = createAsyncThunk(
  'conversation/fetchHistory',
  async () => {
    const response = await getChatHistory();
    return response;
  },
);

const sendMessageAsync = createAsyncThunk(
  'conversation/sendMessage',
  async ({ message, callBackFn }) => {
    const data = await writeMessage({
      message,
      body: {
        is_button: true,
      },
    });
    if (callBackFn) {
      callBackFn();
    }
    return data;
  },
);

const sendActionMessageAsync = createAsyncThunk(
  'conversation/sendActionMessage',
  async ({ message }) => {
    return await writeMessage({ message });
  },
);

export {
  fetchConversationHistoryAsync,
  sendActionMessageAsync,
  sendMessageAsync,
};
