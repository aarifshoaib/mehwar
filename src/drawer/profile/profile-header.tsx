import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../../shared/theme'
import { appImages } from '../../shared/constants/images'
import { IconButton } from '../../shared/ui/buttons'

const ProfileHeader = ({ navigation }) => {
    const toggleDrawer = () => {
        navigation.toggleDrawer();
    }
    return (
        <View style={styles.header}>
            <IconButton style={styles.drawerTrigger} name={'three-bars'} size={28} color={theme.tint} type={'octIcon'} onclick={toggleDrawer} />
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.primary,
    },
    drawerTrigger: {
        paddingTop: 60,
        paddingLeft: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 70,
        backgroundColor: 'white',
        marginTop: 0
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginTop: 10
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        marginVertical: 10
    }
})