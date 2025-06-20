import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme } from '../theme'

const AppTitle = ({ title = 'Totle' }) => {
    const [localTitle, setLocalTitle] = useState(title);
    useEffect(() => {
        setLocalTitle(title);
    }, [title]);
    return (
        <View style={{ flex: 1, }}>
            <Text style={styles.textTitle}>{localTitle}</Text>
        </View>
    )
}

export default AppTitle

const styles = StyleSheet.create({
    textTitle: {
        color: theme.tint,
        fontSize: 21,
        fontFamily: 'Poppins',
        marginLeft: 15,
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    }
})