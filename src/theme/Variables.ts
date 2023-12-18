/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { ThemeNavigationColors } from '../../@types/theme';
import { scale } from '../utils/scale';

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',

  textGray800: '#000000',
  textGray400: '#4D4D4D',
  textGray200: '#A1A1A1',
  textGray100: '#666666',
  textBlack: '#333333',
  primary: '#E14032',
  success: '#28a745',
  error: '#dc3545',
  buttonOrange: '#FEA34E',
  buttonGreen: '#8FBB88',
  buttonGrey: '#D9D9D9',
  //ComponentColors
  circleButtonBackground: '#E1E1EF',
  circleButtonColor: '#44427D',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: '#fff',
  card: '#EFEFEF',
};

/**
 * FontSize
 */
export const FontSize = {
  tiny: scale(14),
  small: scale(16),
  regular: scale(20),
  large: scale(40),
};

/**
 * Metrics Sizes
 */
const tiny = scale(10);
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const large = regular * 2; // 60
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
