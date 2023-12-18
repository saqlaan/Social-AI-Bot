import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  onBoardingScreens,
  screens,
} from '../navigators/data/onboardingScreens';
import { AuthContext } from './AuthContext';

export interface ScrollNavigatorType {
  scrollRef: any;
  visibleScreens: any[];
  addNextScreen: () => void;
  scrollToEnd: () => void;
  screenHeight: number;
  scrollToItem: () => void;
  popAndClearStack: () => void;
}

export const ScrollNavigatorContext = createContext<ScrollNavigatorType>({
  scrollRef: null,
  visibleScreens: [],
  addNextScreen: () => null,
  scrollToEnd: () => null,
  screenHeight: 0,
  scrollToItem: () => null,
  popAndClearStack: () => null,
});

const ScrollNavigatorProvider = ({ children }: { children }) => {
  const scrollRef = useRef<FlatList>(null);
  const { top, bottom } = useSafeAreaInsets();
  const [visibleScreens, setVisibleScreens] = useState([]);
  const [allScreens, setAllScreens] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.creatorId) {
      setAllScreens(onBoardingScreens.splice(1));
      setVisibleScreens([onBoardingScreens[0]]);
    } else {
      setAllScreens(screens.splice(1));
      setVisibleScreens([screens[0]]);
    }
  }, [user]);

  const screenHeight = useMemo(() => {
    return Dimensions.get('window').height - top - bottom;
  }, [top, bottom]);

  const addNextScreen = () => {
    const item = allScreens.shift();
    setVisibleScreens(screens => [...screens, item]);
  };

  const clearStack = () => {
    setVisibleScreens([]);
  };

  const scrollToEnd = useCallback(() => {
    scrollRef.current?.scrollToEnd();
  }, [scrollRef.current]);

  const scrollToItem = useCallback(
    item => {
      scrollRef.current?.scrollToOffset({
        offset: screenHeight * 2,
        animated: true,
      });
    },
    [scrollRef.current],
  );

  const popAndClearStack = useCallback(() => {
    setVisibleScreens(screens => [screens.pop()]);
  }, []);

  return (
    <ScrollNavigatorContext.Provider
      value={{
        scrollRef,
        visibleScreens,
        addNextScreen,
        scrollToEnd,
        screenHeight,
        clearStack,
        scrollToItem,
        popAndClearStack,
      }}
    >
      {children}
    </ScrollNavigatorContext.Provider>
  );
};

export default ScrollNavigatorProvider;
