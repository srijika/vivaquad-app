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
import {LOGIN_SCREEN } from '../../../constants/navgiationStrings';
//import colors from '../../../assets/theme/colors';
const schema = yup.object({
  email: yup.string().matches(/^\S*$/, 'Whitespace is not allowed').email().required(),
  password: yup.string()
  .matches(/^\S*$/, 'Whitespace is not allowed')
   .required('password is required').min(8),
 confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
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

  const RadioCheckbox = ({ check, title }) => {
 
    return (
        <CheckBox
            checkedIcon='check-square'
            uncheckedIcon='square'
            size={20}
            textStyle={{ fontSize: 16 }}
            containerStyle={{  backgroundColor: "transparent",marginLeft:-10 }}
            title={title} checked={check}
            onPress={() => setCheck(!check)}
            checkedColor="#1182BC"
           // style={{ marginLeft:20 }}
        />
    )
  }


  
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

    
    console.warn(data)
    setIsloading(true);
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
      
        <View style={styles.avatarView}>
            <AvatarBox />
          </View>
          
      <View >
      <View style={styles.form_header}>
        <TouchableOpacity onPress={()=>{
          setUnder(false);
          navigation.navigate(LOGIN_SCREEN)}}>
        <Text style={[styles.header_text, ]}>LOGIN</Text>
        
        </TouchableOpacity>
       
        <Text style={[styles.header_text,styles.underline ]}>SIGN UP</Text>
        </View>

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
              
                placeholder='password'
                leftIcon={
                  <Icon
                  type='material'
                    name='lock'
                    size={24}
                    color='gray'
                  
                  />
                }
                />
                
              )}
              name="password"
            />
            
            <TextErrorMessage error={errors?.password?.message} />
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
              
                placeholder='Confirm password'
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
              name="confirm_password"
            />
            
            <TextErrorMessage error={errors?.confirm_password?.message} />
          </View>
          </View>
        
              <View > 
              <View style={styles.footerText}>
             <View style={{width:'10%'}}>
              <RadioCheckbox check={check}  />
              {/* <Icon type="material"  name={selected2 ? "check-box" : "check-box-outline-blank"} size={18} color="#1182BC"/> */}
              </View>
              <Text style={styles.agreeText}>I agree with </Text>
              <Text style={styles.privacyText}>Provicy Policy</Text>
              </View>
              </View>

  <View >
   <TouchableOpacity onPress={handleSubmit(onSubmit)}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#bddae6', '#abd0e2', '#368dc2','#368dc2']  } style={styles.loginButton}>
  <Text style={[styles.buttonText]}>SIGN UP</Text>
        </LinearGradient>

              </TouchableOpacity>

            
          </View>






        </View>

      </View>
     
    </View>
   
    </Container>
    );
  };
  