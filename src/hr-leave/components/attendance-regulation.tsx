import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SelectControl from '../../shared/ui/select.control'

const AttendanceRegulations = ({form,updatedForm}) => {
    const [attendanceData, setAttendanceData] = useState([
        {
            label: 'Conference',
            value: 0
        },
        {
            label: 'Forget ID Card',
            value: 1
        },
        {
            label: 'Forget to Swipe In',
            value: 2
        },
        {
            label: 'Forget to Swipe Out',
            value: 3
        },
        {
            label: 'ID Under CID Approval',
            value: 4
        },
        {
            label:'Permission for Business',
            value:5
        },
        {
            label:'Permission for Personal',
            value:6
        },
        {
            label:'Permission for Study',
            value:7
        }
    ])
  return (
    <SelectControl field='reason' title='Reason' data={attendanceData} form={form} updateForm={updatedForm} />
  )
}

export default AttendanceRegulations

const styles = StyleSheet.create({})