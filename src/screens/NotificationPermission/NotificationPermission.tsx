import messaging, { firebase } from '@react-native-firebase/messaging';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import RoundedButton from 'rnprototype/src/components/RoundedButton/RoundedButton';
import { AuthContext } from 'rnprototype/src/context/AuthContext';
import { ScrollNavigatorContext } from 'rnprototype/src/context/ScrollNavigator';
import { usePermissions } from 'rnprototype/src/hooks/usePermissions';
import { registerNotificationService } from 'rnprototype/src/services/modules';
import { setLocalData } from 'rnprototype/src/storage';
import { LocalStorageKeys } from 'rnprototype/src/storage/keys';
import { useTheme } from '../../hooks';

const NotificationPermission = () => {
  const { t } = useTranslation(['notificationAsk', 'common']);
  const { Fonts, Gutters, Colors, Layout } = useTheme();
  const { onboardUser, onboardingData } = useContext(AuthContext);
  const { askNotificationPermission } = usePermissions();
  const { popAndClearStack } = useContext(ScrollNavigatorContext);

  useEffect(() => {
    popAndClearStack();
  }, []);

  const handleOnPress = async () => {
    if (!firebase.messaging().isDeviceRegisteredForRemoteMessages) {
      await firebase.messaging().registerDeviceForRemoteMessages();
    }
    await askNotificationPermission();
    const token = await messaging().getToken();
    await registerNotificationService(token);
    await setLocalData(LocalStorageKeys.SEEN_INSIGHTS, []);
    onboardUser();
  };

  return (
    <>
      {onboardingData.introText.split('\n').map((line, index) => (
        <Text key={index} style={[Fonts.titleRegular, Gutters.smallBMargin]}>
          {line}
        </Text>
      ))}

      <View style={[Layout.alignItemsCenter, Gutters.smallBMargin]}>
        <RoundedButton
          color={Colors.buttonOrange}
          text={t('common:others.yes')}
          onPress={handleOnPress}
          disabled={false}
        />
      </View>
    </>
  );
};

export default NotificationPermission;
