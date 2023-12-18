import React, { createContext, useRef } from 'react';
import { FlatList } from 'react-native';

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

export type ConversationContextType = {
  scrollRef: any;
};

const ConversationContext = createContext<ConversationContextType>({
  scrollRef: null,
});

const ConversationProvider = ({ children }) => {
  const scrollRef = useRef<FlatList>(null);
  return (
    <ConversationContext.Provider
      value={{
        scrollRef,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export { ConversationContext, ConversationProvider };
