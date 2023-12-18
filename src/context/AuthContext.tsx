import React, { createContext, useCallback, useEffect, useState } from 'react';
import { getCreatorCarousel, getCreatorId } from '../services/modules';
import { getCreatorIntroText } from '../services/modules/onboarding';
import { getLocalData, setLocalData } from '../storage';
import { LocalStorageKeys } from '../storage/keys';

type UserData = {
  creatorId: string;
  onboarded: boolean;
};

type OnBoardingData = {
  gifUrl: string;
  introText: string;
};

type AuthContextType = {
  user: UserData | null;
  login: ({ email }: { email: string }) => void;
  logout: () => void;
  onboardUser: () => void;
  onboardingData: OnBoardingData;
  loadOnboardingData: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => null,
  logout: () => null,
  onboardUser: () => null,
  onboardingData: null,
  loadOnboardingData: () => null,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [onboardingData, setonboardingData] = useState<OnBoardingData | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const data = await getLocalData(LocalStorageKeys.USER);
      setUser(data);
    })();
  }, []);

  const login = async ({ email }: { email: string }): Promise<UserData> => {
    const data = (await getCreatorId(email)) as UserData;
    setLocalData(LocalStorageKeys.USER, data);
    setUser(data);
    loadOnboardingData();
    return data as UserData;
  };

  const onboardUser = useCallback(() => {
    const updatedUser = {
      ...user,
      onboarded: true,
    };
    setUser(updatedUser);
    setLocalData(LocalStorageKeys.USER, updatedUser);
  }, [user]);

  const loadOnboardingData = useCallback(async () => {
    let result = await getCreatorCarousel();
    if (result?.gif_url) {
      setonboardingData({
        gifUrl: result.gif_url,
        introText: '',
      });
    }
    result = await getCreatorIntroText();
    if (result?.text) {
      setonboardingData(data => ({ ...data, introText: result.text }));
    }
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        onboardUser,
        onboardingData,
        loadOnboardingData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
