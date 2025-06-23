import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/app/RootNavigator';
import { Provider } from 'react-redux';
import store from './src/state/store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};

export default App;
