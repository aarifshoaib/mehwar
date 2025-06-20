import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { LeaveListsContext } from './redux/leave-lists.context';
import ScreenWrapper from '../shared/components/screen-wrapper';
import { theme } from '../shared/theme';
import LeaveItem from './components/leaveItem';
import { isLoading } from 'expo-font';
import LeaveHistoryContextProvider from './redux/leave-lists.context';
import SelectControl from '../shared/ui/select.control';
import NoRecords from '../shared/components/no-records';
import { AppServicesContext } from '../home/redux/appServices.context';
import { AppSharedContext } from '../shared/redux/app-shared.context';
import { filterStatus } from '../shared/constants/filterquery';

const LeaveHistoryScreenWrapper = ({ route }) => {
  return (
    <LeaveHistoryContextProvider>
      <LeaveHistoryScreen routeData={route} />
    </LeaveHistoryContextProvider>
  )
}

const LeaveHistoryScreen = ({ routeData }) => {
  const leaveHistory = useContext(LeaveListsContext);
  const appContext = useContext(AppSharedContext);

  const [yearData, setYearData] = useState([]);
  const [filterForm, setFilterForm] = useState({ year: new Date().getFullYear() });
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  const [leaveType, setLeaveType] = useState(routeData?.params?.serviceName);
  const [serviceGrp, setServiceGrp] = useState(routeData?.params?.serviceGroup);

  useEffect(() => {
    console.log('Route Data', routeData);
    if (routeData?.params?.serviceName) {
      setLeaveType(routeData?.params?.serviceName);
    }
    if (routeData?.params?.serviceGroup) {
      setServiceGrp(routeData?.params?.serviceGroup);
    }

  }, [routeData.params.type])
  /** DEFAULT LOAD
   * in the first load 
   * load the year data
   */
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const tempArray = [];
    for (let i = 0; i < 3; i++) {
      const year = currentYear - i;
      tempArray.push({ label: year.toString(), value: year });
    }
    setYearData(tempArray);
  }, []);

  useEffect(() => {
    if (appContext.absences) {
      console.log('Absences', appContext.absences);
    }
  }, [appContext.absences])
  /** CHANGE THE YEAR DROPDOWN
 * changing the year trigger
 */
  useEffect(() => {
    if (filterForm.year) {
      leaveHistory.loadLeavesList(filterForm.year.toString(), { serviceName: leaveType, status: filterStatus, serviceGroup: serviceGrp }, 'false');
    }
  }, [filterForm.year]);


  const onRefresh = () => {
    setRefreshing(true);
    leaveHistory.loadLeavesList(filterForm.year.toString(), { serviceName: leaveType, status: filterStatus, serviceGroup: serviceGrp }, 'true');
    setRefreshing(false);
  }



  return (
    <ScreenWrapper isScroll={true} refreshing={refreshing} onRefresh={onRefresh} >
      <View style={[styles.container, { paddingTop: 0 }]}>
        <View style={{ marginTop: 10, marginBottom: 15 }}>
          <SelectControl itmvalue={filterForm.year} form={filterForm} updateForm={setFilterForm} field='year' placeholder='Year' label='label' value='value' data={yearData} title={''}></SelectControl>
        </View>
        <FlatList data={leaveHistory.leavesList}
          scrollEnabled={false}
          ref={flatListRef}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(data) => <LeaveItem index={data.index} data={data.item} />}
        />
        {!leaveHistory.leavesList.length && <NoRecords title={'No Leave History Found!'} />}
      </View>



    </ScreenWrapper>
  )
}

export default LeaveHistoryScreenWrapper

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'flex-start',
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