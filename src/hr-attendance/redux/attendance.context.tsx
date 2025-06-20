import { createContext, useEffect, useState, useContext } from "react";
import React from 'react';
import { AppSharedContext } from "../../shared/redux/app-shared.context";
import { AuthContext } from '../../auth/redux/auth.context';
import { env } from "../../../env/env.dev";
import axios from "axios";
import axiosInstance from "../../auth/services/axios.interceptor";
import { LeaveType } from "../../hr/constants/leave-types.constants";
import { Metadata } from "../../shared/models/metadata";
import { AppServicesContext } from "../../home/redux/appServices.context";

export const AttendanceContext = createContext({
    attendances: [],
    saveAttendance: (attendance, files) => { },
    errors: {},
    setErrors: (errors) => { },
    response: {},
    setResponse: (response) => { },
    reasons: []
});

function AttendanceContextProvider({ children }) {
    const appServiceCtx = useContext(AppServicesContext);
    const appContext = useContext(AppSharedContext);
    const authContext = useContext(AuthContext);
    const [attendances, setAttendances] = useState([]);
    const [errors, setErrors] = useState({});
    const [employer, setEmployer] = useState('');
    const [response, setResponse] = useState({});
    const [reasons, setReasons] = useState([]);
    const [soaServiceType, setSoaServiceType] = useState(null);

    useEffect(() => {
        appContext.toggleLoader(true);
        getUserInfo();
        setActiveService();
        getReasons();

    }, []);


    const setActiveService = async () => {
        let filtered: any = '';
        filtered = appServiceCtx.appServices.filter((service) => {
            if (service.name == 'Missing Attendance') {
                return service;
            }
        })
        if(filtered.length > 0){
            setSoaServiceType(filtered[0].soaServiceType);
        }
    }


    const saveAttendance = async (leave, attachments) => {
        try {
            appContext.toggleLoader(true);
            const metadata = new Metadata("Mobile", "AttendanceReqularizationRequest", "FUSION", soaServiceType);
            let eAttributes = {
                employer,
                personNumber: authContext?.user.workInfo?.personNumber,
            };
            leave = { ...leave,  ...eAttributes, leaveType: {'label': 'Attendance Regularization', 'value': LeaveType.ATTENDANCE_REGULARIZATION} };
            const _payload = { payload: leave, metadata };
            console.log('payload', _payload);
            const formData = new FormData();

            attachments.forEach((file, index) => {

                const xFile = {
                    uri: file.uri,
                    type: file.type,
                    name: file.fileName
                };
                formData.append("files", xFile as any);
            });
            formData.append('data', JSON.stringify(_payload));
            const url = `${env.coreServices}request`;
            const response = await axiosInstance.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                }
            });
            appContext.toggleLoader(false);
            return response;
        } catch (error) {
            appContext.toggleLoader(false);
            console.log('this is unexpected', error);
            setResponse(error);
        }


    }

    const getReasons = async () => {
        try {
            const response = await axiosInstance.get(`${env.coreServices}lookups?type=ATTENDANCE_REGULARIZATION_REASONS`);
            if (response.data && response.data.length > 0) {
                setReasons(response.data);
            }
        } catch (error) {
            console.log('getReasons', error);
        } finally {
            appContext.toggleLoader(false);
        }
    }
    const getUserInfo = async () => {
        try {
            const response = await authContext.user?.workInfo.employer;
            setEmployer(response);
            return response;
        } catch (error) {
            console.log('getUserInfo', error);
        }
    }

    const values = {
        attendances,
        saveAttendance,
        errors,
        setErrors,
        response,
        setResponse,
        reasons
    }
    return (
        <AttendanceContext.Provider value={values}>
            {children}
        </AttendanceContext.Provider>
    )
}

export default AttendanceContextProvider;