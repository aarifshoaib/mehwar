import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LeaveContext } from '../redux/leave.context';
import DatepickerControl from '../../shared/ui/datepicker.control';

const ResumptionDate = ({ form, updatedForm, validationSchema }) => {
  const leaveContext = useContext(LeaveContext);

  useEffect(() => {

  }, [validationSchema]);
  return (
    <View>
      <DatepickerControl hasError={(leaveContext.errors['resumptionDate'])} title= 'Resumption =Date' field= 'resumptionDate' placeholder= 'Select Resumption Date' form={form} updateForm={updatedForm} />
     
    </View>
  )
}

export default ResumptionDate

const styles = StyleSheet.create({})