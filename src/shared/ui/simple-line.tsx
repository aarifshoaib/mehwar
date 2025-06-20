import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { IIcon } from '../models/icon.interface';
import React from 'react';

export const SimpleLineIcon = (props: IIcon) => {
    return (
        <Icon name={props?.name} color={props?.color} size={props?.size}></Icon>
    )
}
