import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from 'rnprototype/src/context/AuthContext';
import { ScrollNavigatorContext } from 'rnprototype/src/context/ScrollNavigator';
import { useTheme } from '../../hooks';

const CheckingPosts = () => {
  const { t } = useTranslation(['platformSelection', 'intro', 'common']);
  const { Fonts, Layout, Gutters } = useTheme();
  const { addNextScreen, scrollToEnd, popAndClearStack } = useContext(
    ScrollNavigatorContext,
  );
  const { onboardingData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    popAndClearStack();
  }, []);

  const handleOnLoadStart = () => {
    setIsLoading(true);
  };

  const handleOnLoad = () => {
    setIsLoading(false);
    setTimeout(() => {
      addNextScreen();
      setTimeout(() => {
        scrollToEnd();
      }, 200);
    }, 4000);
  };

  return (
    <View style={[Layout.justifyContentCenter, Layout.fullHeight]}>
      <View style={{ width: '80%' }}>
        <Text style={[Fonts.titleRegular]}>
          {t('common:others:checkingOutYourPosts')}
        </Text>
      </View>
      {isLoading && (
        <View style={[Gutters.smallTMargin]}>
          <ActivityIndicator size={30} />
        </View>
      )}
      {onboardingData?.gifUrl && (
        <Image
          onLoadStart={handleOnLoadStart}
          onLoad={handleOnLoad}
          style={styles.img}
          source={{ uri: onboardingData?.gifUrl }}
        />
      )}
    </View>
  );
};

export default CheckingPosts;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 400,
    objectFit: 'contain',
  },
});
