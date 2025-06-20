import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeaveFormScreenWrapper from './leave-form-screen';
import { theme } from '../shared/theme';
import AppTitle from '../shared/components/app-title';
import AppBack from '../shared/components/back';
import { HeaderButton } from '../shared/components/buttons';
import LeaveHistoryScreenWrapper from './leave-history-screen';
import { LeaveType } from '../hr/constants/leave-types.constants';

const LeaveNavigation = ({ navigation, route }) => {
    const Stack = createNativeStackNavigator();
    const [dynamicTitle, setDynamicTitle] = useState('');
    const routeToAdd = () => {
        navigation.navigate(route.params.addNavigation);
    }

    useEffect(() => {
        console.log('route.params :', route.params);
        const type = route.params.type;
        switch (type) {
            case LeaveType.ANNUAL_LEAVE:
                setDynamicTitle('Annual Leaves');
                break;
            case LeaveType.SICK_LEAVE:
                setDynamicTitle('Sick Leaves');
                break;
            default:
                break;
        }
    }, [route.params.type]);

    useEffect(() => {
        if (route.params.title) {
            console.log('Title', route.params.title);
            setDynamicTitle(route.params.title);
        }
    }, [route.params.title]);
    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerStyle: { backgroundColor: theme.primary }, }}>

            <Stack.Screen name="AddAnnualLeaveScreen" component={LeaveFormScreenWrapper}
                initialParams={{ type: LeaveType.ANNUAL_LEAVE, serviceName: 'AnnualLeaveRequest', serviceGroup: route?.params?.serviceGroup }}
                options={{
                    title: 'Leave Form', headerTitle: () => <AppTitle title={'New Annual Leave'} />,
                    headerLeft: () => <AppBack />,
                    headerBackVisible: false,
                    headerRight: () => (<HeaderButton onPress={routeToAdd} icon={'clock'} type={'feather'} options={null} />
                    ),
                }} />
            {/* <Stack.Screen name="AddSickLeaveScreen" component={LeaveFormScreenWrapper}
                initialParams={{ type: LeaveType.SICK_LEAVE, serviceName: 'SickLeaveRequest', serviceGroup: route?.params?.serviceGroup }}
                options={{
                    title: 'Leave Form', headerTitle: () => <AppTitle title={'New Sick Leave'} />,
                    headerLeft: () => <AppBack />,
                    headerBackVisible: false,
                    headerRight: () => (<HeaderButton onPress={null} icon={'information-variant'} type={'material'} options={null} />
                    ),
                }} /> */}
            <Stack.Screen name="LeaveHistoryNav" component={LeaveHistoryScreenWrapper}
                initialParams={{ type: route.params.type, serviceName: route?.params?.serviceName, serviceGroup: route?.params?.serviceGroup }}
                options={{
                    title: 'Leave History', headerTitle: () => <AppTitle title={dynamicTitle} />,
                    headerLeft: () => <AppBack title={'Leave Service'} iParams={{ type: LeaveType.ANNUAL_LEAVE, serviceName: 'AnnualLeaveRequest', serviceGroup: route?.params?.serviceGroup }} />,
                    headerBackVisible: false,
                    headerRight: () =>  <></>
                    ,
                }} />
        </Stack.Navigator>
    )
}

export default LeaveNavigation

const styles = StyleSheet.create({})

