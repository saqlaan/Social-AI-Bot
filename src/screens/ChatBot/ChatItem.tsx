import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RoundedButton from 'rnprototype/src/components/RoundedButton/RoundedButton';
import {
  ChatType,
  ConversationContext,
} from 'rnprototype/src/context/ConversationContext';
import { InsightsContext } from 'rnprototype/src/context/Insights';
import { sendActionMessageAsync } from 'rnprototype/src/store/conversation';
import { scale } from 'rnprototype/src/utils/scale';
import { useTheme } from '../../hooks';
const ChatItem = React.memo(
  ({ item, index, parentHeight }: { item: ChatType; index: number }) => {
    const dispatch = useDispatch();
    const { Fonts, Colors, Layout, Gutters } = useTheme();
    const { message, role } = item;
    const { scrollRef } = useContext(ConversationContext);
    const { recentBotMessageId } = useSelector(state => state.conversation);
    const { insightSeen, isInsightSeen } = useContext(InsightsContext);
    const [itemHeight, setItemHeight] = useState(0);
    const [isActionProcessing, setIsActionProcessing] = useState(false);

    useEffect(() => {
      if (
        index === 0 &&
        item.insight === 'true' &&
        !isInsightSeen(item.message_id)
      ) {
        if (itemHeight <= parentHeight) {
          scrollRef.current.scrollToIndex({
            index: 0,
            animated: false,
          });
        } else {
          const offset = parentHeight - itemHeight;
          scrollRef.current.scrollToIndex({
            index: 0,
            animated: false,
            viewOffset: offset,
          });
        }
        insightSeen(item.message_id);
      } else if (index === 0 && item?.message_id === recentBotMessageId) {
        const maxHeight = parentHeight * 0.7;
        if (itemHeight < maxHeight) {
          scrollRef.current.scrollToIndex({
            index: 0,
            animated: false,
          });
        } else {
          scrollRef.current.scrollToOffset({
            offset: itemHeight * 0.7,
            animated: false,
          });
        }
      }
    }, [itemHeight, index, recentBotMessageId]);

    const handleOnButtonPress = useCallback(
      async (message: string) => {
        setIsActionProcessing(true);
        dispatch(
          sendActionMessageAsync({
            message,
            callBackFn: () => {
              setIsActionProcessing(false);
            },
          }),
        );
      },
      [scrollRef],
    );

    const getItemHeight = useMemo(() => {
      if (
        index === 0 &&
        item.insight === 'true' &&
        !isInsightSeen(item.message_id)
      ) {
        return { minHeight: parentHeight };
      }
      return {};
    }, [item.insight, parentHeight, index]);

    const handleOnLayout = useCallback(
      event => setItemHeight(event?.nativeEvent?.layout.height),
      [],
    );

    if (role === 'assistant') {
      return (
        <View
          style={[styles.botTextContainer, getItemHeight]}
          onLayout={handleOnLayout}
        >
          <View>
            <Text style={[Fonts.textRegular, { fontSize: scale(22) }]}>
              {item.message}
            </Text>
          </View>
          {item.insight === 'true' && index === 0 && (
            <>
              <View
                style={[
                  Layout.row,
                  Layout.justifyContentBetween,
                  Gutters.regularPadding,
                ]}
              >
                <RoundedButton
                  onPress={() => handleOnButtonPress('tell me more')}
                  color={Colors.buttonGreen}
                  text="tell me more"
                  disabled={isActionProcessing}
                />
                <RoundedButton
                  onPress={() => handleOnButtonPress('tell me more')}
                  color={Colors.buttonOrange}
                  text="OK I'll try"
                  disabled={isActionProcessing}
                />
              </View>
              {isActionProcessing && (
                <View>
                  <ActivityIndicator />
                </View>
              )}
            </>
          )}
        </View>
      );
    } else {
      return (
        <View style={[styles.userTextBox]}>
          <Text style={[styles.userText]}>{message}</Text>
        </View>
      );
    }
  },
);

export default ChatItem;

const styles = StyleSheet.create({
  userTextBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  botTextContainer: {
    paddingHorizontal: 20,
  },
  userText: {
    width: '80%',
    borderWidth: 1,
    borderRightColor: 'transparent',
    borderColor: '#9747FF',
    padding: 10,
    color: '#9747FF',
    fontSize: 24,
  },
  botText: {
    maxHeight: 210,
  },
  showMoreText: {
    fontSize: 14,
    color: '#9747FF',
  },
});
