import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../shared/components/screen-wrapper'

const EmploymentProfile = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>EmploymentProfile</Text>
      </View>
    </ScreenWrapper>
  )
}

export default EmploymentProfile

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})