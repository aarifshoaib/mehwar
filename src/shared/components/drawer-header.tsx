import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../../shared/theme'
import { appImages } from '../../shared/constants/images'
import { IconButton } from '../../shared/ui/buttons'

const DrawerHeader = ({ navigation, title }) => {
    const toggleDrawer = () => {
        navigation.toggleDrawer();
    }
    return (
        <View style={styles.header}>
            <IconButton style={styles.drawerTrigger} name={'three-bars'} size={28} color={theme.tint} type={'octIcon'} onclick={toggleDrawer} />
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default DrawerHeader

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.primary,
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerTrigger: {
        paddingTop: 60,
        paddingLeft: 20,

    },
    title: {
        color: 'white',
        fontSize: 20,
        marginTop: 0,
        flex: 1,
        paddingTop: 60,
        paddingLeft: 20,
        fontFamily: theme.fontFamily,
    },

})