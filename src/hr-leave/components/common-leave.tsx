import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatepickerControl from '../../shared/ui/datepicker.control';
import SelectControl from '../../shared/ui/select.control';
import { LeaveContext } from '../../hr-leave/redux/leave.context';
import Textbox from '../../shared/ui/textboxes.control';

const CommonLeave = ({ children, form, updateForm }) => {
    const leaveContext = useContext(LeaveContext);
    // const [localData, setLocalData] = useState([]);

    // useEffect(() => {
    //     setLocalData(leaveContext.leaveTypes);
    // }, [leaveContext.leaveTypes]);

    return (
        <View style={styles.container}>
            {/* <SelectControl returnFullObject={true} hasError={(leaveContext.errors['leaveType'])} data={localData} label={'label'} value={'value'} title='Leave Type' form={form} updateForm={updateForm} field='leaveType' /> */}
            <DatepickerControl hasError={(leaveContext.errors['fromDate'])} title='From Date' field='fromDate' placeholder='Select From Date' form={form} updateForm={updateForm} />
            <DatepickerControl hasError={(leaveContext.errors['toDate'])} title='To Date' field='toDate' placeholder='Select To Date' form={form} updateForm={updateForm} />
            {children}
            <Textbox form={form} inputOptions={{ style: { height: 100 } }} title='Comments' multiline={true} field='comments' placeholder='Enter Comments' updateForm={updateForm} />
        </View>
    )
}

export default CommonLeave;

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
});