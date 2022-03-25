// import React,{useState,useEffect} from 'react';

// import {View,ScrollView} from 'react-native'
// import {Text,input} from 'react-native-elements'
// import styles from './styles';
// import AvatarBox from '../../../components/AvatarBox/Avatar';
// import { useIsFocused } from '@react-navigation/native';
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import TextErrorMessage from '../../../components/ErrorMessage/Error';
// import LinearGradient from 'react-native-linear-gradient' 
import {RESET_PASSWORD } from '../../../constants/navgiationStrings';

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image
  ,Dimensions,

} from 'react-native';
import { Input,Text,Overlay,Button} from 'react-native-elements';
import styles from './styles';
import AvatarBox from '../../../components/AvatarBox/Avatar';
import { useIsFocused } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TextErrorMessage from '../../../components/ErrorMessage/Error';
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import { CheckBox } from 'react-native-elements';
import Container from '../../../components/Container/index';
//import {OTP_SCREEN } from '../../../constants/navgiationStrings';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
import {normalizeFont} from '../../../helpers/FontSize/';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ArrowBack from '../../../components/ArrowBack/ArrowBack';
//import colors from '../../../assets/theme/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../../components/Icon/icons';

export default function OtpScreen ({navigation}) {
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState();
  const [userOtp, setUserOtp] = useState();
 

  // useEffect(() => {
  //   clearErrors();
  // }, [isFocused])


  const handleCode = async () => {
    let code = userOtp;
   console.log('otpdata is',code)

  };

    


  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error])
  const [seconds, setSeconds] = React.useState(25);
  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  });

  const handleResendOtp = () => {
    setSeconds(25);
  };

    return (
      <Container isLoading={isLoading}>
      
    <View  style={styles.wrapper}>
      <ArrowBack/>
        <View >
            <AvatarBox />
          </View>
          
      <View >
      <View style={styles.form_header}>
       <View style={styles.alignText}>
        <Text style={[styles.header_text, ]}>2 Step Verification</Text>
        <Text style={[styles.accoutText, ]}>A 4-digit verification code was just sent to ●●●●●●@gmail.com</Text>
        </View>
       </View>
        <View style={styles.formView}>
        <View style={{  width:'90%',alignSelf:'center' }}>
            <OTPInputView
              style={[styles.inputView, { color: 'black', fontSize: normalizeFont(30) }]}
              pinCount={4}
              codeInputFieldStyle={styles.textBoxDesign}
              placeholderCharacter='-'
              placeholderTextColor='#919191'
              onCodeFilled={code => {
                setUserOtp(code);
               
              }}
            />
            
            <View style={{ flexDirection:'row',justifyContent:'center',}}>
              <Text style={styles.completeText}>Completed ! </Text>
              <Icon  type='fontisto' name="check" color="#33AC08" size={16}/>
            </View>
           

            <View style={styles.secondsAlign}>
            {seconds > 0 ? (
              <View
                >
            
                <Text style={[styles.instruction]}>Resend OTP : {seconds}</Text>
              </View>
            ) : (

              <TouchableOpacity
                
                onPress={() => {
                  handleResendOtp();

                }}>
                  <View style={{ flexDirection: 'row'}}>
                <Text style={styles.receivedText}> Didn't receive a text? </Text>
               
               
                <Text style={styles.resendCodeText}>

                 Resend Code
                </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          </View>

          
          <View>
  
      
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#bddae6', '#abd0e2', '#368dc2','#368dc2']  } style={styles.loginButton}>
              <TouchableOpacity
             //onPress={() => handleCode()} 
             onPress={() =>navigation.navigate(RESET_PASSWORD)}
           >
  <Text style={[styles.buttonText]}>Continue</Text>
  </TouchableOpacity>
  </LinearGradient>
           
        
        </View>






        </View>

      </View>
     
    </View>
    
    </Container>
    );
  };
  
 