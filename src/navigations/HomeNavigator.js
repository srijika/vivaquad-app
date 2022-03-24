

import * as React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreens/index';

const HomeStack = createStackNavigator();

export default function App() {
  return (
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen name="Home" component={HomeScreen} />
      </HomeStack.Navigator>
  );
}