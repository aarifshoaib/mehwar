import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../shared/components/screen-wrapper'

const EmployeeLanguage = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>EmployeeLanguage</Text>
      </View>
    </ScreenWrapper>
  )
}

export default EmployeeLanguage

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})