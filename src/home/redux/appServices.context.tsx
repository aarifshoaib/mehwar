import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { env } from "../../../env/env.dev";
import React from 'react';
import axios from "axios";
import axiosInstance from "../../auth/services/axios.interceptor";
import { AuthContext } from "../../auth/redux/auth.context";

export const AppServicesContext = createContext({
    appServices: [],
    servicesType: '',
    entities: [],
    toggleLoader: (value: boolean) => { },
    changeTab: (title: string) => { },
    setRefreshing: (cnt: number) => { },
    refresh: 0,
    loader: false,

})


const AppServicesContextProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);
    const [appServices, setAppServices] = useState([]);
    const [entities, setEntities] = useState([]);
    const [servicesType, setServicesType] = useState('Favorite');
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const changeTab = (title) => {
        setServicesType(title);
    }


    // useEffect(() => {
    //     if (servicesType) {
    //         fetchData(servicesType);
    //     }
    // }, [servicesType, refresh]);



    const toggleLoader = (value) => {
        console.log('toggleLoader', value);
        setLoader(value);
    }

    const setRefreshing = (cnt) => {
        setRefresh(cnt);
    }

    const setformLoading = (value) => {
        setLoading(value);
    }

    const fetchData = async (type = '', value = '') => {
        setLoading(true);
        try {
            let arrayData = [];
            const getURL = `${env.coreServices}services`;
            const result = await axiosInstance.get(getURL);
            if (result.data && result.data.length > 0) {
                arrayData = result.data.filter((service: any) => service.active === true)
                .sort((a: any, b: any) => a.seq - b.seq);
                setAppServices(arrayData);
            } else {
                setAppServices([]);
            }

        } catch (error) {
            console.log('error in fetch data', error);
            console.log('error in fetch data all services', error);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        servicesType,
        appServices,
        entities,
        changeTab,
        toggleLoader,
        setRefreshing,
        refresh,
        loader,
        loading,

    }

    return (
        <AppServicesContext.Provider value={value}>
            {children}
        </AppServicesContext.Provider>
    )
}

export default AppServicesContextProvider;