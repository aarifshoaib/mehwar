import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../theme'

const ControlError = ({ error, showError }) => {
    return (
        <>
            {showError && <View style={{ alignSelf: 'flex-end' }}>
                <Text style={{ color: theme.dangerDark, fontSize: 12 }}>{error}</Text>
            </View>}
        </>
    )
}

export default ControlError

const styles = StyleSheet.create({})