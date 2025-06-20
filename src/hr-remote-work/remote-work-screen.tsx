import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Textbox from '../shared/ui/textboxes.control'
import * as yup from 'yup';
import SelectControl from '../shared/ui/select.control';
import DatepickerControl from '../shared/ui/datepicker.control';
import RemoteWorkContextProvider, { RemoteWorkContext } from './redux/remote-work.context';
import ErrorMessages from '../shared/components/error-messages';
import Attachment from '../shared/components/attachment/attachments';
import { ButtonBlock } from '../shared/components/buttons';
import { FormValidation } from '../shared/utils/form.validation';
import ScreenWrapper from '../shared/components/screen-wrapper';
import SuccessMessage from '../shared/components/messages/success-message';
import ErrorMessage from '../shared/components/messages/error-message';
import { LeaveType } from '../hr/constants/leave-types.constants';


const RemoteWorkScreenWrapper = ({ navigation }) => {
  return (
    <RemoteWorkContextProvider>
      <RemoteWorkScreen navigation={navigation} />
    </RemoteWorkContextProvider>
  )
}

const RemoteWorkScreen = ({ navigation }) => {
  const [form, setForm] = useState(null);
  const [data, SetData] = useState([]);
  const [attachments, setAttachments] = useState([]); // [file1, file2, file3, ...
  const [showErrors, setShowErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const remoteWorkCTX = useContext(RemoteWorkContext);
  const formSchema = yup.object().shape({
    leaveType: yup.object().required('Remote Work Type is required'),
    fromDate: yup.date().required('From Date is required'),
    toDate: yup.date().required('To Date is required').min(yup.ref('fromDate'), 'To Date must be greater than From Date'),
    comments: yup.string().nullable(),
    attachments: yup.array().nullable(),
  });


  useEffect(() => {
    SetData(remoteWorkCTX.remoteWorkTypes);
  }, [remoteWorkCTX.remoteWorkTypes]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const save = async () => {
    try {
      await formSchema.validate(form, { abortEarly: false })
      const response = await remoteWorkCTX.saveRemoteWork(form, attachments);
      console.log('response', response['status']);
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
      if (err) {
        const errors = FormValidation(err);
        console.log('errors', errors);
        remoteWorkCTX.setErrors(errors);
        setShowErrors(true);
      }
    }
  }

  const navigateBack = () => {
    remoteWorkCTX.clearState();
    navigation.goBack();
  }
  return (
    <ScreenWrapper refreshing={undefined} onRefresh={undefined}>
      <View style={{ padding: 20 }}>
        <SelectControl returnFullObject={true} hasError={(remoteWorkCTX.errors['leaveType'])} title={'Remote Work Type'} data={data} label={'description'} value={'name'} field='leaveType' form={form} updateForm={setForm} />
        <DatepickerControl hasError={(remoteWorkCTX.errors['fromDate'])} title='From Date' field='fromDate' placeholder='Select From Date' form={form} updateForm={setForm} />
        <DatepickerControl hasError={(remoteWorkCTX.errors['toDate'])} title='To Date' field='toDate' placeholder='Select To Date' form={form} updateForm={setForm} />
        <Textbox form={form} inputOptions={{ style: { height: 100 } }} title='Comments' multiline={true} field='comments' placeholder='Enter Comments' updateForm={setForm} />

        {/* {(form && (form['leaveType'].value !== LeaveType.REMOTE_WORK &&
          <Attachment attachments={attachments} setAttachments={setAttachments} />
        ))} */}
        {/* <Attachment attachments={attachments} setAttachments={setAttachments} /> */}
        <View style={{ paddingTop: 20 }}>
          <ButtonBlock action={save} text={'Submit'} />
          <ButtonBlock borderColor={'#eee'} textColor={'#666'} color={'#cdcdcd'} text='Cancel' action={navigateBack} />
        </View>
        {success && <SuccessMessage navigation={navigation} message={'Request submitted successfully!'} isVisible={success} />}
        {failure && <ErrorMessage message={remoteWorkCTX.response["error"]} title={'Error in Submission'} />}

      </View>
    </ScreenWrapper>
  )
}

export default RemoteWorkScreenWrapper

const styles = StyleSheet.create({})