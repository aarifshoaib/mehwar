import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { IIcon } from '../../models/icon.interface';

export const FeatherIcon = (props: IIcon) => {
    return (
        <Icon name={props?.name} color={props?.color} size={props?.size}></Icon>
    )
}
