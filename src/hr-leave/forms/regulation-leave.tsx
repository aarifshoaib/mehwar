import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AttendanceRegulations from '../components/attendance-regulation'

const RegulationLeave = ({form,updatedForm}) => {
  return (
    <AttendanceRegulations form={form} updatedForm={updatedForm} />
  )
}

export default RegulationLeave

const styles = StyleSheet.create({})