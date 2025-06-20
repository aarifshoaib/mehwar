import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LeaveContext } from '../redux/leave.context';
import SelectControl from '../../shared/ui/select.control';
import MutliSelectControl from '../../shared/components/multiselect.control';
import DatepickerControl from '../../shared/ui/datepicker.control';
import SwitchControl from '../../shared/ui/switch.control';

const TrainingLeave = ({ form, updatedForm, validationSchema }) => {
    const [currentSalary, setCurrentSalary] = useState(null); // [
    const leaveContext = useContext(LeaveContext);
    const absenceReason = [
        {
            "value": "Inside UAE",
            "label": "Inside UAE"
        }, {
            "value": "Outside UAE",
            "label": "Outside UAE"
        }]

    useEffect(() => {

    }, [validationSchema]);
    return (
        <View>
            <SelectControl returnFullObject={true} hasError={leaveContext.errors['absenceReason']} data={absenceReason} label={'label'} value={'value'} title='Absence Reason' form={form} updateForm={updatedForm} field='absenceReason' />
            <MutliSelectControl
                title={'Training Location'}
                keyField={'replacementPersonId'}
                titleField='Training Location'
                field={'trainingLocation'}
                maxLimit={1}
                sheetTitle={'Replacement Selection'}
                emptyMessage='No Locations Found.'
                placeholder={'Select Location...'}
                filterField={'trainingLocation'}
                selectedData={leaveContext.selectedReplacements}
                updateSelectedData={leaveContext.updatedReplacements}
                data={leaveContext.replacements['item']} snap={['90%']} form={form} updateForm={updatedForm}>
                {(item) => (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text>{item.replacementName}</Text>
                    </View>
                )}
            </MutliSelectControl>
            <SwitchControl  text='Is Accomodation Provided by Company' field='accomodationProvided' form={form} updateForm={updatedForm} /> 
        </View>
    )

}

export default TrainingLeave

const styles = StyleSheet.create({})