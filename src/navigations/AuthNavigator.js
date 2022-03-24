import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen , RegisterScreen , ForgotPasswordScreen,OtpScreen} from '../screens/AuthScreens/index';
import {USER_TYPE_SCREEN , LOGIN_SCREEN , REGISTER_SCREEN ,OTP_SCREEN  , FORGOT_PASSWORD} from '../constants/navgiationStrings';



const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <AuthStack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
      <AuthStack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      <AuthStack.Screen name={OTP_SCREEN} component={OtpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
