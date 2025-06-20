import Icon from 'react-native-vector-icons/Octicons';
import { IIcon } from '../../models/icon.interface';
import React from 'react';

export const OctIcon = (props: IIcon) => {
    return (
        <Icon name={props?.name} color={props?.color} size={props?.size}></Icon>
    )
}
