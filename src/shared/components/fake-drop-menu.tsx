import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppIcon from '../ui/icons'
import { theme } from '../theme'

const FakeDropMenu = ({ trigger, children, hasError }) => {
    // onlayout method calculating the width of the chips container
    // according to the screen
    const [width, setWidth] = useState(0);
    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
    };
    return (
        <View style={[styles.container, styles.fakeTextbox, hasError ? styles.fakeTextboxError : styles.fakeTextBoxBorder]} onLayout={onLayout}>
            <View style={styles.chipsWrapper}>
                <View style={{ flex: 1, justifyContent: 'center', }}>{children}</View>
                {trigger && <TouchableOpacity style={styles.chipsTrigger} onPress={trigger}>
                    <AppIcon name='chevron-down-outline' size={20} color={theme.primary} type={'ionic'} />
                </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default FakeDropMenu

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap', // This allows the child elements to wrap to the next line.
        alignItems: 'stretch', // Align items to the start of the container.

    },
    fakeTextbox: {
        borderWidth: 1,
        borderRadius: theme.controlBorderRadius,
    },
    chipsWrapper: {
        flexDirection: 'row',
        flex: 1,
        // backgroundColor:'pink',
        flexWrap: 'wrap', // This allows the child elements to wrap to the next line.
        alignItems: 'stretch', // Align items to the start of the container.
        justifyContent: 'center',
    },
    chipsTrigger: {
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 9,
        flexDirection: 'column',
    },
    fakeTextboxError: {
        borderColor: theme.danger,
    },
    fakeTextBoxBorder: {
        borderColor: theme.controlBorderColor,
    }
})