import React from 'react'
import { View, StyleSheet, Image, Dimensions } from "react-native";
import images from '../../constants/Images';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
export default AvatarBox = () => {

    return (
        <View style={styles.avatarBox} >
            <Image source={images.logo} style={{width:WindowWidth/4, height:WindowHeight/4,}} resizeMode='contain' />
        </View>
    )
}

const styles = StyleSheet.create({
   
    avatarBox: {
     alignItems : 'center'
    }
   
});