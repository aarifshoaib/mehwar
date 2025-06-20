import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBack from '../../shared/components/back';
import AppTitle from '../../shared/components/app-title';
import { HeaderButton } from '../../shared/components/buttons';
import ProfileScreen from './profile-screen';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../shared/theme';
import BasicInformation from './screens/basic-info';
import FamilyInfo from './screens/familyInfo';
import EmployeeIDs from './screens/ids';
import EmploymentProfile from './screens/employement';
import HousingProfile from './screens/housing';
import Qualifications from './screens/qualifications';
import BankDetails from './screens/bank-details';
import SkillsBank from './screens/skillsBank';
import EmployeeLanguage from './screens/employee-languages';

const ProfileNavigation = ({ drawerNavigation }) => {
    const navigation = useNavigation();
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.primary }, }}>
            <Stack.Screen name="profileScreen" options={{
                headerTitle: () => <AppTitle title={'Profile'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={ProfileScreen} />
            <Stack.Screen name="basicInformation" options={{
                headerTitle: () => <AppTitle title={'Basic Information'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={BasicInformation} />  
            <Stack.Screen name="familyInformation" options={{
                headerTitle: () => <AppTitle title={'Family Information'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={FamilyInfo} />  
            <Stack.Screen name="unifiedIds" options={{
                headerTitle: () => <AppTitle title={'Unified ID\'s'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={EmployeeIDs} />
            <Stack.Screen name="workExpereince" options={{
                headerTitle: () => <AppTitle title={'Work Expereince'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={EmploymentProfile} />
            <Stack.Screen name="housing" options={{
                headerTitle: () => <AppTitle title={'Work Expereince'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={HousingProfile} />
            <Stack.Screen name="qualifications" options={{
                headerTitle: () => <AppTitle title={'Qulaifications'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={Qualifications} />
            <Stack.Screen name="bank" options={{
                headerTitle: () => <AppTitle title={'Bank Information'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={BankDetails} />
            <Stack.Screen name="skills" options={{
                headerTitle: () => <AppTitle title={'Skills Bank'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={SkillsBank} />
            <Stack.Screen name="languages" options={{
                headerTitle: () => <AppTitle title={'Languages'} />,
                headerLeft: () => <AppBack title={'Back'} />,
                headerBackVisible: false,
            }} component={EmployeeLanguage} />
        </Stack.Navigator>

    )
}

export default ProfileNavigation

const styles = StyleSheet.create({})