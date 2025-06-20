import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AttendanceListsContext } from '../redux/attendance-list.context';
import AttendanceItem from './attendance-item';

const AttendanceReportComponent = () => {
    const attendanceCtx = useContext(AttendanceListsContext);
    return (
        <FlatList scrollEnabled={false} data={attendanceCtx.attendanceList} renderItem={(item) => <AttendanceItem item={item.item} />} />
    )
}

export default AttendanceReportComponent

const styles = StyleSheet.create({})