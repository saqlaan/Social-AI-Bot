import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Onboarding: NavigatorScreenParams<MainParamsList>;
  Chatbot: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
