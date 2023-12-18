import React, { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from 'rnprototype/src/context/AuthContext';
import { ScrollNavigatorContext } from 'rnprototype/src/context/ScrollNavigator';
import { useTheme } from '../../hooks';

const PlatformSelection = () => {
  const { t } = useTranslation(['platformSelection', 'intro']);
  const { Fonts, Gutters, Images, Layout } = useTheme();
  const { addNextScreen, scrollToItem } = useContext(ScrollNavigatorContext);
  const { loadOnboardingData, onboardingData } = useContext(AuthContext);

  useEffect(() => {
    if (onboardingData === null) {
      loadOnboardingData();
    }
  }, [onboardingData]);

  const onPressSocialIcon = useCallback(() => {
    addNextScreen();
    setTimeout(() => {
      scrollToItem({});
    }, 200);
  }, []);

  return (
    <>
      <Text style={[Fonts.titleLarge, styles.title]}>
        {t('platformSelection:welcome')}
      </Text>
      <View style={Gutters.smallTMargin} />
      <View style={{ width: '80%' }}>
        <Text style={[Fonts.titleRegular]}>
          {t('platformSelection:letsStartBy')}
        </Text>
      </View>
      <View style={Gutters.smallTMargin} />
      <Text style={[Fonts.titleRegular]}>
        {t('platformSelection:WhereDoYou')}
      </Text>
      <View style={Gutters.regularMargin} />
      <View style={[Layout.alignItemsCenter]}>
        <Pressable onPress={onPressSocialIcon}>
          <Image style={styles.img} source={Images.social.instagram} />
        </Pressable>
        <View style={Gutters.smallTMargin} />
        <Pressable onPress={onPressSocialIcon}>
          <Image style={styles.img} source={Images.social.youtube} />
        </Pressable>
      </View>
    </>
  );
};

export default PlatformSelection;

const styles = StyleSheet.create({
  title: {
    lineHeight: 65,
  },
  img: {
    width: 125,
    height: 125,
    objectFit: 'contain',
  },
});
