import React, { useContext } from 'react';
import { FlatList } from 'react-native';

import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import { ScrollNavigatorContext } from '../context/ScrollNavigator';

const OnBoardingNavigator = () => {
  const { scrollRef, visibleScreens, screenHeight } = useContext(
    ScrollNavigatorContext,
  );

  const _renderItem = ({ item }) => {
    const { component: Component } = item;
    return (
      <ScreenContainer>
        <Component />
      </ScreenContainer>
    );
  };

  return (
    <FlatList
      ref={scrollRef}
      data={visibleScreens}
      renderItem={_renderItem}
      snapToAlignment="start"
      decelerationRate={'fast'}
      snapToInterval={screenHeight}
      showsVerticalScrollIndicator={false}
      windowSize={4}
      keyExtractor={item => item.key}
      getItemLayout={(data, index) => ({
        length: screenHeight,
        offset: screenHeight * index,
        index,
      })}
      initialNumToRender={1}
    />
  );
};

export default OnBoardingNavigator;
