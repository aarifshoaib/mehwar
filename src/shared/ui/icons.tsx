import { StyleSheet, Text, View } from 'react-native'
import { AntIcon } from './icons/ant-design'
import { AwesomeIcon } from './icons/awesome-font'
import { FeatherIcon } from './icons/feather'
import { MaterialIcon } from './icons/material'
import { IonicIcon } from './icons/ionic'
import { OctIcon } from './icons/oct-icon'
import { SimpleLineIcon } from './simple-line'
import React from 'react'
import { EntypoIcon } from './icons/entypo'

const AppIcon = ({ type, name, color, size, style= {} }) => {
    return (
        <View style={style}>
            {(type == 'ant') && <AntIcon name={name} color={color} size={size} />}
            {(type == 'awesome') && <AwesomeIcon name={name} color={color} size={size} />}
            {(type == 'feather') && <FeatherIcon name={name} color={color} size={size} />}
            {(type == 'material') && <MaterialIcon name={name} color={color} size={size} />}
            {(type == 'ionic') && <IonicIcon name={name} color={color} size={size} />}
            {(type == 'octIcon') && <OctIcon name={name} color={color} size={size} />}
            {(type == 'simple') && <SimpleLineIcon name={name} color={color} size={size} />}
            {(type == 'entypo') && <EntypoIcon name={name} color={color} size={size} />}
        </View>
    )
}

export default AppIcon
