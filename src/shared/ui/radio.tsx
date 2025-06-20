import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../theme';

const RadioButton = ({ onSelect, style = {}, field = '', form = {}, updateForm = null }) => {
    const [selected, setSelected] = useState(false);

    const handleSelection = () => {
        setSelected(!selected);
        onSelect(onSelect);

        if (updateForm) {
            updateForm({ ...form, [field]: !selected })
        }
    }

    useEffect(() => {
        onSelect(onSelect);
    }, [onSelect])

    return (
        <TouchableOpacity style={{ ...styles.container, ...style }} onPress={handleSelection}>
            <View style={styles.emptySelection}>
                {selected && <View style={styles.innerRadio}></View>}
            </View>
        </TouchableOpacity>
    )
}

export default RadioButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
    },
    emptySelection: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.primary,
        marginRight: 10,
    },
    innerRadio: {
        backgroundColor: theme.primary,
        margin: 2,
        flex: 1,
        borderRadius: 50
    }
})