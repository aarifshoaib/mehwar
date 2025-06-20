import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Tile = () => {
    return (
        <View style={styles.tileContainer}>
            <Text>Tile afadf af</Text>
        </View>
    )
}

export default Tile

const styles = StyleSheet.create({
    tileContainer: {
        flex:1,
        width: 30,
        height: 30,
        backgroundColor: 'rgba(66,139,185,.35)',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        margin:10
        }
})