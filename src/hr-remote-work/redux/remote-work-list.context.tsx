import { createContext, useContext, useState, useEffect } from "react";
import React from 'react';
import { AuthContext } from "../../auth/redux/auth.context";
import { AppSharedContext } from "../../shared/redux/app-shared.context";
import { env } from "../../../env/env.dev";
import axiosInstance from "../../auth/services/axios.interceptor";
import { filterStatus } from "../../shared/constants/filterquery";

export const RemoteWorkListsContext = createContext({
    leavesList: [],
    loadLeavesList: (year?: string, filter?: any, fresh?: string) => { }
});


function RemoteWorkHistoryContextProvider({ children }) {

    const authContext = useContext(AuthContext);
    const appContext = useContext(AppSharedContext);
    const [leavesList, setLeaveLists] = useState([]);
    


    const loadLeavesList = async (year: string = new Date().getFullYear().toString(), filter, fresh) => {
        try {
            appContext.toggleLoader(true);
            const _filter = {
                ...filter, ...{ createdBy: authContext?.user?.mail, status: 'INITIATED',serviceGroup: 'Remote Work',serviceName: 'RemoteWorkRequest' }
            };
            const url = `${env.coreServices}leaves?year=${year}`;

            const response = await axiosInstance.get(url, {
                headers: {
                    filter: JSON.stringify(filter),
                    fresh
                }
            });

            let json = await response.data;
            setLeaveLists([]);
            if (json.length > 0) {
                setLeaveLists(json);
            }
            appContext.toggleLoader(false);
        } catch (error) {
            appContext.toggleLoader(false);
        }
    }


    const value = {
        leavesList,
        loadLeavesList
    };

    return <RemoteWorkListsContext.Provider value={value}>{children}</RemoteWorkListsContext.Provider>

}

export default RemoteWorkHistoryContextProvider;