import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import AttendanceItem from './attendance-item'
import { AttendanceListsContext } from '../redux/attendance-list.context'
import UnauthrizedItem from './unauthrized-item'
import NoRecords from '../../shared/components/no-records'

const UnauthorizedReportComponent = ({ month, year }) => {
  const [list, setList] = useState([]);
  const attendanceCtx = useContext(AttendanceListsContext);

  useEffect(() => {
    if (year) {
      console.log(year);
      attendanceCtx.loadUnauthorizedAttendanceList({ year });
    }
  }, [year])

  useEffect(() => {
    console.log('im Changed');
    setList(attendanceCtx.unaluthrizedAttendanceList);
  }, [attendanceCtx.unaluthrizedAttendanceList])
  return (
    <View>

      <FlatList ListEmptyComponent={<NoRecords title={'No Unauthorized Absence Found!'} />} scrollEnabled={false} data={attendanceCtx.unaluthrizedAttendanceList} renderItem={(items) => <UnauthrizedItem index={items.index} item={items.item} />} />
    </View>
  )
}

export default UnauthorizedReportComponent

const styles = StyleSheet.create({})