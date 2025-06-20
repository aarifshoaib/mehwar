import { StyleSheet, View, Image, Text } from 'react-native';
import { useContext, useState } from 'react'
import { env } from '../../env/env.dev';
import { AuthContext } from './redux/auth.context';
import AzureAuth from 'react-native-azure-auth';
import React from 'react';
import { appImages } from '../shared/constants/images';
import { ImageButton } from '../shared/ui/buttons';
import { theme } from '../shared/theme';
import LottieView from "lottie-react-native";
import { appAnimations } from '../shared/constants/animations';
import { AppSharedContext } from '../shared/redux/app-shared.context';
import axios from 'axios';
import axiosInstance from './services/axios.interceptor';
import { color } from '@rneui/base';


const LoginScreen = () => {
    const appSharedContext = useContext(AppSharedContext);
    const authContext = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [image, setImage] = useState('');
    const azureAuth = new AzureAuth({
        clientId: env.azureAppId,
        tenant: env.azureTenantId,

    });

    // const _onLogin = async () => {
    //     try {
    //         const tokens: any = await azureAuth.webAuth.authorize({
    //             scope: `api://${env.azureApiId}/employees/user_impersonation`,
    //         });

    //         if (!tokens || !tokens.userId || !tokens.accessToken) {
    //             console.warn('Authorization failed or missing tokens.');
    //             return;
    //         }

    //         const _token = await azureAuth.auth.acquireTokenSilent({
    //             userId: tokens.userId,
    //             scope: 'User.Read, profile',
    //         });

    //         if (!_token || !_token.accessToken) {
    //             console.warn('Silent token acquisition failed.');
    //             return;
    //         }

    //         const info = await azureAuth.auth.msGraphRequest({
    //             token: _token.accessToken,
    //             path: 'me',
    //         });

    //         const samAccount = await azureAuth.auth.msGraphRequest({
    //             token: _token.accessToken,
    //             path: 'me/?$select=onPremisesSamAccountName',
    //         });

    //         if (!info || !samAccount || !samAccount.onPremisesSamAccountName) {
    //             console.warn('Could not retrieve user info.');
    //             return;
    //         }

    //         const user = {
    //             ...info,
    //             samAccount: samAccount.onPremisesSamAccountName,
    //             photo: image, // Make sure `image` is defined somewhere in scope
    //         };

    //         await authContext.loadUser(user);

    //         const ibtikarToken = ""; // If needed, uncomment the axiosInstance.get call

    //         await authContext.login(user, _token.accessToken, tokens.accessToken, ibtikarToken);

    //         // Optional push token logic
    //         // const tokenPayload = { token: appSharedContext.pushToken, email: user.mail };
    //         // await axiosInstance.post(`${env.coreServices}notifications/pushToken`, tokenPayload);
    //     } catch (error) {
    //         console.error('Error during Azure operation:', error);
    //     }
    // };




    const _onLogin = async () => {
        try {
            let tokens: any = await azureAuth.webAuth.authorize({ scope: `api://${env.azureApiId}/user_impersonation` })
            if (!tokens) {
                null;
            };
            let _token = await azureAuth.auth.acquireTokenSilent({
                userId: tokens.userId,
                scope: 'User.Read, profile'
            });
            if (!_token) {
                return
            };
            let info = await azureAuth.auth.msGraphRequest({ token: _token.accessToken, path: 'me' });
            let samAccount = await azureAuth.auth.msGraphRequest({ token: _token.accessToken, path: 'me/?$select=onPremisesSamAccountName' });
            if (!info) {
                return;
            }
            console.log('====================================');
            console.log('api token');
            console.log('====================================');
            console.log(tokens.accessToken);
            console.log('====================================');
            console.log('user token');
            console.log('====================================');
            console.log(_token.accessToken);
            console.log('====================================');
            let user = { ...{ samAccount: samAccount.onPremisesSamAccountName }, ...info, photo: image };
            let ibtikarToken = "";//await axiosInstance.get(`${env.coreServices}ibtikar/token`);
            authContext.login(user, _token.accessToken, tokens.accessToken, ibtikarToken).then(async () => {
                //const tokenPayload = { token: appSharedContext.pushToken, email: user.mail }
                const x = await authContext.loadUser(user);
                //const pushToken = await axiosInstance.post(`${env.coreServices}notifications/pushToken`, tokenPayload);
            });
        } catch (error) {
            console.log('Error during Azure operation', error)
        }
    };

    const _onLogout = () => {
        authContext.logout();
    };

    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1,  justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'center', width: '100%' }}>
                <LottieView source={appAnimations['splash']} style={{ width: 250, height: 200, alignItems: 'flex-end', justifyContent: 'flex-end' }} progress={1} autoPlay={false} loop={false} />
            </View>
            <View style={{   justifyContent: 'space-between', alignItems: 'center',alignSelf:'center', width: '100%',flex: 1 }}>
                <ImageButton title='Employee Login' textStyle={{ color: theme.tint, fontSize: 18, padding: 10 }} image={'logonew'} onclick={_onLogin} style={styles.imageButton} />
                <Image
                    style={styles.logoImage }
                    resizeMode='stretch'
                    source={appImages['adportsLogo']}
                />
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 50,
        width: 250,
        height: 87
    },
    logoImage: {
        height: 30,
        width: 162,
        marginBottom: 50
    },
    imageButton: {
        backgroundColor: theme.primary,
        width: 200,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }
})






export default LoginScreen;
