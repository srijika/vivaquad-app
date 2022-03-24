import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import ScreenLoader from '../Loader/Loader';


const Container = ({style, children , isLoading}) => {
  return (
<>
{
    isLoading ?
        <ScreenLoader />
        : null
}

<ScrollView>
      <View style={[styles.wrapper, style ]}>{children}</View>
    </ScrollView>
</>
  );
};

export default Container;
