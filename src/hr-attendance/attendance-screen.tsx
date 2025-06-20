import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import DatepickerControl from '../shared/ui/datepicker.control'
import SelectControl from '../shared/ui/select.control'
import Textbox from '../shared/ui/textboxes.control'
import { ButtonBlock } from '../shared/components/buttons'
import * as yup from 'yup';
import AttendanceContextProvider, { AttendanceContext } from './redux/attendance.context'
import ErrorMessages from '../shared/components/error-messages'
import { FormValidation } from '../shared/utils/form.validation'
import { useFocusEffect } from '@react-navigation/native'
import Attachment from '../shared/components/attachment/attachments'
import ScreenWrapper from '../shared/components/screen-wrapper'
import SuccessMessage from '../shared/components/messages/success-message'
import ErrorMessage from '../shared/components/messages/error-message'

const AttendanceScreenNav = ({ navigation }) => {
    return (
        <AttendanceContextProvider>
            <AttendanceScreen navigation={navigation} />
        </AttendanceContextProvider>
    )
}

const AttendanceScreen = ({ navigation }) => {
    const [form, setForm] = useState(null);
    const [attachments, setAttachments] = useState([]); // [file1, file2, file3, ...

    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const attendanceCTX = useContext(AttendanceContext);
    const [reasons, setReasons] = useState([]);

    const formSchema = yup.object().shape({
        fromDate: yup.date().required('From Date is required').max(yup.ref('toDate'), 'From Date must be less than To Date'),
        toDate: yup.date().required('To Date is required').min(yup.ref('fromDate'), 'To Date must be greater than From Date'),
        absenceReason: yup.object().required('Reason is required'),
        attachments: yup.array().nullable()
    });

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            return () => {
                setForm(null);
                attendanceCTX.setErrors({});
                setShowErrors(false);

            };
        }, [])
    );

    const save = async () => {
        try {
            await formSchema.validate(form, { abortEarly: false });
            const response = await attendanceCTX.saveAttendance(form, attachments);
            if (response['status'] == 201) {
                setSuccess(true);
                setFailure(false);
                setForm(null);
            }
            else {
                setSuccess(false);
                setFailure(true);
            }
        } catch (err) {
            const errors = FormValidation(err);
            if (errors) {
                setShowErrors(true);
                attendanceCTX.setErrors(errors);
                console.log(errors);

            }
        }
    };


    useEffect(() => {
        setReasons(attendanceCTX.reasons);
    }, [attendanceCTX.reasons]);


    return (
        <ScreenWrapper refreshing={undefined} onRefresh={undefined}>
            <View style={styles.container}>
                <DatepickerControl hasError={(attendanceCTX.errors['fromDate'])} title={'Start Date'} placeholder={'Enter Start Date'} field='fromDate' dtype='1' form={form} updateForm={setForm} />
                <DatepickerControl title={'End Date'} placeholder={'Enter End Date'} field='toDate' hasError={(attendanceCTX.errors['toDate'])} dtype='1' form={form} updateForm={setForm} />
                {reasons && reasons.length > 0 && <SelectControl returnFullObject={true} hasError={(attendanceCTX.errors['absenceReason'])} data={reasons} title='Reason' form={form} updateForm={setForm} label='description' value="name" field='absenceReason' />}
                {/* {reasons && reasons.length > 0 && <SelectControl hasError={(attendanceCTX.errors['reason'])} form={form} field='reason' updateForm={setForm} title={'Reason'} data={reasons} />} */}
                <Textbox inputOptions={{ style: { height: 100 } }} title='Comments' multiline={true} field='comments' placeholder='Enter Comments' onchange={undefined} labelOptions={undefined} form={form} updateForm={setForm} placeholderOptions={undefined} />
                <Attachment attachments={attachments} setAttachments={setAttachments} />
                <View style={{ marginTop: 15 }}>
                    <ButtonBlock action={save} text={'Submit'} />
                </View>
                {/* {showErrors && <ErrorMessages children={undefined} errors={attendanceCTX.errors} setShowErrors={setShowErrors} showErrors={showErrors} />} */}
                {success && <SuccessMessage message={'Request submitted successfully!'} isVisible={success} navigation={navigation} />}
                {failure && <ErrorMessage message={attendanceCTX.response["error"]} title={'Error in Submission'} />}
            </View>
        </ScreenWrapper>
    )
}

export default AttendanceScreenNav

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})