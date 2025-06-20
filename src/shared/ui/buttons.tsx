import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { darkenColor, theme } from '../theme'
import AppIcon from './icons'
import React from 'react'
import { appImages } from '../constants/images';
import { darkColors } from '@rneui/base';

export const ActionButton = ({ text, onPress, color = theme.primary, style = {} }) => {
    return (
        <TouchableOpacity style={{ backgroundColor: color, ...styles.actionButtonWrapper, ...style }} onPress={onPress}>
            <Text style={styles.primaryButtonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export const IconTextButton = ({ style = {}, text, onPress, color = theme.primary, iconType, iconName, iconColor, iconSize, type = 'solid' }) => {
    return (
        <TouchableOpacity style={{ ...(type === 'outline') ? { ...styles.outline, borderColor: color } : { ...styles.button, backgroundColor: color }, ...style, ...styles.buttonRadius, ...styles.button, flexDirection: 'row' }} onPress={onPress} >
            <AppIcon type={iconType} name={iconName} color={iconColor} size={iconSize} />
            <Text style={{ marginLeft: 10, color: iconColor }} >{text}</Text>
        </TouchableOpacity >
    )
}

export const LinkButton = ({ text, action, style }) => {
    return (
        <TouchableOpacity style={{ ...style?.outter }} onPress={action}>
            <Text style={{ ...style?.inner, fontFamily: theme.fontFamily }}>{text}</Text>
        </TouchableOpacity>
    )
}

export const SquerButton = ({ service }) => {

    return (
        <TouchableOpacity style={styles.squerButtonWrapper}>
            <View style={styles.buttonInner}>
                <Text style={styles.buttonIcon}>{service.icon}</Text>
                <Text style={styles.buttonText}>{service.text}</Text>
            </View>
        </TouchableOpacity>
    )
}
export const TabBtn = ({ name, color, size, title, action, type = '', style }) => {

    return (
        <TouchableOpacity onPress={action} style={style}>
            <AppIcon type={type} name={name} color={color} size={size} />
        </TouchableOpacity>
    )
}

export const IconButton = ({ name, size, color, type, onclick, style = {} }) => {
    return (
        <TouchableOpacity onPress={onclick} style={style}>
            <AppIcon name={name} size={size} color={color} type={type} />
        </TouchableOpacity>
    )
}

export const ImageButton = ({ image, onclick, textStyle = {}, style = {}, title = '' }) => {
    return (
        <TouchableOpacity onPress={onclick} style={[style, { paddingHorizontal: 10, justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'row' }]}>
            <Image style={[styles.imageButton, { flex: 1 }]} source={appImages[image]} resizeMode='contain' />
            {title && <Text style={textStyle}>{title}</Text>}
        </TouchableOpacity>
    )
}

export const BrandButton = ({ image, onclick, style = {} }) => {
    return (
        <TouchableOpacity onPress={onclick} style={[style, { paddingHorizontal: 0 }]}>
            <Image style={styles.brandButton} source={appImages[image]} resizeMode='contain' />
        </TouchableOpacity>
    )
}

// export const OutlineIconButton = ({ text, onPress, iconType, iconSize, style, iconName, color = theme.primary }) => {
//     return (
//         <TouchableOpacity style={{ ...style, borderColor: color, ...styles.buttonOutlineWrapper }} onPress={onPress}>
//             <View style={{}}>
//                 <AppIcon type={iconType} name={iconName} color={color} size={iconSize} />
//             </View>
//             <Text style={{ ...styles.actionButtonText, flex: 1 }} >{text}</Text>
//         </TouchableOpacity>
//     )
// }

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        flexDirection: 'row',
        padding: 10,

    },
    buttonRadius: {
        borderRadius: theme.controlBorderRadius
    },
    actionButtonText: {
        fontSize: 18,
        marginLeft: 5
    },
    actionButtonWrapper: {
        borderRadius: 15,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2
    },
    imageButton: {
        width: '80%',
        height: '80%',
    },
    brandButton: {
        height: 150,
        width: 150,
        marginTop: -30
    },
    primaryButtonText: {
        fontWeight: 'bold',
        color: theme.tint
    },
    squerButtonWrapper: {
        width: 100,
        height: 100,
        margin: 16,
        alignContent: 'center',
        flex: 1,
        borderRadius: theme.controlBorderRadius,

    },
    buttonInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: theme.tint,
        textAlign: 'center',
        marginTop: 8,
    },
    buttonIcon: {
        width: 40,
        height: 40,
    },
    outline: {
        borderWidth: 3,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
    },
    solid: {
        // backgroundColor: theme.primary,
    }
});

