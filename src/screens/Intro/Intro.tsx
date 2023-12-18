import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollNavigatorContext } from 'rnprototype/src/context/ScrollNavigator';
import { scale } from 'rnprototype/src/utils/scale';
import { useTheme } from '../../hooks';

const Intro = () => {
  const { t } = useTranslation(['intro']);
  const { Fonts, Gutters, Layout, Images } = useTheme();
  const { addNextScreen } = useContext(ScrollNavigatorContext);

  useEffect(() => {
    addNextScreen();
  }, []);

  return (
    <>
      <Text style={[Fonts.titleLarge, styles.title]}>{t('intro:title')}</Text>
      <Text
        style={[Fonts.titleRegular, Gutters.regularBMargin, Layout.halfWidth]}
      >
        {t('intro:helpYouUnderstand')}
      </Text>
      <View style={[Layout.alignItemsCenter]}>
        <Text style={[Fonts.textSmall, Fonts.textLight]}>
          {t('intro:scrollDown')}
        </Text>
        <View style={Gutters.regularTMargin}>
          <Image style={styles.arrowIcon} source={Images.icons.arrowDown} />
        </View>
      </View>
    </>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    paddingTop: scale(20),
  },
  title: {
    lineHeight: scale(65),
  },
  arrowIcon: {
    width: scale(35),
    height: scale(35),
    objectFit: 'contain',
  },
});
