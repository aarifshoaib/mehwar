import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../theme';
import LabelControl from './label.control';
import { mainStyle } from '../main-style';
import ControlError from './control-error';
export class TextboxProps {
  title?: string;
  subtext?: string;
  errors?: any;
  updateErrors?: any;
  isRequired?: boolean;
  form?: any;
  field?: string;
  children?: any;
  style?: any;
  placeholder?: string;
  placeholderColor?: string;
  updateForm?: any;
  showError?: boolean;
  isPassword?: boolean;
  multiline?: boolean;
  hasError?: any;
  iconOptions?: { icon: string, size: number, color: string };
  iconClearOptions?: { icon: string, size: number, color: string };
  inputOptions?: { style: any };
  clear: boolean;
  
  constructor(props: TextboxProps) {
    this.title = props.title;
    this.errors = props.errors;
    this.updateErrors = props.updateErrors;
    this.isRequired = props.isRequired;
    this.form = props.form;
    this.field = props.field;
    this.children = props.children;
    this.showError = props.showError;
    this.style = props.style;
    this.placeholder = props.placeholder;
    this.placeholderColor = props.placeholderColor;
    this.updateForm = props.updateForm;
    this.isPassword = props.isPassword;
    this.multiline = props.multiline;
    this.hasError = props.hasError;
    this.iconOptions = props.iconOptions;
    this.iconClearOptions = props.iconClearOptions;
    this.inputOptions = props.inputOptions;
    this.clear = props.clear;
    this.subtext = props.subtext;
  }
}

const Textbox = (
  {
    title,
    errors = {},
    updateErrors = null,
    isRequired = false,
    form = {},
    field = '',
    onBlur = null,
    onChange = null,
    children = null,
    style = {},
    submitEditing = null,
    placeholder = '',
    placeholderColor = mainStyle.controlPlaceholder.color,
    updateForm = null,
    isPassword = false,
    multiline = false,
    onclear  = null,
    hasError = false,
    clear = false,
    subtext = null,
    iconOptions = { icon: null, size: 20, color: theme.primary },
    iconClearOptions = { icon: null, size: 20, color: theme.primary },
    inputOptions = { style: null }, ...props
  }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (updateForm ) {
      updateForm({ ...form, [field]: text })
    }
    return () => {
      ignore: false
    }
  }, [text]);

  useEffect(() => {
    hasError[0] ? setShowError(true) : setShowError(false)
  }, [hasError[0]])

  useEffect(() => {
    if (clear) {
      updateForm({ ...form, [field]: '' })
      setText('');
    }
  },[clear])

  return (
    <View style={{ ...styles.mainWrapper, ...style }}>
      {iconOptions.icon && <View style={{ ...styles.iconWrapper, ...{ top: (title) ? 18 : 10 } }}>
        <Icon name={iconOptions.icon} size={iconOptions.size} color={iconOptions.color} />
      </View>}
      {iconClearOptions.icon && text.length > 0 && <View style={{ ...styles.iconWrapperClear, ...{ top: (title) ? 18 : 10 } }}>
        <Icon name={iconClearOptions.icon} size={iconClearOptions.size} color={iconClearOptions.color} onPress={onclear} />
      </View>}
      <View style={styles.inputWrapper}>
        {title && <LabelControl isRequired={isRequired} title={title} subtitle={subtext} />}
        <TextInput onChange={onChange} value={text} onSubmitEditing={submitEditing} onBlur={onBlur} placeholder={placeholder} placeholderTextColor={placeholderColor} multiline={multiline} style={{ ...(hasError ? styles.textboxError : styles.input), ...inputOptions?.style, height: (!inputOptions.style?.height) ? theme.controlHeight : inputOptions.style?.height, paddingLeft: (iconOptions.icon ? 35 : 10) }} onChangeText={newText => setText(newText)} secureTextEntry={isPassword} {...props} />
        {children}
      </View>

      <ControlError showError={showError} error={hasError[0]} />
    </View>
  )
}

export default Textbox

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
  },
  iconWrapperClear: {
    position: 'absolute',
    zIndex: 1000,
    marginTop: 10,
    right: 10,
  },
  label: {
    flex: 1
  },
  input: {
    width: '100%',
    height: theme.controlHeight,
    borderColor: theme.controlBorderColor,
    backgroundColor: theme.controlBackgroundColor,
    borderWidth: 1,
    borderRadius: theme.controlBorderRadius,
    fontSize: theme.controlFontSize,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  textboxError: {
    width: '100%',
    borderColor: theme.danger,
    borderWidth: 1,
    borderRadius: theme.controlBorderRadius,
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  placeholder: {
    // This is where you define the custom placeholder styles
    position: 'absolute', // Position absolutely if needed based on your layout
    left: 25,
    bottom: 8,
    zIndex: 1
  },
})