import { ThemeVariables } from '../../@types/theme';

export default function ({}: ThemeVariables) {
  return {
    icons: {
      arrowDown: require('./assets/images/arrow.png'),
      tipsIcon: require('./assets/images/tips-icon.png'),
      closeIcon: require('./assets/images/close.png'),
    },
    social: {
      instagram: require('./assets/images/instagram.png'),
      youtube: require('./assets/images/youtube.png'),
    },
    gif: {
      pixelAnimation: require('./assets/images/pixel-animation.gif'),
    },
  };
}
