import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator'; 
import DrawerNavigator from './DrawerNavigator'; 



export default function AppNavContainer() {
  return (
    <NavigationContainer>
        <AuthNavigator /> 
    </NavigationContainer>
  );
}