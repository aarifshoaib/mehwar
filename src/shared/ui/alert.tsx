import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from './buttons'

const AlertBox = ({ type, message }) => {
    return (
        <View style={styles[type + 'Wrapper']}>
            <Text style={styles[type + 'Text']}>{message}</Text>
            {/* <IconButton name={''} size={undefined} color={undefined} type={undefined} onclick={undefined} /> */}
        </View>
    )
}

export default AlertBox

const styles = StyleSheet.create({
    infoWrapper: {},
    infoText: {},
    successWrapper: {},
    successText: {},
    errorWrapper: {},
    errorText: {},
    warningWrapper: {},
    warningText: {},
    defaultWrapper: {},
    defaultText: {},
})