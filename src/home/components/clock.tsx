import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppIcon from '../../shared/ui/icons';
import { darkenColor, theme } from '../../shared/theme';

const Clock = ({ title, time }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 70 }}>
            <AppIcon type={'ant'} name={'clockcircleo'} color={'#B5B5B5'} size={25} style={{ marginBottom: 5 }} />
            <Text>{time || '--:--'}</Text>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default Clock

const styles = StyleSheet.create({
    title: {
        fontFamily: theme.fontFamily,
        textTransform: 'capitalize',
        color: '#98A8B9',
    }
})
