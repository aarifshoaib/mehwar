import { createContext, useContext, useEffect, useState, } from "react";
import React from 'react';
import { AuthContext } from "../../auth/redux/auth.context";
import { AppSharedContext } from "../../shared/redux/app-shared.context";
import { env } from "../../../env/env.dev";
import { LeaveRequest, LeaveType } from "../../hr/constants/leave-types.constants";
import axiosInstance from "../../auth/services/axios.interceptor";
import { Metadata } from "../../shared/models/metadata";
import { AppServicesContext } from "../../home/redux/appServices.context";
import { filterStatus } from "../../shared/constants/filterquery";

export const LeaveContext = createContext({
    saveLeave: (leave, attachments, type) => { },
    errors: {},
    setErrors: (errors) => { },
    response: {},
    setResponse: (response) => { },
    replacements: [],
    selectedReplacements: [],
    updatedReplacements: (items) => { },
    searchUsers: (term, signal) => { }
});

function LeaveContextProvider({ children }) {
    const authContext = useContext(AuthContext);
    const appServiceCtx = useContext(AppServicesContext);
    const [leaveTypes, setLeaveTypes] = useState(null);
    const appContext = useContext(AppSharedContext);
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState({});
    const [replacements, setReplacements] = useState([]);
    const [selectedReplacements, setSelectedReplacements] = useState([]);
    const [employer, setEmployer] = useState(null);
    const [soaServiceType, setSoaServiceType] = useState(null);

    useEffect(() => {
        appContext.toggleLoader(true);
        getUserInfo();
        getReplacements();
        setActiveService();
    }, []);

    const updatedReplacements = (items) => {
        setSelectedReplacements(items);
        console.log(items);
    }

    const filtered = (allLeaves, LeaveRequest) => {
        let res = [];
        res = allLeaves.filter(itm => {
            return LeaveRequest.find(elm => {
                return elm.value === itm.value;
            })
        });
        return res;
    };

    const setActiveService = async () => {
        let filtered: any = '';
        filtered = appServiceCtx.appServices.filter((service) => {
            if (service.name == 'Annual Leave') {
                return service;
            }
        })
        if(filtered.length > 0){
            setSoaServiceType(filtered[0].soaServiceType);
        }
    }

    const loadLeaveList = async () => {
        let result = [];
        const response = await axiosInstance.get(`${env.hrServices}request`, {
            headers: {
                filter: JSON.stringify({ type: 'AnnualLeaveRequest', status: filterStatus})
            }
        });
        const leaveList = await axiosInstance.get(`${env.coreServices}leaves?type='AnnualLeaveRequest`);
        result = [...response.data, ...leaveList.data];
        return result;
    }

    const getUserInfo = async () => {
        try {
            //const response = await authContext.loadUser(authContext.user);
            console.log(authContext.user, 'user');
            const response = await authContext.user?.workInfo?.employer;
            console.log(response, 'of profile');
            setEmployer(response);
            return response;
        } catch (error) {
            console.log('getUserInfo', error);
        }
    }


    const loadUsers = async (term, signal) => {
        if(term.length < 4) return [];
        const response = await axiosInstance.get(`${env.coreServices}employees/replacement`, {
            signal: signal,
            headers: {
                Email: term
            }
        }).then((result) => {
            setReplacements(result.data);
        }).catch((error) => {
            return [];
        });
    }

    const getReplacements = async () => {
        try {
            appContext.toggleLoader(true);
            console.log(response, 'replacements');
            setReplacements([]);
        } catch (error) {
            console.log('getReplacements', error);
        } finally {
            appContext.toggleLoader(false);
        }
    }


    const saveLeave = async (leave, attachments, requestType) => {
        try {
            console.log(employer, 'employer');
            appContext.toggleLoader(true);
            if (!employer && !soaServiceType) return false;
            const metadata = new Metadata("Mobile", requestType, "FUSION", soaServiceType);
            let eAttributes = {
                employer,
                personNumber: authContext?.user.workInfo?.personNumber,
            }
            if (leave.leaveType == LeaveType.ANNUAL_LEAVE) {
                leave = { ...leave, ...eAttributes, leaveType: { 'label': 'Annual Leave', 'value': LeaveType.ANNUAL_LEAVE } };
            } else if (leave.leaveType == LeaveType.SICK_LEAVE) {
                leave = { ...leave, ...eAttributes, leaveType: { 'label': 'Sick Leave', 'value': LeaveType.SICK_LEAVE } };
            } else {
                leave = { ...leave, ...eAttributes };
            }
            const _payload = { payload: leave, metadata };
            console.log(_payload, 'payload');
            const formData = new FormData();
            attachments.forEach((file, index) => {
                const xFile = {
                    uri: file.uri,
                    type: 'image/jpeg',
                    name: file.fileName
                };
                formData.append("files", xFile as any);
            });
            formData.append('data', JSON.stringify(_payload));
            const url = `${env.coreServices}request`;
            const response = await axiosInstance.post(`${url}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('this is the response', response);

            appContext.toggleLoader(false);
            return response;
        } catch (error) {
            appContext.toggleLoader(false);
            console.log('this is unexpected', error);
            setResponse(error);
        }

    }


    const value = {
        leaveTypes,
        saveLeave,
        errors,
        setErrors,
        response,
        setResponse,
        replacements,
        selectedReplacements,
        updatedReplacements,
        searchUsers: loadUsers,
    };

    return <LeaveContext.Provider value={value}>{children}</LeaveContext.Provider>
};


export default LeaveContextProvider;
