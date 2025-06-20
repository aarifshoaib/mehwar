import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../../shared/theme'
import AppIcon from '../../../shared/ui/icons'

/**
 * 
 * @param item the object item contain the title, url, icon and type of the icon 
 * @returns return the container View with the TouchableOpacity to navigate to the url
 * @description this component for rendering the items in the profile screen
 */
const ProfileItem = ({ item, navigation }) => {

    const routeHandler = () => {
        console.log(item.url);
        
        navigation.navigate(item.url)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.linkWrapper} onPress={routeHandler}>
                <AppIcon type={item.type || 'ant'} name={item.icon} color={theme.primary} size={20} />
                <Text style={styles.text}>{item?.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    linkWrapper: {
        flexDirection: 'row'
    },
    text: {
        fontFamily: theme.fontFamily,
        fontSize: 16,
        color: theme.primary,
        marginStart: 15
    }
})