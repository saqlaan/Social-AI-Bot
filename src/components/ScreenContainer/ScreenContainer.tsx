import React, { ReactNode, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks';

const ScreenContainer = ({ children }: { children: ReactNode }) => {
  const { Gutters, Layout } = useTheme();
  const { top, bottom } = useSafeAreaInsets();

  const height = useMemo(() => {
    return Dimensions.get('window').height - top - bottom;
  }, [top, bottom]);

  return (
    <View
      style={[
        Layout.fill,
        Layout.fullWidth,
        Gutters.regularHPadding,
        Gutters.regularTPadding,
        {
          height: height,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default ScreenContainer;
