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
 import {FORGOT_PASSWORD } from '../../../constants/navgiationStrings';

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
import {OTP_SCREEN } from '../../../constants/navgiationStrings';
//import colors from '../../../assets/theme/colors';
const schema = yup.object({
  email: yup.string().matches(/^\S*$/, 'Whitespace is not allowed').email().required(),
 
}).required();


import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../../components/Icon/icons';

export default function ForgotPasswordScreen ({navigation}) {
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);
  const [dummyEmail, setDummyemail] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  // useEffect(() => {
  //   clearErrors();
  // }, [isFocused])


  const onSubmit = async (data) => {
    let role = await AsyncStorage.getItem('user_type')
    data.condition = check
    data.roles = role

    
    //console.log(data)
    setIsloading(true);
    setDummyemail(data.email);
    setVisible(true);
    setIsloading(false);
    // try {

    //   await dispatch(authActions.signin(data));

    // } catch (error) {
     
    //   setError(error.message);
    // }

    // setIsloading(false);

  }

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error])

    return (
      <Container isLoading={isLoading}>
      
    <View  style={styles.wrapper}>
        <View >
            <AvatarBox />
          </View>
          
      <View >
      <View style={styles.form_header}>
       <View style={styles.alignText}>
        <Text style={[styles.header_text, ]}>Forgot Password</Text>
        <Text style={[styles.accoutText, ]}>Enter email associated with your account</Text>
        </View>
       </View>
       <Overlay isVisible={visible} >
        <View style={styles.alertModel}>
          <Icon name='check-circle' size={30} color="lime" style={{ textAlign: 'center' }} />
          <Text style={styles.modalAlertText}> A 4-digit verification code was sent to {dummyEmail}. kindly check your email inbox.</Text>
          <Button
            title="Okay"
            onPress={() => navigation.navigate(OTP_SCREEN)}
            type="outline"

            containerStyle={{ 
              marginTop: 20, 
              paddingHorizontal: 40
            }}
           
          />
        </View>
      </Overlay>

        <View style={styles.formView}>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                inputContainerStyle={{borderBottomWidth:0}}
                containerStyle = {styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Email'
                leftIcon={
                  <Icon
                  type='material'
                    name='email'
                    size={24}
                    color='gray'
                  
                  />
                }
                />
                
              )}
              name="email"
            />
            
            <TextErrorMessage error={errors?.email?.message} />
          </View>

  <View >
   <TouchableOpacity onPress={handleSubmit(onSubmit)}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#bddae6', '#abd0e2', '#368dc2','#368dc2']  } style={styles.loginButton}>
  <Text style={[styles.buttonText]}>Send Link</Text>
        </LinearGradient>

              </TouchableOpacity>

            
          </View>






        </View>

      </View>
     
    </View>
    
    </Container>
    );
  };
  