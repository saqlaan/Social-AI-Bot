import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RoundedButton from 'rnprototype/src/components/RoundedButton/RoundedButton';
import { AuthContext } from 'rnprototype/src/context/AuthContext';
import { useTheme } from '../../hooks';

const Login = () => {
  const { t } = useTranslation(['login', 'intro']);
  const { Fonts, Gutters, Layout, Colors } = useTheme();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    if (username !== '') {
      const data = await login({ email: username });
      if (data?.creatorId) {
        setIsLoading(false);
      }
    } else {
      alert('Please enter a valid instagram handle');
      setIsLoading(false);
    }
  }, [username]);

  return (
    <>
      <View style={Gutters.largeTMargin} />
      <Text style={[Fonts.titleRegular]}>{t('login:emailLabel')}</Text>
      <View style={Gutters.largeTMargin} />
      <View>
        <Text style={[Fonts.textSmall, Gutters.tinyBMargin]}>
          {t('login:loginText')}
        </Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          textContentType="username"
          value={username}
          onChangeText={value => setUsername(value)}
        />
      </View>
      <View style={Gutters.largeTMargin} />
      <View style={[Layout.alignItemsCenter]}>
        <RoundedButton
          color={Colors.buttonOrange}
          disabled={isLoading}
          text={t('login:letMeIn')}
          onPress={onSubmit}
        />
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 15,
    fontFamily: 'Klee One',
  },
});
