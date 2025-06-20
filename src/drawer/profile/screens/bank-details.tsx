import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../shared/components/screen-wrapper'

const BankDetails = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>BankDetails</Text>
      </View>
    </ScreenWrapper>
  )
}

export default BankDetails

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})