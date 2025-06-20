import { createContext, useContext, useState, useEffect } from "react";
import React from 'react';
import { AuthContext } from "../../auth/redux/auth.context";
import { AppSharedContext } from "../../shared/redux/app-shared.context";
import { env } from "../../../env/env.dev";
import axiosInstance from "../../auth/services/axios.interceptor";

export const AttendanceListsContext = createContext({
    attendanceList: [],
    attendanceRequests: [],
    loadAttendanceList: (year, month) => { },
    loadAttendanceRequests: (year, filter, fresh) => { },
    unaluthrizedAttendanceList: [],
    loadUnauthorizedAttendanceList: (payload) => { }
});


function AttendanceHistoryContextProvider({ children }) {

    const authContext = useContext(AuthContext);
    const appContext = useContext(AppSharedContext);
    const [attendanceList, setAttendanceList] = useState([]);
    const [attendanceRequests, setAttendanceRequests] = useState([]);
    const [unaluthrizedAttendanceList, setUnaluthrizedAttendanceList] = useState([]);

    const loadAttendanceRequests = async (year: string = new Date().getFullYear().toString(), filter, fresh) => {
        try {
            appContext.toggleLoader(true);
            
            const url = `${env.coreServices}leaves?year=${year}`;

            const response = await axiosInstance.get(url, {
                headers: {
                    filter: JSON.stringify(filter),
                    fresh
                }
            });

            let json = await response.data;
            setAttendanceRequests([]);
            if (json.length > 0) {
                setAttendanceRequests(json);
            }
            appContext.toggleLoader(false);
        } catch (error) {
            appContext.toggleLoader(false);
        }
    }

    const loadAttendanceList = async (payload: { year: number, month: number }) => {
        try {
            appContext.toggleLoader(true);
            console.log(payload.year, payload.month, 'payload');
            const response = await axiosInstance.get(`${env.coreServices}attendance?year=${payload.year}&month=${payload.month}`);

            const json = response.data;

            //setAttendanceList([]);
            if (json.length > 0) {
                setAttendanceList(json);
            }
            appContext.toggleLoader(false);
        } catch (error) {
            appContext.toggleLoader(false);
        }
    }

    const loadUnauthorizedAttendanceList = async (payload: { year: number, month: number }) => {
        try {
            console.log(payload, 'payload');
            appContext.toggleLoader(true);
            console.log(`${env.coreServices}attendance/unauthorize?year=${payload.year}`);
            const response = await axiosInstance.get(`${env.coreServices}attendance/unauthorize?year=${payload.year}`);

            const json = response.data;

            setUnaluthrizedAttendanceList([]);
            if (json.length > 0) {
                setUnaluthrizedAttendanceList(json);
            }
            
            appContext.toggleLoader(false);
        } catch (error) {
            appContext.toggleLoader(false);
        }
    }

    const value = {
        attendanceList,
        attendanceRequests,
        loadAttendanceRequests,
        loadAttendanceList,
        unaluthrizedAttendanceList,
        loadUnauthorizedAttendanceList
    };

    return <AttendanceListsContext.Provider value={value}>{children}</AttendanceListsContext.Provider>

}

export default AttendanceHistoryContextProvider;