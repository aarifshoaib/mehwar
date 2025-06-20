import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import ScreenWrapper from '../shared/components/screen-wrapper'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { theme } from '../shared/theme'
import SelectControl from '../shared/ui/select.control'
import { FlatList } from 'react-native-gesture-handler'
import AttendanceHistoryContextProvider, { AttendanceListsContext } from './redux/attendance-list.context'
import UnauthorizedReportComponent from './components/unauthrized-report.component'
import AttendanceItem from './components/attendance-item'
import NoRecords from '../shared/components/no-records'

const AttendanceReportWrapperScreen = ({ navigation, route }) => {
    return <AttendanceHistoryContextProvider>
        <AttendanceReportScreen navigation={navigation} route={route}>
        </AttendanceReportScreen>
    </AttendanceHistoryContextProvider>
}
const AttendanceReportScreen = ({ navigation, route }) => {

    const attendanceCtx = useContext(AttendanceListsContext);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [yearData, setYearData] = useState([]);
    const [filterForm, setFilterForm] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() });
    const [monthData, setMonthData] = useState([{ value: 0, label: "January" }, { value: 1, label: "February" }, { value: 2, label: "March" },
    { value: 3, label: "April" }, { value: 4, label: "May" }, { value: 5, label: "June" },
    { value: 6, label: "July" }, { value: 7, label: "August" }, { value: 8, label: "September" },
    { value: 9, label: "October" }, { value: 10, label: "November" }, { value: 11, label: "December" }]);

    const onRefresh = () => {
        setRefreshing(true);
        if (selectedIndex == 0) {
            attendanceCtx.loadAttendanceList({ year: filterForm.year, month: filterForm.month }, {});
        } else {
            attendanceCtx.loadUnauthorizedAttendanceList(filterForm);
        }
        setRefreshing(false);
    }

    useEffect(() => {
    }, [filterForm]);

    /** DEFAULT LOAD
     * in the first load 
     * load the year data
     */
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const tempArray = [];
        const currentMonthIndex = new Date().getMonth();
        // let pastAndCurrentMonths = monthData;
        for (let i = 0; i < 3; i++) {
            const year = currentYear - i;
            tempArray.push({ label: year.toString(), value: year });
        }
        setYearData(tempArray);
    }, []);


    /** DEFAULT SEGMENT
     * Checking the routing data param, to select the default segment
     */
    useEffect(() => {
        if (route.params) {
            const type = route.params;
            if (type.data == 'attendance') {
                setSelectedIndex(0);
            } else {
                setSelectedIndex(1);
            }
            // setFilterForm({ year: route.params.year, month: route.params.month });
        }
    }, [route.params])

    /** CHANGE THE YEAR DROPDOWN
     * changing the year trigger
     */
    useEffect(() => {

        setFilterForm({ ...filterForm, year: filterForm.year, month: filterForm.month })
        let pastAndCurrentMonths;
        if (filterForm.year === new Date().getFullYear()) {
            pastAndCurrentMonths = [...monthData.filter((item) => item.value <= new Date().getMonth())];
        } else {
            pastAndCurrentMonths = [{ value: 0, label: "January" }, { value: 1, label: "February" }, { value: 2, label: "March" },
            { value: 3, label: "April" }, { value: 4, label: "May" }, { value: 5, label: "June" },
            { value: 6, label: "July" }, { value: 7, label: "August" }, { value: 8, label: "September" },
            { value: 9, label: "October" }, { value: 10, label: "November" }, { value: 11, label: "December" }];
        }

        setMonthData(pastAndCurrentMonths);
    }, [filterForm.year]);

    /** CHANGE THE MONTH DROPDOWN
     * changing the month trigger
     */
    useEffect(() => {
        if ((filterForm.month || filterForm.year) && selectedIndex == 0) {
            console.log(filterForm, 'filterForm');
            console.log('Month Changed', filterForm.month);
            const x = attendanceCtx.loadAttendanceList({ year: filterForm.year, month: filterForm.month }, {});
        }
    }, [filterForm])


    return (
        <ScreenWrapper refreshing={refreshing} onRefresh={onRefresh}>
            <View style={styles.container}>
                <SegmentedControl
                    values={['My Attendance', 'Unauthorized']}
                    tintColor={theme.primary}
                    fontStyle={{ color: theme.primaryDark }}
                    activeFontStyle={{ color: theme.tint }}
                    style={{ height: 40, borderRadius: 18, backgroundColor: theme.tint, }}
                    selectedIndex={selectedIndex}
                    onChange={(event) => {
                        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
                />
                <View style={{ flexDirection: 'row', alignContent: 'stretch', flex: 1, marginBottom: 10, marginTop: 5 }}>
                    {<View style={{ alignSelf: 'stretch', flex: 1, marginEnd: 10 }}>
                        <SelectControl itmvalue={filterForm.year} form={filterForm} updateForm={setFilterForm} field='year' placeholder='Year' value='value' data={yearData} title={''}></SelectControl>
                    </View>}
                    {selectedIndex == 0 && <View style={[{ alignSelf: 'stretch', flex: 1 }, selectedIndex == 0 ? { marginStart: 10 } : null]}>
                        <SelectControl itmvalue={filterForm.month} placeholder='Month' value='value' updateForm={setFilterForm} data={monthData} field='month' form={filterForm} title={''}></SelectControl>
                    </View>}
                </View>

                {selectedIndex == 0 && <FlatList ListEmptyComponent={<NoRecords title={'No Attendance Found!'} />} scrollEnabled={false} data={attendanceCtx.attendanceList} renderItem={(item) => <AttendanceItem data={item} />} />}
                <AttendanceHistoryContextProvider>
                    {selectedIndex == 1 && <UnauthorizedReportComponent month={filterForm.month} year={filterForm.year} />}
                </AttendanceHistoryContextProvider>
            </View>
        </ScreenWrapper>
    )
}

export default AttendanceReportWrapperScreen

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    date: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic'
    },
    title: {
        fontSize: 22, color: theme.primary
    },
    status: { paddingStart: 10, fontFamily: theme.fontFamily, color: theme.primary },
    statusContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }
})