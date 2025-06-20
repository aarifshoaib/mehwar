import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IIcon } from '../../models/icon.interface';

export const MaterialIcon = (props: IIcon) => {
    return (
        <Icon name={props?.name} color={props?.color} size={props?.size}></Icon>
    )
}
