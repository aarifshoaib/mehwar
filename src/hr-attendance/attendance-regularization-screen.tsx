import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ScreenWrapper from '../shared/components/screen-wrapper'
import AttendanceHistoryContextProvider from './redux/attendance-list.context'
import LeaveItem from '../hr-leave/components/leaveItem'
import { AttendanceListsContext } from './redux/attendance-list.context'
import NoRecords from '../shared/components/no-records'
import SelectControl from '../shared/ui/select.control'
import { filterStatus } from '../shared/constants/filterquery'

const AttendanceRegScreenWrapper = () => {

    return (
        <AttendanceHistoryContextProvider>
            <AttendanceRegScreen />
        </AttendanceHistoryContextProvider>
    )
}

const AttendanceRegScreen = () => {
    const [yearData, setYearData] = useState([]);
    const [filterForm, setFilterForm] = useState({ year: new Date().getFullYear() });
    const [leaveType, setLeaveType] = useState('AttendanceReqularizationRequest');
    const leaveHistory = useContext(AttendanceListsContext);
    const [serviceGrp, setServiceGrp] = useState('Attendance Regularization');
    const [refreshing, setRefreshing] = useState(false);
    const flatListRef = useRef(null);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const tempArray = [];
        for (let i = 0; i < 3; i++) {
            const year = currentYear - i;
            tempArray.push({ label: year.toString(), value: year });
        }
        setYearData(tempArray);
    }, []); // Empty dependency array ensures this runs once when the component mounts

    useEffect(() => {
        console.log(leaveHistory.loadAttendanceRequests.length, 'attendance length');
    }, [leaveHistory.attendanceList]);

    useEffect(() => {
        if (filterForm.year) {
            leaveHistory.loadAttendanceRequests(filterForm.year.toString(), { serviceName: leaveType, status: filterStatus, serviceGroup: serviceGrp }, 'false');
        }
    }, [filterForm.year]);

    const onRefresh = () => {
        setRefreshing(true);
        leaveHistory.loadAttendanceRequests(filterForm.year.toString(), { serviceName: leaveType, status: filterStatus, serviceGroup: serviceGrp }, 'true');
        setRefreshing(false);
    };

    return (
        <AttendanceHistoryContextProvider>
            <ScreenWrapper isScroll={true} refreshing={refreshing} onRefresh={onRefresh} >
                <View style={styles.container}>
                    <View style={{ marginTop: 10, marginBottom: 15 }}>
                        <SelectControl itmvalue={filterForm.year} form={filterForm} updateForm={setFilterForm} field='year' placeholder='Year' label='label' value='value' data={yearData} title={''}></SelectControl>
                    </View>
                    <FlatList data={leaveHistory.attendanceRequests}
                        ref={flatListRef}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(data) => <LeaveItem data={data.item} index={data.index}>{<Text>{data?.item?.requestDetails.absenceReason?.label}</Text>}</LeaveItem>}
                    />
                    {!leaveHistory.attendanceRequests.length && <NoRecords title={'No Attendance Regularization History Found!'} />}

                </View>
            </ScreenWrapper>
        </AttendanceHistoryContextProvider>

    )

}

export default AttendanceRegScreenWrapper

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'flex-start',
    }
})