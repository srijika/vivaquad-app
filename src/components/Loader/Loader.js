import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import styles from './styles';


export default function ScreenLoader() {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size={"large"} />
        </View>
    )
}