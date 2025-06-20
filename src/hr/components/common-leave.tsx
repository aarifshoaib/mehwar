import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import DatepickerControl from '../../shared/ui/datepicker.control'
import SelectControl from '../../shared/ui/select.control'
import { LeaveContext } from '../../hr-leave/redux/leave.context'
import Textbox from '../../shared/ui/textboxes.control'
import ErrorMessages from '../../shared/components/error-messages'

const CommonLeave = ({ children, form, updateForm }) => {
    const [leaveTypes, setLeaveTypes] = useState(null); // [
    const leaveContext = useContext(LeaveContext);

    useEffect(() => {
        if (leaveContext.leaveTypes) {
            setLeaveTypes(leaveContext.leaveTypes);
        }
    }, [leaveContext.leaveTypes]);

    return (
        <View>
            <View style={styles.container}>
                <SelectControl data={leaveTypes} title='Leave Type' form={form} updateForm={updateForm} field='leaveType' />
                <DatepickerControl title='From Date' field='fromDate' placeholder='Select From Date' form={form} updateForm={updateForm} />
                <DatepickerControl title='To Date' field='toDate' placeholder='Select To Date' form={form} updateForm={updateForm} />
                {<DatepickerControl title='Resumption Date' field='resumptionDate' placeholder='Select Resumption Date' form={form} updateForm={updateForm} />}
                {children}
                <Textbox inputOptions={{ style: { height: 100 } }} title='Comments' multiline={true} field='comments' placeholder='Enter Comments' updateForm={updateForm} />
            </View>
        </View>
    )
}

export default CommonLeave

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})