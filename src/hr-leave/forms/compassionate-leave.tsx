import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LeaveContext } from '../redux/leave.context';
import SelectControl from '../../shared/ui/select.control';
import MutliSelectControl from '../../shared/components/multiselect.control';
import DatepickerControl from '../../shared/ui/datepicker.control';

const CompassionateLeave = ({ form, updatedForm, validationSchema }) => {    
    const leaveContext = useContext(LeaveContext);
    
    const cLeaveReason = [{
        "value": "Wife",
        "label": "Wife" 
    }, {
        "value": "Husband",
        "label": "Husband"
    }, {
        "value": "Child",
        "label": "Child"
    }, {
        "value": "Parent",
        "label": "Parent"
    }, {
        "value": "Sibling",
        "label": "Sibling"
    }, {
        "value": "Grandparent",
        "label": "Grandparent"
    }, {
        "value": "Grandchild",
        "label": "Grandchild"
    }, {
        "value": "Father-in-law",
        "label": "Father-in-law"
    }, {
        "value": "Mother-in-law",
        "label": "Mother-in-law"
    }, {
        "value": "Brother-in-law",
        "label": "Brother-in-law"
    }, {
        "value": "Sister-in-law",
        "label": "Sister-in-law"
    }, {
        "value": "Uncle",
        "label": "Uncle"
    }, {
        "value": "Aunt",
        "label": "Aunt"
    }, {
        "value": "Niece",
        "label": "Niece"
    }, {
        "value": "Nephew",
        "label": "Nephew"
    }, {
        "value": "Cousin",
        "label": "Cousin"
    }, {
        "value": "Other",
        "label": "Other"
    }
]

    useEffect(() => {

    }, [validationSchema]);
    return (
        <View>
            <SelectControl returnFullObject={true} hasError={leaveContext.errors['cLeaveReason']} data={cLeaveReason} label={'label'} value={'value'} title='Leave Reason' form={form} updateForm={updatedForm} field='absenceReason' />
            <DatepickerControl hasError={(leaveContext.errors['resumptionDate'])} title='Resumption Date' field='resumptionDate' placeholder='Select Resumption Date' form={form} updateForm={updatedForm} />
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

export default CompassionateLeave

const styles = StyleSheet.create({})