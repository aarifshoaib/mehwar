import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { IIcon } from '../../models/icon.interface';


export const AntIcon = (props: IIcon) => {
    return (
        <Icon name={props?.name} color={props?.color} size={props?.size}></Icon>
    )
}
