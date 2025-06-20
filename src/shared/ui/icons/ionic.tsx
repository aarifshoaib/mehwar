import Icon from 'react-native-vector-icons/Ionicons';
import { IIcon } from '../../models/icon.interface';
import React from 'react';

export const IonicIcon = (props: IIcon) => {
    return (
        <Icon name={props?.name} color={props?.color} size={props?.size}></Icon>
    )
}
