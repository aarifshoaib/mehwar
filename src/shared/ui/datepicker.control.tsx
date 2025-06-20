import { Pressable, StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import LabelControl from './label.control'
import { IconButton } from './buttons'
import { theme } from '../theme'
import { mainStyle } from '../main-style'
import ControlError from './control-error'
import moment from 'moment'


const DatepickerControl = ({ title = '', form = {}, updateForm = null, placeholder, field, hasError = false, dtype = "0" }) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dateTitle, setDateTitle] = useState(placeholder)
    const [showError, setShowError] = useState(false)

    const onConfirm = (date) => {
       console.log(JSON.stringify(date));
       console.log(date);
        setDateTitle(moment(date).format('DD-MMM-YYYY'));
        setOpen(false);
        setDate(date);
        if (updateForm) {
           updateForm({ ...form, [field]: date })
        }
    }

    useEffect(() => {
        hasError[0] ? setShowError(true) : setShowError(false)
    }, [hasError[0]])

    return (
        <View style={{ marginBottom: theme.controlSpacing }}>
            {typeof(title) != undefined && title != '' && <LabelControl title={title} isRequired={true} />}
            <Pressable onPress={() => setOpen(true)}>
                <View style={(hasError ? styles.inputError : styles.datepickerContainer)}>
                    <Text style={[(dateTitle != placeholder) ? null : mainStyle.controlPlaceholder]}>{dateTitle}</Text>
                    <IconButton name={'calendar'} size={25} color={theme.controlIconColor} type={'feather'} onclick={() => setOpen(true)} />
                </View>

            </Pressable>
            <ControlError error={hasError[0]} showError={showError} />
            <DatePicker
                modal={true}
                mode= {dtype == "0" ? 'date' : 'datetime'}
                open={open}
                date={date}
                onConfirm={(date) => {
                    console.log(date);
                    onConfirm(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    )
}

export default DatepickerControl

const styles = StyleSheet.create({
    datepickerContainer: {
        height: theme.controlHeight,
        borderColor: theme.controlBorderColor,
        backgroundColor: theme.controlBackgroundColor,
        borderWidth: 1,
        borderRadius: theme.controlBorderRadius,
        fontSize: theme.controlFontSize,
        paddingHorizontal: 10,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between'
    },
    inputError: {
        height: 40,
        borderColor: theme.danger,
        borderWidth: 1,
        borderRadius: theme.controlBorderRadius,
        fontSize: 18,
        paddingHorizontal: 10,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between'
    }
})