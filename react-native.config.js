module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/theme/assets/fonts'],
  dependencies: {
    ...(process.env.NO_FLIPPER
      ? { 'react-native-flipper': { platforms: { ios: null } } }
      : {}),
  },
};
