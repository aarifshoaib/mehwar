import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState, useContext, useRef } from 'react'
import ScreenWrapper from '../../shared/components/screen-wrapper'
import DrawerHeader from '../../shared/components/drawer-header'
import { AppSharedContext } from '../../shared/redux/app-shared.context'
import axiosInstance from '../../auth/services/axios.interceptor'
import { env } from '../../../env/env.dev'
import NotificationItem from './notification-item'


const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const appSharedContext = useContext(AppSharedContext);
  const flatListRef = useRef(null);


  const fetchNotifications = async () => {
    appSharedContext.toggleLoader(true);
    console.log('fetching notifications');
    const response = await axiosInstance.get(`${env.coreServices}notifications`);
    if (response.data) {
      setNotifications(response.data);
    }
    appSharedContext.toggleLoader(false);
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  const refresh = () => {
    setRefreshing(true);
    fetchNotifications();
    setRefreshing(false);
  }

  return (
    <ScreenWrapper refreshing={refreshing} onRefresh={refresh} isScroll={true}>
      <View style={{ paddingHorizontal: 15, flexDirection: 'row', marginBottom: 15, marginTop: 10 }}>
        <FlatList data={notifications}
          ref={flatListRef}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(data) => <NotificationItem index={data.index} data={data.item} navigation={navigation} />}
          onEndReachedThreshold={0.1}
          scrollEnabled={false}
        />

      </View>

    </ScreenWrapper>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({})