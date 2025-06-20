import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const HomeLoader = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} direction='right' speed={800}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ borderRadius: 10, flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: 112, height: 112, margin: 7, }} />
          <View style={{ width: 112, height: 112, margin: 7, }} />
          <View style={{ width: 112, height: 112, margin: 7, }} />
        </View>
        <View style={{ borderRadius: 10, flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: 112, height: 112, margin: 7, }} />
          <View style={{ width: 112, height: 112, margin: 7, }} />
          <View style={{ width: 112, height: 112, margin: 7, }} />
        </View>
        <View style={{ borderRadius: 10, flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: 112, height: 112, margin: 7, }} />
          <View style={{ width: 112, height: 112, margin: 7, }} />
          <View style={{ width: 112, height: 112, margin: 7, }} />
        </View>
      </View>
    </SkeletonPlaceholder>

  )
}

export default HomeLoader

const styles = StyleSheet.create({

})