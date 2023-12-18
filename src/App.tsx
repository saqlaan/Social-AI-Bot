import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import ApplicationNavigator from './navigators/Application';
import { store } from './store';
import './translations';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ApplicationNavigator />
      </AuthProvider>
    </Provider>
  );
};

export default App;
