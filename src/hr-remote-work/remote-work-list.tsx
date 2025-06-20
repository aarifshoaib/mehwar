import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { RemoteWorkListsContext } from './redux/remote-work-list.context';
import ScreenWrapper from '../shared/components/screen-wrapper';
import { theme } from '../shared/theme';
import LeaveItem from '../hr-leave/components/leaveItem';
import { isLoading } from 'expo-font';
import RemoteWorkHistoryContextProvider from './redux/remote-work-list.context';
import NoRecords from '../shared/components/no-records';
import SelectControl from '../shared/ui/select.control';
import { filterStatus } from '../shared/constants/filterquery';

const RemoteWorkHistoryScreenWrapper = () => {
  return (
    <RemoteWorkHistoryContextProvider>
      <RemoteHistoryScreen />
    </RemoteWorkHistoryContextProvider>
  )
}

const RemoteHistoryScreen = () => {

  const leaveHistory = useContext(RemoteWorkListsContext);
  const flatListRef = useRef(null);
  const [yearData, setYearData] = useState([]);
  const [filterForm, setFilterForm] = useState({ year: new Date().getFullYear() });
  const [leaveType, setLeaveType] = useState({$in: ['RemoteWorkNormalRequest', 'RemoteWorkSpecialRequest']});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const tempArray = [];
    for (let i = 0; i < 3; i++) {
      const year = currentYear - i;
      tempArray.push({ label: year.toString(), value: year });
    }
    setYearData(tempArray);
  }, []);

  // useEffect(() => {
  //   leaveHistory.loadLeavesList(filterForm.year.toString(), { serviceName: 'RemoteWorkRequest', serviceGroup: 'Remote Work' }, 'false');
  // }, []); // Empty dependency array ensures this runs once when the component mounts

  useEffect(() => {
    if (filterForm.year) {
      leaveHistory.loadLeavesList(filterForm.year.toString(), { serviceName: leaveType, status: filterStatus, serviceGroup: 'Remote Work' }, 'false');
    }
  }, [filterForm.year]);


  const onRefresh = () => {
    setRefreshing(true);
    leaveHistory.loadLeavesList(filterForm.year.toString(), { serviceName: leaveType, status: filterStatus, serviceGroup: 'Remote Work' }, 'true');
    setRefreshing(false);
  }


  return (
    <ScreenWrapper isScroll={true} refreshing={refreshing} onRefresh={onRefresh} >
      <View style={styles.container}>
        <View style={{ marginTop: 10, marginBottom: 15 }}>
          <SelectControl itmvalue={filterForm.year} form={filterForm} updateForm={setFilterForm} field='year' placeholder='Year' label='label' value='value' data={yearData} title={''}></SelectControl>
        </View>
        <FlatList data={leaveHistory.leavesList}
          scrollEnabled={false}
          ref={flatListRef}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(data) => <LeaveItem data={data.item} index={data.index} />}
        />
        {!leaveHistory.leavesList.length && <NoRecords title={'No Remote Work History Found!'} />}

      </View>
    </ScreenWrapper>
  )
}

export default RemoteWorkHistoryScreenWrapper

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