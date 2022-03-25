import React from 'react';
import {View, Text, ScrollView,Platform,KeyboardAvoidingView} from 'react-native';
import styles from './styles';
import ScreenLoader from '../Loader/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Container = ({style, children , isLoading}) => {
  return (
<>
{
    isLoading ?
        <ScreenLoader />
        : null
}

<ScrollView KeyboardAwareScrollView style={{ backgroundColor : "#ffffff" }}>

      <View style={[styles.wrapper, style ]}>{children}</View>

    </ScrollView>
    </>
  );
};

export default Container;
