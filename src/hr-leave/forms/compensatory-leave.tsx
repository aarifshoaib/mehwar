import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LeaveContext } from '../redux/leave.context';
import SelectControl from '../../shared/ui/select.control';
import MutliSelectControl from '../../shared/components/multiselect.control';
import DatepickerControl from '../../shared/ui/datepicker.control';

const CompensatoryLeave = ({ form, updatedForm, validationSchema }) => {
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
    return (
        <View>
            <DatepickerControl hasError={(leaveContext.errors['resumptionDate'])} title='Resumption Date' field='resumptionDate' placeholder='Select Resumption Date' form={form} updateForm={updatedForm} />
            <DatepickerControl hasError={(leaveContext.errors['workedonDate'])} title='Worked On Date' field='workedonDate' placeholder='Select Worked On Date' form={form} updateForm={updatedForm} />
            <MutliSelectControl
                title={'Leave Replacement'}
                keyField={'replacementPersonId'}
                titleField='replacementName'
                field={'leaveReplacement'}
                maxLimit={1}
                sheetTitle={'Replacement Selection'}
                emptyMessage='No Replacements Found.'
                placeholder={'Select Replecement...'}
                filterField={'replacementName'}
                selectedData={leaveContext.selectedReplacements}
                updateSelectedData={leaveContext.updatedReplacements}
                data={leaveContext.replacements['item']} snap={['90%']} form={form} updateForm={updatedForm}>
                {(item) => (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text>{item.replacementName}</Text>
                    </View>
                )}
            </MutliSelectControl>
        </View>
    )

}

export default CompensatoryLeave

const styles = StyleSheet.create({})