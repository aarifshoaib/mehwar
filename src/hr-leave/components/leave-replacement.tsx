import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LeaveContext } from '../redux/leave.context';
import MutliSelectControl from '../../shared/components/multiselect.control'
import DatepickerControl from '../../shared/ui/datepicker.control';

const LeaveResumptionandReplacement = ({ form, updatedForm, validationSchema }) => {
  const leaveContext = useContext(LeaveContext);

  useEffect(() => {

  }, [validationSchema]);

  const onSearchUser = (term, signal) => {
    leaveContext.searchUsers(term, signal);
};
  return (
    <View>
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
        hasError={leaveContext.errors['leaveReplacement'] || false}
        selectedData={leaveContext.selectedReplacements}
        filterQuery={onSearchUser}
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

export default LeaveResumptionandReplacement

const styles = StyleSheet.create({})