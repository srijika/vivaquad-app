import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function TextErrorMessage({ error }) {
    const CapitalizeFirstLetter = (str) => {
        return str?.length ? str.charAt(0).toUpperCase() + str.slice(1) : str
    }

    return (
        <Text style={styles.errMsg} > {CapitalizeFirstLetter(error)}  </Text>
    )
}

const styles = StyleSheet.create({
    errMsg: {
        color: 'red', marginLeft: 25, marginTop: 1 , marginBottom: 8  
    }
})