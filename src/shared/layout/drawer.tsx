import { Image, Text, StyleSheet, View } from 'react-native'
import { useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Link } from '@react-navigation/native'
import { AuthContext } from '../../auth/redux/auth.context'
import Icon from 'react-native-vector-icons/Ionicons';
import { LinkButton } from '../ui/buttons'
import React from 'react'
import { appImages } from '../constants/images'
import { theme } from '../theme'

const AppDrawer = (props) => {
    const authContext = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
                <View style={styles.drawerHeader}>
                    <Image style={{ width: 150 }} source={appImages['verticalLogo']} resizeMode='contain' />
                </View>
                <View style={{ flex: 3 }}>
                    <DrawerItemList {...props} />
                </View>
                <View style={styles.drawerFooter}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Icon name="log-out-outline" size={25} color={theme.primary} />
                        <LinkButton text='Logout' action={() => authContext.logout()} style={{ outter: { marginLeft: 5 } }} />
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default AppDrawer

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    drawerContent: {
        flex: 1,
        marginTop: 0, justifyContent: 'flex-start',
    },
    drawerBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 80,
        height: 80,
        marginTop: -40,
    },
    drawerTitleWrapper: {
        justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40
    },
    drawerTitle: {
        fontSize: 30,
        paddingTop: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    drawerFooter: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        justifyContent: 'flex-end',
        paddingBottom: 40,
        paddingHorizontal: 30,
    }
})