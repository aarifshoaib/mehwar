import { StyleSheet, Text, View } from 'react-native'
import { useContext, useEffect, useRef, useState } from 'react'
import LoginNavigation from './src/auth/login-navigation';
import { AuthContext } from './src/auth/redux/auth.context';
import React from 'react';
import AppSharedContextProvider, { AppSharedContext } from './src/shared/redux/app-shared.context';
import LottieView from 'lottie-react-native';
import { appAnimations } from './src/shared/constants/animations';
import AppServicesContextProvider from './src/home/redux/appServices.context';
import { setUpAxiosInterceptors } from './src/auth/services/axios.interceptor';
import { useNavigation } from '@react-navigation/native';
import HomeNavigation from './src/home/home-navigation';
import RotatingImageLoader from './src/shared/ui/image-loader';

const AppMain = () => {

    const authContext = useContext(AuthContext);
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const appContext = useContext(AppSharedContext);
    const navigation = useNavigation();

    // const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    //     undefined
    // );
    // const notificationListener = useRef<Notifications.Subscription>();
    // const responseListener = useRef<Notifications.Subscription>();
    useEffect(() => {
        setIsLoading(appContext.loader);
    }, [appContext.loader]);

    useEffect(() => {
        if (authContext.user != null) {
            console.log(authContext.user.mail, 'The user is logged in');
            setUpAxiosInterceptors(logout);
        }
        
    }, [logout])


    useEffect(() => {
        setUser(authContext.user);
        if (authContext.user != null) {
            console.log(authContext.user.mail, 'The user is logged in');
        }
    }, [authContext.user])

    return (

        <View style={styles.container}>
            {user ? <AppServicesContextProvider>
                <HomeNavigation navigation={navigation} />
            </AppServicesContextProvider> : <LoginNavigation />}
            {isLoading && <View style={{ flex: 1, backgroundColor: 'rgba(190,190,190,.5)', position: 'absolute', justifyContent: 'center', top: 0, right: 0, left: 0, bottom: 0, zIndex: 1 }}>
                {/* <LottieView source={appAnimations.loadernew} style={{ width: '100%', height: 200 }} autoPlay /> */}
                <RotatingImageLoader imageSource={appAnimations.logo} size={80} duration={2000} />
            </View>}
        </View>
    )
}

export default AppMain

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})