import { createContext, useEffect, useState } from "react";
import React from 'react';
import AzureAuth from "react-native-azure-auth";
import { env } from "../../../env/env.dev";
import axiosInstance from "../services/axios.interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext({
    user: null,
    isloading: false,
    toggleLoading: (value) => { },
    login: async (user: any, userToken: any, apiToken: any, ibtikarToken: any) => { },
    logout: () => { },
    loadUser: (user: any) => { },
    userToken: null,
    apiToken: null,
    ibtikarToken: null,
    profileImage: null,
    profile: null,
    lookups: null
});

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [apiToken, setApiToken] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [ibtikarToken, setIbtikarToken] = useState(null);
    const [lookups, setLookups] = useState(null);


    const login = async (user: any, _userToken: any, _apiToken: any, _ibtikarToken) => {
        try {

            await AsyncStorage.setItem('ibtikarToken', _ibtikarToken);
            await AsyncStorage.setItem('apiToken', _apiToken);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            await AsyncStorage.setItem('userToken', _userToken);

            setApiToken(_apiToken);
            setUserToken(_userToken);
            setUser(user);

            // const response = await axiosInstance.get(`${env.coreServices}lookups/types/all?types=COUNTRY,MARITAL_STATUS`, {}).then(async (result) => {
            //     setLookups(result.data);
            //     return result.data;
            // }).catch((error) => {
            //     console.log('error in employee profile servicesrrr', error);
            // });
        } catch (error) {
            throw new Error(error);
        }

    };

    useEffect(() => {
        const azureAuth = new AzureAuth({
            clientId: env.azureAppId,
            tenant: env.azureTenantId
        });



        if (!userToken) return;
        if (userToken) {
            const loadImage = azureAuth.auth.msGraphRequest({ token: userToken, path: 'me/photo/$value' })
                .then(blob => blobToBase64(blob))
                .then(base64String => {
                    setProfileImage(base64String);
                })
                .catch(error => {
                    console.log('Error converting blob to Base64:', error);
                });
        }
    }, [userToken]);

    const loadUser = async (user) => {
        // const response = await axiosInstance.get(`${env.coreServices}employees`).then(async (result) => {
        //     const workInfo = result.data.workInfo;
        //     const basicInfo = result.data.basicInfo;
        //     const citizenships = result.data.citizenships;
        //     const emiratesId = result.data.emiratesIDInfo;
        //     const passportDetails = result.data.passportDetails;
        //     const _user = { ...user, workInfo, citizenships, emiratesId, passportDetails, basicInfo };
        //     await AsyncStorage.setItem('personNumber', result.data.workInfo.personNumber);
        //     setUser(_user);
        //     return result.data;
        // }).catch((error) => {
        //     console.log('error in employee profile services', error);
        // });
        //return response;
    };

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // The result includes the Base64 string with a data URL prefix.
                // You might need to strip the prefix if only the Base64 string is needed.
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    const logout = async () => {
        console.log('im Called from logout');
        AsyncStorage.removeItem('apiToken');
        await AsyncStorage.removeItem('ibtikarToken');
        await AsyncStorage.removeItem('apiToken');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('userToken');
        setUser(null);
        setUserToken(null);
    };

    const value = {
        user,
        login,
        logout,
        userToken,
        profileImage,
        loadUser,
        isloading,
        apiToken,
        ibtikarToken,
        toggleLoading: (value) => {
            setIsLoading(value);
        },
        profile,
        lookups
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;


