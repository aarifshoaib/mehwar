import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "../shared/theme";
import ServiceDescription from "../shared/screens/service-description";
import React from 'react';
import AppBack from "../shared/components/back";
import RemoteWorkScreenWrapper from "./remote-work-screen";
import AppTitle from "../shared/components/app-title";
import { HeaderButton } from "../shared/components/buttons";
import RemoteWorkHistoryScreenWrapper from "./remote-work-list";

const RemoteWorkNavigation = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    const routeToAdd = () => {
        navigation.navigate('RemorkWorkHistoryNav');
    }
    return (
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.primary }, }}>
            <Stack.Screen
                name='RemoteWorkRequest'
                component={RemoteWorkScreenWrapper} options={{
                    headerTitle: () => <AppTitle title={'Remote Work Request'} />,
                    headerBackVisible: false,
                    headerRight: () => (
                        <HeaderButton onPress={routeToAdd} icon={'clock'} type={'feather'} options={undefined} />
                    ),
                    headerLeft: () => <AppBack title={'Remote Work'} />
                }} />
                <Stack.Screen name="RemorkWorkHistoryNav" component={RemoteWorkHistoryScreenWrapper}
                    options={{
                        title: 'Remote Work History', headerTitle: () => <AppTitle title={'Remote Work History'} />,
                        headerLeft: () => <AppBack title={'Leave Service'} />,
                        headerBackVisible: false,
                        headerRight: () => (<></>
                        ),
                    }} />
               
            </Stack.Navigator>
    );
}

export default RemoteWorkNavigation
