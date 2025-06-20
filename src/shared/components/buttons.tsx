import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { lightenColor, theme } from '../theme';
import AppIcon from '../ui/icons';
import React, { useEffect, useState } from 'react';

export const ButtonBlock = ({ action, text, color = theme.primary, textColor = theme.tint, icon = null, iconType = 'ionic', borderColor = lightenColor(color, .7) }) => {

    return (
        <TouchableOpacity onPress={action} style={{ backgroundColor: color, borderColor: borderColor, borderWidth: 0, paddingTop: 15, paddingBottom: 15, ...styles.blockButton, ...{} }} >
            {icon && <AppIcon name={icon} size={20} color={textColor} type={iconType} />}
            <Text style={[{
                color: textColor, textShadowColor: 'rgba(255,255,255,.4)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 0,
                fontSize: theme.controlLabelFontSize,
            },styles.blockButtonText]}>{text}</Text>
        </TouchableOpacity>
    )
}


export const LargButton = ({ text, action, icon }) => {
    return (
        <TouchableOpacity style={styles.largButton} onPress={action}>
            <Icon name={icon} size={40} color="#CED03D" />
            <Text style={styles.buttonLabel}>{text}</Text>
        </TouchableOpacity>
    )
}

export const HeaderButton = ({ onPress, options, icon, type, color = theme.tint, iconColor = theme.primary }) => {
    return (
        <TouchableOpacity
            style={{ ...styles.headerButton, backgroundColor: color }}
            onPress={onPress}
        >
            <AppIcon type={type} name={icon} color={iconColor} size={20} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blockButton: {
        borderRadius: theme.controlBorderRadius,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        borderWidth:3,
    },
    largButton: {
        backgroundColor: theme.primary,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        borderRadius: 5,
        margin: 10,
        paddingTop: 20,
    },
    buttonLabel: {
        color: theme.secondary,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        flex: 1
    },
    headerButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: theme.primary,
        padding: 7,
        borderRadius: 10,

    },
    headerButtonText: {
        fontSize: 20,
    },
    blockButtonText: {
        fontFamily:theme.fontFamily
    }
})