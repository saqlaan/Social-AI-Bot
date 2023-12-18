import { useFlipper } from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { ApplicationStackParamList } from '../../@types/navigation';
import { AuthContext } from '../context/AuthContext';
import ScrollNavigatorProvider from '../context/ScrollNavigator';
import { useTheme } from '../hooks';
import { Startup } from '../screens';
import ChatBot from '../screens/ChatBot/ChatBot';
import {
  fetchConversationHistoryAsync,
  setCreatorId,
} from '../store/conversation';
import OnBoardingNavigator from './Onboarding';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const dispatch = useDispatch();
  const { Layout, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const { user } = useContext(AuthContext);
  const navigationRef = useNavigationContainerRef();
  const [isLoading, setIsLoading] = useState(false);

  useFlipper(navigationRef);

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        setIsLoading(false);
      }, 2000),
    );
  };

  useEffect(() => {
    init();
  }, []);

  const getStack = () => {
    if (user?.creatorId && user?.onboarded) {
      dispatch(fetchConversationHistoryAsync());
      dispatch(setCreatorId({ id: user.creatorId }));
      return <Stack.Screen name="Chatbot" component={ChatBot} />;
    }
    return <Stack.Screen name="Onboarding" component={OnBoardingNavigator} />;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[Layout.fill, { backgroundColor: colors.background }]}
      >
        <ScrollNavigatorProvider>
          <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isLoading ? (
                <Stack.Screen name="Startup" component={Startup} />
              ) : (
                getStack()
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </ScrollNavigatorProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
