import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../shared/components/screen-wrapper'

const HousingProfile = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>HousingProfile</Text>
      </View>
    </ScreenWrapper>
  )
}

export default HousingProfile

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})