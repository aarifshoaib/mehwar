import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../shared/components/screen-wrapper'

const SkillsBank = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>SkillsBank</Text>
      </View>
    </ScreenWrapper>
  )
}

export default SkillsBank

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})