/**
 * This file contains all application's style relative to fonts
 */
import { Platform, StyleSheet } from 'react-native';
import { ThemeVariables } from '../../@types/theme';

export default function ({ FontSize, Colors }: ThemeVariables) {
  return StyleSheet.create({
    textTiny: {
      fontFamily: Platform.OS === 'android' ? 'klee_one_regular' : 'Klee One',
      fontSize: FontSize.tiny,
      color: Colors.textGray400,
      lineHeight: FontSize.tiny * 1.2,
    },
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.textBlack,
      fontFamily: Platform.OS === 'android' ? 'klee_one_regular' : 'Klee One',
      lineHeight: FontSize.small * 1.2,
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.textGray400,
      fontFamily: Platform.OS === 'android' ? 'klee_one_regular' : 'Klee One',
      lineHeight: FontSize.regular * 1.2,
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.textGray400,
    },
    textBold: {
      fontWeight: 'bold',
    },
    textUppercase: {
      textTransform: 'uppercase',
    },
    titleSmall: {
      fontSize: FontSize.small * 1.5,
      color: Colors.textGray800,
      fontFamily: Platform.OS === 'android' ? 'klee_one_regular' : 'Klee One',
      lineHeight: FontSize.small * 1.7,
    },
    titleRegular: {
      fontFamily: Platform.OS === 'android' ? 'klee_one_regular' : 'Klee One',
      fontSize: FontSize.regular * 1.5,
      color: Colors.textBlack,
      lineHeight: FontSize.regular * 1.7,
    },
    titleLarge: {
      fontFamily: Platform.OS === 'android' ? 'klee_one_regular' : 'Klee One',
      fontSize: FontSize.large * 1.5,
      color: Colors.textBlack,
      lineHeight: FontSize.large * 1.7,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    textError: {
      color: Colors.error,
    },
    textSuccess: {
      color: Colors.success,
    },
    textPrimary: {
      color: Colors.primary,
    },
    textLight: {
      color: Colors.textGray200,
    },
    textLobster: {
      fontFamily: 'lobster',
      fontWeight: 'normal',
    },
  });
}
