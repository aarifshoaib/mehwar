import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { lightenColor, theme } from '../theme'
import AppIcon from '../ui/icons'

const NoRecords = ({ title, style = {} }) => {
    return (
        <View style={[styles.noAttachments, style]}>
            <AppIcon name='exclamationcircleo' size={20} color={lightenColor(theme.secondary, .3)} type={'ant'} />
            <Text style={styles.text}>{title}</Text></View>

    )
}

export default NoRecords

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#efefef',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontSize: 14,
        fontFamily: theme.fontFamily,
        color: lightenColor(theme.secondary, .15),
        marginStart: 5
    },
    noAttachments: {
        backgroundColor: lightenColor(theme.primary, .95),
        borderColor: lightenColor(theme.primary, .8),
        padding: 15,
        borderRadius: theme.controlBorderRadius,
        borderWidth: 1,
        marginBottom: 10,
        color: theme.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})