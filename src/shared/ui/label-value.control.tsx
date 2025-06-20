import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LabelControl from './label.control'
import { mainStyle } from '../main-style';
import { theme } from '../theme';

const LabelValueControl = ({ title, value, style = {}, children = <></> }) => {
    return (
        <View style={{ ...style }}>
            <Text style={styles.label}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>{value}</Text>
                {children}
            </View>
        </View>
    )
}

export default LabelValueControl

const styles = StyleSheet.create({
    text: {
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
    },
    label: {
        fontWeight: 'bold',
        color: theme.primary,
        fontSize: 15,
        width: '100%'
    }
})