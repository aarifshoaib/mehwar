import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import Profile from './profile';
import { appImages } from '../constants/images';
import React from 'react';
import Textbox from '../ui/textboxes.control';
import { theme } from '../theme';
import { IconButton } from '../ui/buttons';
const AppHeader = ({ navigation }) => {


    return (
        <>
            <View style={styles.mainWrapper}>
                <View style={styles.innerWrapper}>
                    <Profile navigation={navigation} />
                </View>
            </View>
            {/* <View style={{ backgroundColor: theme.primaryColor, height: 30, marginTop: 20 }}>
                <View style={{ flex: 1, borderTopEndRadius: 20, borderTopStartRadius: 20 }}></View>
            </View> */}
        </>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    innerWrapper: {
        backgroundColor: theme.primary,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        flex: 1,
        width: '100%',
    },
    inputWrapper: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 50,
        position: 'relative',
    },
    bgIllustration: {
        justifyContent: 'center',
        flex: 1,
        alignContent: 'stretch',
        alignItems: 'stretch',
        width: '100%',
        alignSelf: 'stretch',
        height: '100%',
        top: 0,
        position: 'absolute',
    },
    mainWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 100,
        borderWidth:0,
        backgroundColor: theme.primary
    },
    title: {
        fontSize: 20,
    }
})