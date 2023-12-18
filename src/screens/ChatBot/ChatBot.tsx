import React, { useCallback, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import FlashMessage from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConversationProvider } from 'rnprototype/src/context/ConversationContext';
import { InsightsProvider } from 'rnprototype/src/context/Insights';
import { useKeyboardVisible } from 'rnprototype/src/hooks/useKeyboard';
import { useKeyboardHeight } from 'rnprototype/src/hooks/useKeyboardHeight';
import { useTheme } from '../../hooks';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import TipsOverlay from './TipsOverlay';

const ChatBot = () => {
  const inputRef = useRef();
  const isKeyboardVisible = useKeyboardVisible();
  const keyboardHeight = useKeyboardHeight();
  const { Gutters, Layout, Images } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const [text, setText] = useState('');

  const handleOnCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleOnPressDummyInput = useCallback(() => {
    setIsInputVisible(true);
  }, []);

  const handleOnInputBlur = useCallback(() => {
    setIsInputVisible(false);
  }, []);

  return (
    <>
      <ConversationProvider>
        <InsightsProvider>
          <View
            style={[
              styles.container,
              isKeyboardVisible
                ? { marginBottom: keyboardHeight - bottom }
                : null,
            ]}
          >
            <View style={[styles.chatContainer]}>
              <ChatList />
            </View>
            {isInputVisible && (
              <View
                style={[
                  Layout.justifyContentEnd,
                  Layout.row,
                  Layout.fullWidth,
                  Gutters.regularBMargin,
                ]}
              >
                <ChatInput
                  ref={inputRef}
                  onChangeText={(value: string) => setText(value)}
                  value={text}
                  setValue={setText}
                  onBlur={handleOnInputBlur}
                />
              </View>
            )}
            {!isKeyboardVisible && (
              <View
                style={[
                  Gutters.smallBMargin,
                  Layout.row,
                  Layout.fullWidth,
                  styles.inputContainer,
                ]}
              >
                <Pressable
                  onPress={handleOnPressDummyInput}
                  style={styles.input}
                >
                  <Text style={styles.dummyInputText}>
                    {text === '' ? 'thoughts' : text}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setModalVisible(true)}
                  style={[styles.tipIconPressable]}
                >
                  <Image
                    style={styles.tipIcon}
                    source={Images.icons.tipsIcon}
                  />
                </Pressable>
              </View>
            )}
            <TipsOverlay
              visible={modalVisible}
              handleOnPressClose={handleOnCloseModal}
            />
          </View>
          <FlashMessage position="top" />
        </InsightsProvider>
      </ConversationProvider>
    </>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    paddingHorizontal: 15,
  },
  chatContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    fontFamily: 'Klee One',
    flex: 1,
  },
  tipIcon: {
    width: 35,
    height: 35,
  },
  tipIconPressable: {
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummyInputText: {
    fontSize: 18,
    color: '#999999',
  },
});
