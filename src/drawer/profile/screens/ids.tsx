import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../shared/components/screen-wrapper'
import { theme, lightenColor } from '../../../shared/theme';
import { lightColors } from '@rneui/base';

const EmployeeIDs = () => {
  return (
    <ScreenWrapper>
      <IDFolder title="Personal ID's" />
      <IDFolder title="Company ID's" />
    </ScreenWrapper>
  )
}


const IDFolder = ({ title, documents = [] }) => {
  return (
    <View style={styles.container}>
      <View style={styles.folderContainer}>
        <View style={styles.folderHeader}><Text style={styles.folderHeaderText}>{title}</Text></View>
        <View style={styles.folderBody}>
          {documents.map((document, index) => (
            <Text key={index}>{document}</Text>
          ))}
        </View>
        <View style={styles.folderPattern}></View>
      </View>
    </View>
  )
}
export default EmployeeIDs

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  folderContainer: {
    position: 'relative',
    width: '90%',
    height: 150,
    marginBottom: 50,
    maxWidth: 310,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  folderHeader: {
    padding: 10,
    backgroundColor: theme.primary,
    width: '45%',
    alignItems: 'center',
    borderStartEndRadius: 10,
    borderStartStartRadius: 10,
    borderColor: theme.primary,
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderStartWidth: 1,
    position: 'absolute',
    zIndex: 3
  },
  folderHeaderText: {
    color: theme.tint,
    fontFamily: theme.fontFamilyBold,
  },
  folderBody: {
    backgroundColor: theme.primary,
    width: '100%',
    height: '90%',
    top:39,
    borderEndEndRadius: 10,
    borderEndStartRadius: 10,
    borderStartEndRadius: 10,
    borderColor: theme.primary,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
  },
  folderPattern: {
    position: 'absolute',
    bottom: -50,
    width: '100%',
    height: 110,
    backgroundColor: theme.tint,
    borderEndStartRadius: 10,
    borderEndEndRadius: 10,
    borderStartEndRadius: 20,
    borderStartStartRadius: 2,
    shadowOffset: {
      width: 0,
      height: -7,
    },
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    zIndex: 5,
    borderColor:theme.primaryLight,
    borderStartWidth:1,
    borderEndWidth:1,
    borderBottomWidth:1
  }

})