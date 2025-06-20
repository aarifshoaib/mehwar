import { createContext, useState } from "react";
import React from 'react';
import { env } from "../../../env/env.dev";
import axiosInstance from "../../auth/services/axios.interceptor";



export const AppSharedContext = createContext({
    toggleLoader: (value: boolean) => { },
    pushToken: null,
    setToken: (psuhToken) => { },
    loader: false,
    absences: [],
    loadAbsences: () => { }
});

const AppSharedContextProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);
    const [absences, setAbsences] = useState(null);
    const [pushToken, setPushToken] = useState(null);
    const toggleLoader = (value) => {
        setLoader(value);
    }

    const loadAbsences = async () => {
        setLoader(true);
        try {
            const getURL = `${env.coreServices}leaves/system`;
            const result = await axiosInstance.get(getURL);

            if (result.data && result.data.length > 0) {
                const formatedArray = formatAbsences(result.data);
                setAbsences(formatedArray);
            } else {
                setAbsences([]);
            }

        } catch (error) {
            console.log('error in fetch data', error);
            console.log('error in fetch data all services', error);
        } finally {
            setLoader(false);
        }
    }

    const setToken = (ps) =>{
        setPushToken(ps);
        console.log('tokenPushed', ps);
    }

    const formatAbsences = (absences) => {
        let arrayData = {};
        absences.forEach((absence) => {
            if (!arrayData[absence.serviceGroup]) {
                arrayData[absence.serviceGroup] = [];
            }
            arrayData[absence.serviceGroup].push(absence);

        });
        return arrayData;
    }


    const value = {
        toggleLoader,
        loader,
        absences,
        loadAbsences,
        pushToken,
        setToken
    };

    return <AppSharedContext.Provider value={value}>{children}</AppSharedContext.Provider>

}

export default AppSharedContextProvider;
