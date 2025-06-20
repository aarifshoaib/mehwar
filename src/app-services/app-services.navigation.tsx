import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenWrapper from '../home/home-screen';
import AppHeader from '../shared/components/header';
import { theme } from '../shared/theme';
import React from 'react';
import AttendanceReportWrapperScreen from '../hr-attendance/attendance-report-screen';
import LeaveHistoryScreen from '../hr-leave/leave-history-screen';
import AppTitle from '../shared/components/app-title';
import AppBack from '../shared/components/back';
// import FavoriteScreenWrapper from '../favorite/favorite-screen';
// import FavoriteAddScreenWrapper from '../favorite/favorite-add-screen';
// import Basic from '../favorite/favorite-screen-new';
// import LeaveNavigation from '../hr-leave/leave-navigation';
// import CarLoanNavigation from '../hr-loan/car-loan/car-loan-navigation';
// import SalaryLoanNavigation from '../hr-loan/salary-loan/salary-loan-navigation';
// import HouseLoanNavigation from '../hr-loan/house-loan/house-loan-navigation';
// import PayslipNavigation from '../hr-payslip/payslip-navigation';
// import IbtikarNavigation from '../ibtikar/ibtikar-navigation';
// import RemoteWorkNavigation from '../hr-remote-work/remote-work-navigation';
// import IncidentNavigation from '../incident/incident-navigation';
// import SkillsBankNavigation from '../hr-skills-bank/skills-bank-navigation';
// import ManagerIbtikarNavigation from '../manager/mngr-ibtikar/mngr-ibtikar-navigation';
// import ManagerTeamLeavesNavigation from '../manager/mngr-team-leaves/mngr-team-leaves-navigation';
// import AppServiceScreen from './app-services-screen';
// import AttendanceNavigation from '../hr-attendance/attendance-navigation';
// import BookingMeetingNavigation from '../booking-meeting/booking-meeting-navigation';
// import { LeaveType } from '../hr/constants/leave-types.constants';
// import LoginNavigation from '../auth/login-navigation';
// import ManagerReporteesNavigation from '../manager/mngr-reportees/mngr-reportees-navigation';
// import SickLeaveNavigation from '../hr-leave/sick-leave-navigation';
// import EmployeesServices from './app-services-screen';
// import BusinessTripNavigation from '../hr-business-trip/business-trip-navigation';
// import BusinessCardNavigation from '../business-card/business-card-navigation';
// import { HeaderButton } from '../shared/components/buttons';
// import HRLetterNavigation from '../hr-letters/hr-letter-navigation';
// import AttendanceRegScreen from '../hr-attendance/attendance-regularization-screen';
// import AttendanceReportScreen from '../hr-attendance/attendance-report-screen';


const AppServicesNavigation = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.primary, }, headerShadowVisible: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreenWrapper} options={{ header: () => <AppHeader navigation={navigation} /> }} />
            <Stack.Screen name="LeaveHistoryScreen"
                options={{
                    title: 'Leave Form', headerTitle: () => <AppTitle title={'Leave History'} />,
                    headerLeft: () => <AppBack title={'Leave Service'} />,
                    headerBackVisible: false,
                }} component={LeaveHistoryScreen} />
            <Stack.Screen name="AttendanceReportNavigation"
                options={{
                    title: 'Attendance Report', headerTitle: () => <AppTitle title={'Attendance Report'} />,
                    headerLeft: () => <AppBack title={'Attendance Report'} />,
                    headerBackVisible: false,
                }} component={AttendanceReportWrapperScreen} />

            {/* <Stack.Screen name="AnnualLeaveNavigation" initialParams={{ title: 'Annual Leave', addNavigation: 'LeaveHistoryNav', type: LeaveType.ANNUAL_LEAVE, parentRoute: 'AnnualLeaveNavigation', serviceName: 'AnnualLeaveRequest', serviceGroup: 'Annual Leave' }} component={LeaveNavigation} options={{ headerShown: false, }} />
            <Stack.Screen name="SickLeaveNavigation" initialParams={{ title: 'Sick Leave', addNavigation: 'LeaveHistoryNav', type: LeaveType.SICK_LEAVE, parentRoute: 'SickLeaveNavigation', serviceName: 'SickLeaveRequest', serviceGroup: 'Sick Leave' }} component={SickLeaveNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="CarLoanNavigation" component={CarLoanNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="SalaryAdvancedNavigation" component={SalaryLoanNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="HouseLoanNavigation" component={HouseLoanNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="PayslipNavigation" component={PayslipNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="IbtikarNavigation" component={IbtikarNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="RemoteWorkNavigation" component={RemoteWorkNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="BusinessCardNavigation" component={BusinessCardNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="IncidentNavigation" component={IncidentNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="SkillsBankNavigation" component={SkillsBankNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ManagerIbtikarNavigation" component={ManagerIbtikarNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="ManagerTeamLeavesNavigation" component={ManagerTeamLeavesNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="MissingAttendanceNavigation" component={AttendanceNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="FavoriteScreen" options={{ headerTitle: () => <AppTitle title="Favorite Services" />, headerBackVisible: false, headerLeft: () => <AppBack /> }} component={FavoriteScreenWrapper} />
            <Stack.Screen name="ManagerServiceScreen" options={{ title: 'Manager Services' }} component={AppServiceScreen} />
            <Stack.Screen name="EmployeeServiceNavigation" options={{ title: 'Services' }} component={AppServiceScreen} />
            <Stack.Screen name="MyReporteesNavigation" options={{ title: 'My Reportees', headerShown: false }} component={ManagerReporteesNavigation} />
            <Stack.Screen name="AddFavoriteScreen" options={{
                title: 'Update Favorite', headerTitle: () => <AppTitle title={'Favorites'} />,
                headerLeft: () => <AppBack title={'Favorites'} />,
                headerBackVisible: false,
            }} component={FavoriteAddScreenWrapper} />
            <Stack.Screen name="EmployeeScreen" options={{ title: 'Employee Services' }} component={EmployeesServices} />
            <Stack.Screen name="NewEditFavorite" options={{ title: 'Add Favorite' }} component={Basic} />
            <Stack.Screen name="BookingMeetingNavigation" options={{ headerShown: false }} component={BookingMeetingNavigation} />
            <Stack.Screen name="BusinessTripNavigation" component={BusinessTripNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="HrLettersNavigation" component={HRLetterNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="AttendanceRegNavigation" component={AttendanceNavigation} options={{ headerShown: false }} />
            
        */}

        </Stack.Navigator>

    )
}

export default AppServicesNavigation

const styles = StyleSheet.create({})