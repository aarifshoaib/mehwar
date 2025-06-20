import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../theme';
import LabelControl from './label.control';
import { mainStyle } from '../main-style';
import ControlError from './control-error';

const FakeTextbox = (
  {
    title,
    errors = {},
    updateErrors = null,
    isRequired = false,
    form = {},
    field = '',
    style = {},
    placeholder = '',
    placeholderColor = mainStyle.controlPlaceholder.color,
    updateForm = null,
    isPassword = false,
    multiline = false,
    hasError = false,
    iconOptions = { icon: null, size: 20, color: theme.primary },
    inputOptions = { style: { height: null } }
  }) => {
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    if (updateForm) {
      updateForm({ ...form, [field]: text })
    }
  }, [text]);


  return (
    <View style={{ ...styles.mainWrapper, ...style }}>
      {iconOptions.icon && <View style={styles.iconWrapper}>
        <Icon name={iconOptions.icon} size={iconOptions.size} color={iconOptions.color} />
      </View>}
      <View style={styles.inputWrapper}>
        <LabelControl isRequired={isRequired} title={title} />
        <Text style={styles.input}>{placeholder}</Text>
      </View>
      <ControlError error={hasError[0]} showError={undefined} />
    </View>
  )
}

export default FakeTextbox

const styles = StyleSheet.create({
  mainWrapper: {
    // flex: 1,
    marginBottom: theme.controlSpacing,
  },
  inputWrapper: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  iconWrapper: {
    position: 'absolute',
    zIndex: 1000,
    marginTop: 10,
    left: 10,
    top: 18
  },
  label: {
    flex: 1
  },
  input: {
    width: '100%',
    borderColor: theme.controlBorderColor,
    backgroundColor: theme.controlBackgroundColor,
    borderWidth: 1,
    borderRadius: theme.controlBorderRadius,
    fontSize: 18,height: 40,
    paddingHorizontal: 10,
    marginTop: 5,
    color:theme.controlBorderColor
  },
  textboxError: {
    width: '100%',
    borderColor: theme.danger,
    borderWidth: 1,
    borderRadius: theme.controlBorderRadius,
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 5,
  }
})