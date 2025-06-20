import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LeaveContext } from '../redux/leave.context';
import SelectControl from '../../shared/ui/select.control';
import MutliSelectControl from '../../shared/components/multiselect.control';
import DatepickerControl from '../../shared/ui/datepicker.control';

const AnnualLeave = ({ form, updatedForm, validationSchema }) => {
    const [currentSalary, setCurrentSalary] = useState(null); // [
    const leaveContext = useContext(LeaveContext);
    const advanceReq = [
        {
            "value": "Yes",
            "label": "Yes"
        }, {
            "value": "No",
            "label": "No"
        }]

    useEffect(() => {

    }, [validationSchema]);


    const onSearchUser = (term, signal) => {
        leaveContext.searchUsers(term, signal);
    };


    return (
        <View>
            <DatepickerControl hasError={(leaveContext.errors['resumptionDate'])} title='Resumption Date' field='resumptionDate' placeholder='Select Resumption Date' form={form} updateForm={updatedForm} />
            <SelectControl returnFullObject={true} hasError={leaveContext.errors['leaveSalaryAdvance']} data={advanceReq} label={'label'} value={'value'} title='Leave Salary Advance' form={form} updateForm={updatedForm} field='leaveSalaryAdvance' />
            <MutliSelectControl
                title={'Leave Replacement'}
                keyField={'replacementPersonId'}
                titleField='replacementName'
                field={'leaveReplacement'}
                maxLimit={1}
                hasError={leaveContext.errors['leaveReplacement'] || false}
                sheetTitle={'Replacement Selection'}
                emptyMessage='No Replacements Found.'
                placeholder={'Search by typing minimum 3 chars...'}
                filterField={'replacementName'}
                filterQuery={onSearchUser}
                selectedData={leaveContext.selectedReplacements}
                updateSelectedData={leaveContext.updatedReplacements}
                data={leaveContext.replacements} snap={['90%']} form={form} updateForm={updatedForm}>
                {(item) => (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text>{item.replacementName}</Text>
                    </View>
                )}
            </MutliSelectControl>
        </View>
    )

}

export default AnnualLeave

const styles = StyleSheet.create({})