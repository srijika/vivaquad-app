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
import Container from '../../../components/Container/index';
import LinearGradient from 'react-native-linear-gradient' // import LinearGradient
import ArrowBack from '../../../components/ArrowBack/ArrowBack';
const UniversityScreen=()=>{
  const [isLoading, setIsloading] = useState(false);
  return (
    <Container isLoading={isLoading}>
      <View>
        <ArrowBack/>
      <View styles={styles.form_header}>
        <Text style={styles.header_text}>Your School </Text>
      </View>
      <View style={styles.resetLock}>
            <Image  style={styles.resetLockImage} source={require('../../../assets/images/universityImage.png')} resizeMode='contain'/>
          </View>
        
      </View>
     
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#bddae6', '#abd0e2', '#368dc2','#368dc2']  } style={styles.loginButton}>
      <TouchableOpacity >
  <Text style={[styles.buttonText]}>Continue</Text>
  </TouchableOpacity>
        </LinearGradient>

             
    </Container>
  )
}
export default UniversityScreen