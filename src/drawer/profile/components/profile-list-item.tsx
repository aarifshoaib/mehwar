import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

/**
 * @param 
 * item: this is the object in each row of the list
 * children: will contain the custom component for that partictular list
 * @returns 
 * @description this is for item for all the list under the employee profile and this is generic for all
 * lists in the profile screens
 */
const ProfileListItem = ({ item }) => {
    return (
        <View>
            <Text>ProfileListItem</Text>
        </View>
    )
}

export default ProfileListItem

const styles = StyleSheet.create({})