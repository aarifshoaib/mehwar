import React, { createContext, useState, useContext, useEffect } from "react"; // Make sure to import React
import { AppSharedContext } from "../../shared/redux/app-shared.context";
import { env } from "../../../env/env.dev";
import axios from "axios";
import { AuthContext } from "../../auth/redux/auth.context";
import { LeaveType, RemoteWork } from "../../hr/constants/leave-types.constants";
import axiosInstance from "../../auth/services/axios.interceptor";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Metadata } from "../../shared/models/metadata";
import { AppServicesContext } from "../../home/redux/appServices.context";

export const RemoteWorkContext = createContext({
    remoteWorkTypes: [],
    saveRemoteWork: (leave, files) => { },
    errors: {},
    setErrors: (errors) => { },
    clearState: () => { },
    response: {},
    setResponse: (response) => { },
});

function RemoteWorkContextProvider({ children }) {
    const appContext = useContext(AppSharedContext);
    const authContext = useContext(AuthContext);
    const appServiceCtx = useContext(AppServicesContext);
    const [remoteWorkTypes, setRemoteWorkTypes] = useState([]); // Initialize as an empty array
    const [response, setResponse] = useState({});
    const [errors, setErrors] = useState({});
    const [employer, setEmployer] = useState(null);
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [soaServiceType, setSoaServiceType] = useState(null);

    useEffect(() => {
        appContext.toggleLoader(true);
        getUserInfo();
        setActiveService();
        getRemoteWorkTypes();
    }, []);

    const getUserInfo = async () => {
        try {
            const response = await authContext.user?.workInfo.employer;
            setEmployer(response);
        } catch (error) {
            console.log('getUserInfo', error);
        }
    }

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

    const getRemoteWorkTypes = async () => {
        try {
            appContext.toggleLoader(true);
           const response = await axiosInstance.get(`${env.coreServices}lookups?type=REMOTE_WORK`);
           if (response.data && response.data.length > 0) {
               setRemoteWorkTypes(response.data);
           }
        } catch (error) {
            console.log('getRemoteWorkTypes', error);
        } finally {
            appContext.toggleLoader(false);
        }
    }

    const clearState = () => {
        // setRemoteWorkTypes([]);
        setErrors({});
    }

    const saveRemoteWork = async (leave, attachments) => {
        try {
            if (!employer && !soaServiceType) return false;
            
            let remoteWorkType = "RemoteWorkNormalRequest";
            if(leave.leaveType.value === LeaveType.REMOTE_WORK_SPECIAL) {
                remoteWorkType = "RemoteWorkSpecialRequest";
            }
            const metadata = new Metadata("Mobile", remoteWorkType, "FUSION", soaServiceType);
            let eAttributes = {
                employer,
                personNumber: authContext?.user.workInfo?.personNumber,
            }
            appContext.toggleLoader(true);
            leave = {...leave, ...eAttributes};
            const _payload = { payload: leave, metadata };
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
        remoteWorkTypes,
        saveRemoteWork,
        errors,
        setErrors,
        clearState, 
        response,
        setResponse
    };

    return <RemoteWorkContext.Provider value={value}>{children}</RemoteWorkContext.Provider>;
}

export default RemoteWorkContextProvider;
