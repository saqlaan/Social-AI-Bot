import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { useTheme } from '../../hooks';

const Startup = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters } = useTheme();

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  );
};

export default Startup;
