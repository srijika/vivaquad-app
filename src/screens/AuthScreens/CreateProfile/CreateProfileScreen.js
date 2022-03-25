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
import { Input,Text } from 'react-native-elements';
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
import {UNIVERSITY_SCREEN } from '../../../constants/navgiationStrings';
import ArrowBack from '../../../components/ArrowBack/ArrowBack';

import DatePicker1 from '../../../helpers/DatePicker';
//import colors from '../../../assets/theme/colors';
const schema = yup.object({
    user_name: yup.string().required(),
 
  number: yup.string()
  .matches(/^\S*$/, 'Whitespace is not allowed')
   .required('phone number is required').min(10),
   birthday: yup.string().required(),
}).required();


import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../../components/Icon/icons';

export default function RegisterScreen ({navigation}) {
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState();

  const [hidePass, setHidePass] = useState(true);
  const [under,setUnder]=useState(true);
  const [selected2,setSelected2] = useState(false);



  
  const { control, handleSubmit, formState: { errors }, clearErrors } = useForm({
    resolver: yupResolver(schema)
  });


 
  useEffect(() => {
    clearErrors();
  }, [isFocused])


  const onSubmit = async (data) => {
    let role = await AsyncStorage.getItem('user_type')
    data.condition = check
    data.roles = role

    
   // console.warn(data)
   // setIsloading(true);
   navigation.navigate(UNIVERSITY_SCREEN);
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
      <View style={styles.form_header}>
          <Text style={[styles.header_text, ]}>Create Profile</Text>
      </View>
      <View style={[styles.userIcon]}>
      <Icon
                  type='ant'
                    name='user'
                    size={80}
                    color='#919191'
                  
                  />
        <Text>Upload Image+</Text>
      </View>
      <View >

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
                placeholder='Your Name'
               
                />
                
              )}
              name="user_name"
            />
            
            <TextErrorMessage error={errors?.user_name?.message} />
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
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            //    leftIconContainerStyle={{  backgroundColor: '#e5e5e5' , }}
              
                placeholder='Phone Number'
                keyboardType={'numeric'}
                maxLength = {10}
                />
                
              )}
              name="number"
            />
            
            <TextErrorMessage error={errors?.number?.message} />
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
                secureTextEntry={hidePass ? true : false}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            //    leftIconContainerStyle={{  backgroundColor: '#e5e5e5' , }}
              
                placeholder='Birthdate (mm/dd/yyyy)'
             
                />
                
              )}
              name="birthday"
            />
            
            <TextErrorMessage error={errors?.birthday?.message} />
          </View>
          </View>
        
           
  <View >
  
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#bddae6', '#abd0e2', '#368dc2','#368dc2']  } style={styles.loginButton}>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
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
  