import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '../../hooks';

type Props = {
  text: string;
  color: string;
  disabled?: boolean;
  onPress: () => void;
};

const RoundedButton = (props: Props) => {
  const { Fonts, Colors } = useTheme();

  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <View
        style={[
          styles.button,
          { backgroundColor: props.disabled ? Colors.buttonGrey : props.color },
        ]}
      >
        <Text
          style={[
            Fonts.titleSmall,
            { textAlign: 'center' },
            props.disabled ? Colors.buttonGrey : Colors.textBlack,
          ]}
        >
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoundedButton;

RoundedButton.defaultProps = {
  disabled: false,
};

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 120,
  },
});
