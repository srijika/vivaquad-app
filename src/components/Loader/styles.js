import {StyleSheet} from 'react-native';
import {  Platform , } from "react-native";

export default StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
        opacity: 0.3,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
})