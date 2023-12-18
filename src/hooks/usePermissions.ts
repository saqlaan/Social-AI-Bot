import messaging, { firebase } from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { isAndroid } from '../utils/functions';

export function usePermissions() {
  useEffect(() => {
    (async () => {
      if (!firebase.messaging().isDeviceRegisteredForRemoteMessages) {
        await firebase.messaging().registerDeviceForRemoteMessages();
      }
    })();
  }, []);

  const askNotificationPermission = async () => {
    let permission = null;
    if (isAndroid) {
      permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } else {
      permission = await messaging().requestPermission();
    }
    return permission;
  };
  return { askNotificationPermission };
}
