import React, { useState } from 'react';
import {
  Image, View, Text, TouchableOpacity,
  StyleSheet
} from 'react-native';
import { darkenColor, lightenColor, theme } from '../theme';
import AppIcon from './icons';
import { appImages } from '../constants/images';

const CustomRadioButton = ({ label, selected, onSelect, icon = { type: null, name: null }, image = null, imageStyle = {} }) => (

  <TouchableOpacity
    style={[styles.radioButton, selected ? styles.activeButton : null]}
    onPress={onSelect}>
    <View style={{}}>
      {icon.name && icon.type && <AppIcon name={icon.name} size={20} color={selected ? theme.primary : theme.secondary} type={icon.type} />}
      {image && <Image source={appImages[image]} style={[imageStyle, selected ? styles.activeImage : image]} resizeMode='contain' />}
    </View>
    <Text style={[styles.radioButtonText, selected ? styles.activeButtonText : null,]}>
      {label}
    </Text>
  </TouchableOpacity>

);

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
  },
  radioButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.controlBorderColor,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  radioButtonText: {
    fontSize: 14,
    marginStart:5,
    color: darkenColor(theme.primary, 0.4),
  },
  activeButton: {
    backgroundColor: theme.primary,
  },
  activeButtonText: {
    color: theme.tint,
    fontFamily: theme.fontFamily,
  },
  activeImage: {
    tintColor: theme.tint
  },
  image: {
    tintColor: theme.primary
  }
}); 