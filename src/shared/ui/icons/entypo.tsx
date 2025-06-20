import Icon from 'react-native-vector-icons/Entypo';
import { IIcon } from '../../models/icon.interface';
import React from 'react';

export const EntypoIcon = (props: IIcon) => {
    return (
        <Icon name={props?.name} color={props?.color} size={props?.size}></Icon>
    )
}
