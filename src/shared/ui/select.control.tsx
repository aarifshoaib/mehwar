import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import LabelControl from './label.control';
import { theme } from '../theme';
import { mainStyle } from '../main-style';
import ControlError from './control-error';

const SelectControl = ({ callBackDone = () => { }, returnFullObject = false, title = '', field = '', form = {}, placeholder = 'Select Item', updateForm = null, label = 'label', value = 'value', itmvalue = null, data = [], hasError = false, isRequired = false }) => {

    const [selectedValue, setSelectedValue] = useState(itmvalue ? itmvalue : null);
    const [localData, setLocalData] = useState([]);
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (data && Array.isArray(data)) {
            const _data = data.map((item) => {
                return { label: item[label], value: item[value] }
            });
            setLocalData(_data);
        }
    }, [data]);

    useLayoutEffect(() => {
        if (updateForm) {
            let item = selectedValue;
            if (returnFullObject) {
                item = localData.find((item) => item.value === selectedValue);
            }
            updateForm({ ...form, [field]: item })
        }
    }, [selectedValue])

    useEffect(() => {
        hasError[0] ? setShowError(true) : setShowError(false)
    }, [hasError[0]])

    const Arrow = () => {
        return <Chevron size={1.5} color="gray" />
    }
    return (
        <View style={{ marginBottom: theme.controlSpacing }}>
            {title && <LabelControl title={title} isRequired={isRequired} />}

            <RNPickerSelect
                style={{
                    placeholder: mainStyle.controlPlaceholder,
                    inputIOS: (hasError ? styles.inputError : styles.input),
                    inputAndroid: [(hasError ? styles.inputError : styles.input), styles.androidInput],
                    iconContainer: styles.iconContainer,

                }}

                onValueChange={(value) => setSelectedValue(value)}
                placeholder={{ label: placeholder, value: null }}
                useNativeAndroidPickerStyle={false}
                items={localData}
                Icon={() => <Arrow />}
                value={itmvalue ? itmvalue : selectedValue ? selectedValue : '0'}
                onDonePress={() => callBackDone()}
            />
            <ControlError error={hasError[0]} showError={showError} />

        </View>
    )
}

export default SelectControl

const styles = StyleSheet.create({
    input: {
        //height: theme.controlHeight,
        borderColor: theme.controlBorderColor,
        backgroundColor: theme.controlBackgroundColor,
        borderWidth: 1,
        borderRadius: theme.controlBorderRadius,
        fontSize: 18,
        paddingHorizontal: 10,
        marginTop: 5,
        width: '100%',
        height: 50,
    },
    iconContainer: {
        top: 25,
        right: 20
    },
    inputError: {
        height: 40,
        borderColor: theme.danger,
        borderWidth: 1,
        borderRadius: theme.controlBorderRadius,
        fontSize: theme.controlPlaceholderFontSize,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    androidInput: {
        borderWidth: 1,
        borderColor: theme.controlBorderColor
    }
})