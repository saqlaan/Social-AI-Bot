import {
  CheckingPosts,
  Login,
  NotificationPermission,
  PlatformSelection,
} from '../../screens';
import Intro from '../../screens/Intro/Intro';

export const screens = [
  {
    key: '1',
    name: 'Intro',
    component: Intro,
  },
  {
    key: '2',
    name: 'Login',
    component: Login,
  },
  {
    key: '3',
    name: 'PlatformSelection',
    component: PlatformSelection,
  },
  {
    key: '4',
    name: 'CheckingPosts',
    component: CheckingPosts,
  },
  {
    key: '5',
    name: 'NotificationPermission',
    component: NotificationPermission,
  },
];

export const onBoardingScreens = [
  {
    key: '3',
    name: 'PlatformSelection',
    component: PlatformSelection,
  },
  {
    key: '4',
    name: 'CheckingPosts',
    component: CheckingPosts,
  },
  {
    key: '5',
    name: 'NotificationPermission',
    component: NotificationPermission,
  },
];
