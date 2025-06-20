import { createContext, useContext, useState, useEffect } from "react";
import React from 'react';
import { AuthContext } from "../../auth/redux/auth.context";
import { AppSharedContext } from "../../shared/redux/app-shared.context";
import { env } from "../../../env/env.dev";
import axiosInstance from "../../auth/services/axios.interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storages } from "../../shared/constants/storages";

export const LeaveListsContext = createContext({
    leavesList: [],
    loadLeavesList: (year?: string, filter?: any, fresh?: string) => { }
});


function LeaveHistoryContextProvider({ children }) {

    const authContext = useContext(AuthContext);
    const appContext = useContext(AppSharedContext);
    const [leavesList, setLeaveLists] = useState([]);


    const loadLeavesList = async (year: string = new Date().getFullYear().toString(), filter = null, fresh = 'false') => {
        try {
            appContext.toggleLoader(true);
            const _filter = {
                ...filter
            };
            const url = `${env.coreServices}leaves?year=${year}`;

            const response = await axiosInstance.get(url, {
                headers: {
                    filter: JSON.stringify(_filter),
                    fresh
                }
            });

            let json = await response.data;
            setLeaveLists([]);
            if (json.length > 0) {
                setLeaveLists(json);
            }
            AsyncStorage.setItem(Storages.LEAVE_LIST, JSON.stringify(json));
            appContext.toggleLoader(false);
        } catch (error) {
            appContext.toggleLoader(false);
        }

    }

    const loadFromStorage = async () => {
        const storage = await AsyncStorage.getItem('leavesList');
        if (storage && Storage.length == 0) {
            loadLeavesList();
        }

        if (storage) {
            setLeaveLists(JSON.parse(storage));
        }
    }

    const value = {
        leavesList,
        loadLeavesList,
    };

    return <LeaveListsContext.Provider value={value}>{children}</LeaveListsContext.Provider>

}

export default LeaveHistoryContextProvider;


const logout = async () => {
    try {
        for (let key in Storages) {
            await AsyncStorage.removeItem(Storages[key]);
        }
        await AsyncStorage.clear();

    } catch (error) {
        console.log('Error in logout', error);
    }
}