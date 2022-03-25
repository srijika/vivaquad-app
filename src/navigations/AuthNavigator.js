import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen , RegisterScreen , ForgotPasswordScreen,OtpScreen,ResetPasswordScreen,CreateProfileScreen,UniversityScreen} from '../screens/AuthScreens/index';
import {USER_TYPE_SCREEN , LOGIN_SCREEN , REGISTER_SCREEN ,OTP_SCREEN  , FORGOT_PASSWORD,RESET_PASSWORD,CREATE_PROFILE,UNIVERSITY_SCREEN} from '../constants/navgiationStrings';



const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <AuthStack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
      <AuthStack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      <AuthStack.Screen name={OTP_SCREEN} component={OtpScreen} />
      <AuthStack.Screen name={RESET_PASSWORD} component={ResetPasswordScreen} />
      <AuthStack.Screen name={CREATE_PROFILE} component={CreateProfileScreen} />
      <AuthStack.Screen name={UNIVERSITY_SCREEN} component={UniversityScreen} />
      
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
