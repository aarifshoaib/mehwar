import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../theme'
import React from 'react'

export const SectionTitle = ({ text, style = {} }) => {
    return (
        <Text style={{ ...style, ...styles.sectionTitle }}>{text}</Text>
    )
}

export const ScreenTitle = ({ title }) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

export const Message = () => {

}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.primaryColor
    }
})