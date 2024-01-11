/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as AuthProvider} from './src/context/AuthContext.js';
const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
AppRegistry.registerComponent(appName, () => AppWrapper);
