import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { mainStyle } from '../main-style'
import { darkenColor, theme } from '../theme'

const LabelControl = ({ title, subtitle = '', isRequired = false, style = {} }) => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, ...{ fontWeight: 'bold' } }}>{title}</Text>
      {isRequired && <Text style={mainStyle.dangerColor}>*</Text>}
      {subtitle && <Text style={styles.subtext}>{subtitle}</Text>}
    </View >
  )
}

export default LabelControl

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%',
    marginTop: theme.labelSpacing
  },
  text: {
    color: theme.controlLabelColor,
    fontSize: theme.controlLabelFontSize,
    fontFamily: theme.fontFamily,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
  subtext: {
    color: theme.primary,
    fontSize: 13,
    fontFamily: theme.fontFamily,
    alignSelf: 'center',
    right: 0,
    position: 'absolute',
    textDecorationLine: 'underline',
  }
})