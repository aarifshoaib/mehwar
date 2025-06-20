import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../shared/components/screen-wrapper'

const Qualifications = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>Qualifications</Text>
      </View>
    </ScreenWrapper>
  )
}

export default Qualifications

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})