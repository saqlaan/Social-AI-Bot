import React, { forwardRef, useCallback } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import { sendMessageAsync } from 'rnprototype/src/store/conversation';
const ChatInput = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const _onSubmitEditing = useCallback(() => {
    if (props.value != '') {
      dispatch(sendMessageAsync({ message: props.value }));
    }
    props.setValue('');
  }, [props.value]);

  return (
    <TextInput
      autoFocus
      ref={ref}
      autoCapitalize={'none'}
      autoCorrect={false}
      style={styles.input}
      onSubmitEditing={_onSubmitEditing}
      selectionColor={'#9747FF'}
      {...props}
    />
  );
});

export default ChatInput;

const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderWidth: 1,
    borderRightColor: 'transparent',
    borderColor: '#9747FF',
    padding: 10,
    color: '#9747FF',
    fontSize: 24,
  },
});
