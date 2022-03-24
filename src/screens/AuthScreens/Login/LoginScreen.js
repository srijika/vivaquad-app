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
  Dimensions
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
import {REGISTER_SCREEN } from '../../../constants/navgiationStrings';
import {FORGOT_PASSWORD } from '../../../constants/navgiationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../../components/Icon/icons';


const schema = yup.object({
  email: yup.string().matches(/^\S*$/, 'Whitespace is not allowed').email().required(),
  password: yup.string()
  .matches(/^\S*$/, 'Whitespace is not allowed')
   .required('password is required').min(8),
 confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
}).required();




export default function LoginScreen ({navigation}) {
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState();
  const [under,setUnder]=useState(true)
  const [selected,setSelected] = useState(false);
  const [selected2,setSelected2] = useState(false);
  const [selectedError,setSelectedError] = useState(false);
  const [selectedError2,setSelectedError2] = useState(false);
  const [hidePass, setHidePass] = useState(true);


  const { control, handleSubmit, formState: { errors }, clearErrors } = useForm({
    resolver: yupResolver(schema)
  });
  
const errorHandle=()=>{
  setSelectedError(true)
}
const errorHandle2=()=>{
  setSelectedError2(true)
}

  useEffect(() => {
    clearErrors();
  }, [isFocused])


  const onSubmit = async (data) => {
    let role = await AsyncStorage.getItem('user_type')
    data.condition = check
    data.roles = role
if(!selected){
  errorHandle()
}
if(!selected2){
  errorHandle2()
}


   
    console.log('data',data)
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
        <View>
            <AvatarBox />
          </View>
          
      <View >
      <View style={styles.form_header}>
        
        <Text style={[styles.header_text,styles.underline ]}>LOGIN</Text>
       
        <TouchableOpacity onPress={()=>{
          setUnder(false)
          navigation.navigate(REGISTER_SCREEN)}}>
        <Text style={[styles.header_text]}>SIGN UP</Text>
        </TouchableOpacity>
        </View>
        <View style={[styles.roleAlign,]}>
          <Text style={[styles.selectRole]}>Select Role</Text>
 <View style={[styles.align,]}>
   <View style={styles.checkBoxAlign}>
   <View style={[styles.align,styles.checkBoxAlign,]}>
   
     <TouchableOpacity onPress={()=>{
       setSelectedError(false)
      
       setSelected(!selected)
       if(selected){
         setSelected2(false)
       }else{
         setSelected2(false)
       }
     
       }}>
         
     <Icon type="material"  name={selected ? "check-box" : "check-box-outline-blank"} size={18} color="#1182BC"/>
    
      </TouchableOpacity>
     
      <Text style={styles.commanText }>Student</Text>
      
   </View>
   <Text style={{ color:'red',}}>{selectedError?"please select checkBox":null}</Text>
   </View>
   <View style={styles.checkBoxAlign}>
   <View style={[styles.align,styles.checkBoxAlign]}>
     <TouchableOpacity onPress={()=>{
       setSelectedError2(false)
      
       setSelected2(!selected2)
       if(selected2){
        setSelected(false)
      }else{
        setSelected(false)
      }
       }}>
     <Icon type="material"  name={selected2 ? "check-box" : "check-box-outline-blank"} size={18} color="#1182BC"/>
    
      </TouchableOpacity>
      <Text style={styles.commanText }>Employee</Text>
      </View>
      <Text style={{ color:'red',}}>{selectedError2?"please select checkBox":null}</Text>
   </View>
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
              name="password"
            />
            
            <TextErrorMessage error={errors?.password?.message} />
          </View>
          </View>

          <View>
            <TouchableOpacity onPress={()=>navigation.navigate(FORGOT_PASSWORD)}>
            <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

  <View >
   <TouchableOpacity onPress={
   
     handleSubmit(onSubmit)}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#bddae6', '#abd0e2', '#368dc2','#368dc2']  } style={styles.loginButton}>
  <Text style={[styles.buttonText]}>Login</Text>
        </LinearGradient>

              </TouchableOpacity>

            
          </View>






        </View>

      </View>
     
    </View>
    
    </Container>
    );
  };
  