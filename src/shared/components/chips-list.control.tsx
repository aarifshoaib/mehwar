import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LabelControl from '../ui/label.control'
import { theme, darkenColor } from '../theme';
import { IconButton } from '../ui/buttons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppIcon from '../ui/icons';
import { Layout } from 'react-native-reanimated';

const ChipsListControl = ({ data, titleField, keyField, trigger, updateData }) => {
    const [width, setWidth] = useState(0);
    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
    };


    // this is to filter the chip from the array ( remote it )
    const removeChip = (item) => {
        console.log('removed item', item);

        // Alert.alert("Removing item at index:", index); // Debug log
        const updatedData = data.filter((x) => x[keyField] !== item[keyField]);
        // const updatedData = [...data.slice(0, index), ...data.slice(index + 1)];
        // Alert.alert("Updated Data:", JSON.stringify(updatedData)); // Debug log
        updateData(updatedData);
    };



    return (
        <View onLayout={onLayout} style={{ ...styles.container, ...{ maxWidth: (!trigger) ? width * .95 : 'auto' } }}>
            {data && data.length > 0 && data.map((item, index) => {
                return (
                    <View style={{ ...styles.chipWrapper, }} key={`chip-wrapper-${item[keyField]}`}>
                        <View key={`chip_${item[keyField]}`} style={{ ...styles.chipWrapper, }}>
                            <Text style={{ ...styles.chipTitle, maxWidth: width * .75 }}>{item[titleField]}</Text>
                            <IconButton name='closecircle' size={20} color={theme.tint} type={'ant'} onclick={() => removeChip(item)} />
                        </View>
                    </View>
                )
            })}
        </View >

    )
}

export default ChipsListControl

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap', // This allows the child elements to wrap to the next line.
        alignItems: 'stretch', // Align items to the start of the container.,
        padding:5
    },
    chipWrapper: {
        backgroundColor: theme.primary,
        paddingLeft: 5,
        paddingRight: 5,
        paddingVertical: 5,
        borderRadius: theme.controlBorderRadius,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipsTrigger: {
        paddingHorizontal: 5,
    },
    chipsWrapper: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap', // This allows the child elements to wrap to the next line.
        alignItems: 'center', // Align items to the start of the container.
    },
    chipTitle: {
        color: theme.tint,
        fontSize: 16,
        marginEnd: 15,
    }
})