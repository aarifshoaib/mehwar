import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeaveFormScreenWrapper from '../../hr-leave/leave-form-screen';
import AppTitle from '../../shared/components/app-title';
import AppBack from '../../shared/components/back';
import { HeaderButton } from '../../shared/components/buttons';
import { theme } from '../../shared/theme';
import NotificationsScreen from './notifications-screen';
import NotificationDetails from './notification-details';

const NotificationNavigation = ({ navigation, route }) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerStyle: { backgroundColor: theme.primary }, }}>
            <Stack.Screen name="NotificationNav" component={NotificationsScreen}
                options={{
                    title: 'Notifications', headerTitle: () => <AppTitle title={'Notifications'} />,
                    headerLeft: () => <AppBack title={'Notifications'} />,
                    headerBackVisible: false,
                    headerRight: () => (<HeaderButton onPress={() => { }} icon={'checkmark-done'} type={'ionic'} options={null} />
                    ),
                }} />
            <Stack.Screen name="ViewNotification" component={NotificationDetails}
                options={{
                    title: 'Leave Form', headerTitle: () => <AppTitle title={'Notification Details'} />,
                    headerLeft: () => <AppBack />,
                    headerBackVisible: false,
                    
                }} />
          
        </Stack.Navigator>
    )
}

export default NotificationNavigation

const styles = StyleSheet.create({})

