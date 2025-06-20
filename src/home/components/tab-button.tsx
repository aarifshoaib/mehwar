import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import AppIcon from '../../shared/ui/icons'
import { theme } from '../../shared/theme'

const TabButton = ({ onPress, icon, style, iconSize = 25, size = 50 }) => {
    return (

        <TouchableOpacity style={{ ...styles.container, ...style, ...{ width: size, height: size } }} onPress={onPress}>
            <AppIcon type={'feather'} name={icon} color={style?.color || theme.primary} size={iconSize} />
        </TouchableOpacity>
    )
}

export default TabButton

const styles = StyleSheet.create({
    container: {
        borderRadius: 1000,
        borderWidth: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})