import React , {useEffect} from 'react';
import Log from './src/screens/AuthScreens/Login/LoginScreen'
import { NavigationContainer } from '@react-navigation/native';
import AppNavContainer from './src/navigations/index';
import { LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';





const App = () => {

  useEffect(() => {
    SplashScreen.hide();

    LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'componentWillReceiveProps', "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!", 'Require cycle:']);
    LogBox.ignoreLogs(['Animated: `useNativeDriver`', "VirtualizedLists should never be nested"]);
  }, []);


  return (
        <AppNavContainer />
        
  );
};



export default App;
