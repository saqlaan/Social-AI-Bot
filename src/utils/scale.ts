import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;
let smallScreenFactor = 1;
if (width < 380) {
  smallScreenFactor = 0.9;
}

const scale = (size: number) =>
  (width / guidelineBaseWidth) * size * smallScreenFactor;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { moderateScale, scale, verticalScale };
