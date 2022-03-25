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
import { Input,Text,Overlay,Button } from 'react-native-elements';
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
import {LOGIN_SCREEN } from '../../../constants/navgiationStrings';
import ArrowBack from '../../../components/ArrowBack/ArrowBack';
//import colors from '../../../assets/theme/colors';
const schema = yup.object({
    new_password: yup.string()
  .matches(/^\S*$/, 'Whitespace is not allowed')
   .required('password is required').min(8),
   confirm_new_password: yup.string().matches(/^\S*$/, 'Whitespace is not allowed').required('confirm_password is mendatory').oneOf([yup.ref('new_password'), null], 'Passwords must match')
}).required();


import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../../components/Icon/icons';

export default function ResetPasswordScreen ({navigation}) {
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState();

  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const [under,setUnder]=useState(true);
  const [selected2,setSelected2] = useState(false);
  const [visible, setVisible] = useState(false);

  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  // useEffect(() => {
  //   clearErrors();
  // }, [isFocused])


  const onSubmit = async (data) => {
      console.log('reset data', data);
    let role = await AsyncStorage.getItem('user_type')
    data.condition = check
    data.roles = role

    setVisible(true)
  //  console.warn(data)
   // setIsloading(true);
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
      <ArrowBack/>
    <Overlay isVisible={visible} >
            <View style={styles.alertModel}>
              <Icon name='check-circle' size={30} color="lime" style={{ textAlign: 'center' }} />
              <Text style={styles.modalAlertText}>Your password reset successfully</Text>
              <Button
                title="Okay"
                onPress={() => navigation.navigate(LOGIN_SCREEN)}
                type="outline"

                containerStyle={{
                  marginTop: 20,
                  paddingHorizontal: 40
                }}
              // containerStyle={{
              //   width: 200,
              //   height: 45,
              //   marginHorizontal: 50,
              //   marginVertical: 10,
              //   marginTop:10
              // }}
              />
            </View>
          </Overlay>
        <View style={styles.resetLock}>
            <Image  style={styles.resetLockImage} source={require('../../../assets/images/resetLogo.jpg')} resizeMode='contain'/>
          </View>
          
      <View >
      <View style={styles.form_header}>
        <Text style={[styles.header_text, ]}>Reset Password</Text>
        </View>

        <View style={styles.formView}>
         
          <View >
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
            //    leftIconContainerStyle={{  backgroundColor: '#e5e5e5' , }}
            secureTextEntry={hidePass ? true : false}
                placeholder='New Password'
                placeholderTextColor="#919191"
                leftIcon={
                  <Icon
                  type='material'
                    name='lock'
                    size={24}
                    color='gray'
                  
                  />
                }
                rightIcon={
                    <Icon
                    type='materialCommunity'
                      name={hidePass?'eye-off':'eye'}
                      size={24}
                      color='gray'
                    onPress={()=>setHidePass(!hidePass)}
                    />
                    
                  }
                />
                
              )}
              name="new_password"
            />
            
            <TextErrorMessage error={errors?.new_password?.message} />
          </View>
          </View>

          <View >
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
                secureTextEntry={hidePass2 ? true : false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            //    leftIconContainerStyle={{  backgroundColor: '#e5e5e5' , }}
              
                placeholder='Confirm New Password'
                placeholderTextColor="#919191"
                leftIcon={
                  <Icon
                  type='material'
                    name='lock'
                    size={24}
                    color='gray'
                  
                  />
                  
                }
                
                rightIcon={
                  <Icon
                  type='materialCommunity'
                    name={hidePass2?'eye-off':'eye'}
                    size={24}
                    color='gray'
                  onPress={()=>setHidePass2(!hidePass2)}
                  />
                  
                }
                />
                
              )}
              name="confirm_new_password"
            />
            
            <TextErrorMessage error={errors?.confirm_new_password?.message} />
          </View>
          </View>
  <View >
   
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#bddae6', '#abd0e2', '#368dc2','#368dc2']  } style={styles.loginButton}>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
  <Text style={[styles.buttonText]}>Save Changes</Text>
  </TouchableOpacity>
        </LinearGradient>

             

            
          </View>

        </View>

      </View>
     
    </View>
   
    </Container>
    );
  };
  