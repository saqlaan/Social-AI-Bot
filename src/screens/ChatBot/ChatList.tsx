import messaging from '@react-native-firebase/messaging';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ConversationContext } from 'rnprototype/src/context/ConversationContext';
import { fetchConversationHistoryAsync } from 'rnprototype/src/store/conversation';
import ChatItem from './ChatItem';

const Separator = () => <View style={{ marginVertical: 20 }} />;
const Loader = () => <ActivityIndicator size={30} />;

const ChatList = React.memo(() => {
  const dispatch = useDispatch();
  const { history: chatHistory, isLoading } = useSelector(
    state => state.conversation,
  );
  const { scrollRef } = useContext(ConversationContext);
  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      reloadChatOnInsight(remoteMessage);
    });
    messaging().onMessage(async remoteMessage => {
      reloadChatOnInsight(remoteMessage);
    });
  }, []);

  const reloadChatOnInsight = useCallback(message => {
    if (message?.data?.notification_type === 'insight') {
      dispatch(fetchConversationHistoryAsync({ fetchSilently: true }));
    }
  }, []);

  const handleOnLayout = useCallback(
    event => setListHeight(event?.nativeEvent?.layout.height),
    [],
  );

  return (
    <FlatList
      ref={scrollRef}
      style={styles.flatlist}
      contentContainerStyle={[styles.listContainer]}
      data={chatHistory}
      renderItem={({ item, index }) => (
        <ChatItem
          index={index}
          item={item}
          key={index}
          parentHeight={listHeight}
        />
      )}
      keyExtractor={(item, index) => index}
      ItemSeparatorComponent={Separator}
      inverted={true}
      ListEmptyComponent={isLoading ? Loader : null}
      windowSize={5}
      initialNumToRender={5}
      onLayout={handleOnLayout}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
    />
  );
});

export default ChatList;

const styles = StyleSheet.create({
  flatlist: {
    marginBottom: 20,
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
