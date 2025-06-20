import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../shared/theme';
import ServiceDescription from '../shared/screens/service-description';
import React from 'react';
import AppBack from '../shared/components/back';
import AttendanceScreenNav from './attendance-screen';
import AppTitle from '../shared/components/app-title';
import AttendanceHistoryScreenWrapper from './attendance-report-screen';
import { HeaderButton } from '../shared/components/buttons';
import AttendanceRegulations from '../hr-leave/components/attendance-regulation';
import AttendanceRegScreen from './attendance-regularization-screen';
import AttendanceContextProvider from './redux/attendance.context';
import AttendanceRegScreenWrapper from './attendance-regularization-screen';


const AttendanceNavigation = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    const routeToAdd = () => {
        navigation.navigate('AttendanceReg');
    }
    return (
        <AttendanceContextProvider>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: theme.primary },
                }}
            >
               
                <Stack.Screen
                    name='MissingAttendance'
                    component={AttendanceScreenNav} options={{
                        headerTitle: () => <AppTitle title='Attendance' />,
                        headerBackVisible: false,
                        headerLeft: () => <AppBack title={'Attendance'} />,
                        headerRight: () => <HeaderButton onPress={routeToAdd} icon={'clock'} type={'feather'} options={undefined}></HeaderButton>
                    }} />
                <Stack.Screen
                    name='AttendanceReg'
                    component={AttendanceRegScreenWrapper} options={{
                        headerTitle: () => <AppTitle title='At. Regularization History' />,
                        headerBackVisible: false,
                        headerLeft: () => <AppBack title={'Attendance'} />,
                        headerRight: () => <></>

                    }} />


            </Stack.Navigator>
        </AttendanceContextProvider>

    );
}


export default AttendanceNavigation