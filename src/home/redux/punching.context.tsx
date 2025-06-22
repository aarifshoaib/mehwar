import moment from "moment";
import React, { createContext, useEffect, useState, useContext } from "react";
import { env } from "../../../env/env.dev";
import { AuthContext } from "../../auth/redux/auth.context";
import axios, { all } from "axios";
import axiosInstance from "../../auth/services/axios.interceptor";
import { AttendanceListsContext } from "../../hr-attendance/redux/attendance-list.context";

export const PunchingContext = createContext({
    punchin: false,
    allowRemote: false,
    punchout: null,
    attendanceHistory: [],
    totalHours: 0,
    punchinTime: null,
    punchoutTime: null,
    doPunch: async (value: any, type: string) => false,
    allowRemoteCheckin: async () => { }
});

const PunchingContextProvider = ({ children }) => {
    const [punchin, setPunchin] = useState(null);
    const [allowRemote, setAllowRemote] = useState(false);
    const [punchout, setPunchout] = useState(null);
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [totalHours, setTotalHours] = useState(9);
    const authContext = useContext(AuthContext);
    const attendanceCtx = useContext(AttendanceListsContext);
    const [punchinTime, setPunchinTime] = useState(null);
    const [punchoutTime, setPunchoutTime] = useState(null);


    // useEffect(() => {
    //     allowRemoteCheckin();
    // }, []);

    useEffect(() => {
        //const total = moment(moment.utc(punchoutTime, "DD-MMM-YYYY HH:mm:ss", true), 'h:mm A').diff(moment(moment.utc(punchinTime, "DD-MMM-YYYY HH:mm:ss", true), 'h:mm A'), 'hours', true);
        const total = moment.utc(punchoutTime, "DD-MMM-YYYY HH:mm:ss", true)
            .diff(moment.utc(punchinTime, "DD-MMM-YYYY HH:mm:ss", true), 'hours', true);
        const totalHrs = parseFloat(total.toFixed(2));
        setTotalHours(totalHrs);
    }, [punchinTime, punchoutTime]);

    const allowRemoteCheckin = async () => {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const today = now.toISOString().split("T")[0];

            // Call both APIs in parallel
            const [remoteRes, attendanceRes] = await Promise.all([
                axiosInstance.get(`${env.coreServices}remote/remoteworkallowed`, {
                    headers: { 'user': authContext.user?.samAccount }
                }),
                axiosInstance.get(`${env.coreServices}attendance?year=${year}&month=${month}`)
            ]);
            console.log(remoteRes, 'remoteRes');
            console.log(attendanceRes, 'attendanceRes');
            // Remote API
            const remoteStatus = remoteRes.data?.Status;
            const remoteData = remoteRes.data?.Result;
            const remoteIn = remoteData?.EmpPunchInTime || null;
            const remoteOut = remoteData?.EmpPunchOutTime || null;
            const validationFlag = remoteData?.ValidationFlag?.toLowerCase();
            console.log(remoteIn, 'remoteIn');
            console.log(remoteOut, 'remoteOut');
            console.log(validationFlag, 'validationFlag');
            // Attendance API
            const records = attendanceRes.data || [];
            const todayRecord = records.find(record =>
                record.attendanceDate?.split("T")[0] === today && record.inTime
            );
            const attendanceIn = todayRecord ? todayRecord.inTime : null;
            const attendanceOut = todayRecord ? todayRecord.outTime : null;
            const attendanceInParsed = await formatDate(attendanceIn);
            const attendanceOutParsed = await formatDate(attendanceOut);
            // Find the earliest in time
            let earliestIn = null;
            if (remoteIn && attendanceIn) {
                // Use moment to parse and compare
                const remoteMoment = moment(remoteIn, "DD-MMM-YYYY HH:mm:ss");
                const attendanceMoment = moment(attendanceInParsed, "DD-MMM-YYYY HH:mm:ss"); // adjust format if needed
                earliestIn = remoteMoment.isBefore(attendanceMoment) ? remoteIn : attendanceInParsed;
            } else if (remoteIn) {
                earliestIn = remoteIn;
            } else if (attendanceInParsed) {
                earliestIn = attendanceInParsed;
            } else {
                earliestIn = null;
            }
            console.log(earliestIn, 'earliestIn');
            if (earliestIn) {
                earliestIn = earliestIn;
            }
            // Set allowRemote
            setAllowRemote(validationFlag === 'allow' && remoteStatus === 'SUCCESS');

            // Set punchinTime and punchoutTime
            if (earliestIn) {
                setPunchinTime(earliestIn);
                // Set punchoutTime if available (prefer remote out, else attendance out)
                if (remoteOut || attendanceOutParsed) {
                    const outTime = remoteOut || attendanceOutParsed;
                    setPunchoutTime(outTime);
                    // setPunchin(false);
                    // setPunchout(false);
                } else {
                    setPunchin(false);
                }
            } else {
                setPunchin(true);
            }
        } catch (error) {
            setAllowRemote(false);
            console.error("Remote check-in error:", error);
        }
    };


    // const allowRemoteCheckin = async () => {
    //     try {
    //         const now = new Date();
    //         const year = now.getFullYear();
    //         const month = now.getMonth();
    //         const today = now.toISOString().split("T")[0];

    //         const getURL = `${env.coreServices}remote/remoteworkallowed`;
    //         const result = await axiosInstance.get(getURL, {
    //             headers: { 'user': authContext.user?.samAccount }
    //         });

    //         const status = result.data?.Status;
    //         const remoteData = result.data?.Result;

    //         if (status !== 'SUCCESS') {
    //             setAllowRemote(false);
    //             await loadTodayAttendance(year, month, today);
    //             return;
    //         }

    //         const validationFlag = remoteData?.ValidationFlag?.toLowerCase();
    //         const empIn = remoteData?.EmpPunchInTime;
    //         const empOut = remoteData?.EmpPunchOutTime;

    //         if (validationFlag === 'allow') {
    //             setAllowRemote(true);
    //         } else {
    //             setAllowRemote(false);
    //         }

    //         if (empIn && empOut) {
    //             setPunchinTime(empIn);
    //             setPunchoutTime(empOut);
    //             setPunchin(false);
    //             setPunchout(false);
    //             return;
    //         }

    //         if (empIn && !empOut) {
    //             setPunchinTime(empIn);
    //             setPunchin(false);
    //             return;
    //         }

    //         if (!empIn) {
    //             await loadTodayAttendance(year, month, today);
    //         }

    //     } catch (error) {
    //         setAllowRemote(false);
    //         console.error("Remote check-in error:", error);
    //     }
    // };

    // const loadTodayAttendance = async (year, month, today) => {
    //     try {
    //         const response = await axiosInstance.get(`${env.coreServices}attendance?year=${year}&month=${month}`);
    //         const records = response.data || [];

    //         const todayRecord = records.find(record =>
    //             record.attendanceDate?.split("T")[0] === today && record.inTime
    //         );
    //         console.log(todayRecord, 'todayRecord');
    //         if (todayRecord) {
    //             const inTime = await formatDate(todayRecord.inTime);
    //             const outTime = todayRecord.outTime ? await formatDate(todayRecord.outTime) : null;

    //             setPunchinTime(inTime);
    //             setPunchoutTime(outTime);
    //             setPunchin(false);
    //         } else {
    //             setPunchin(true);
    //         }
    //     } catch (error) {
    //         console.error("Attendance fetch error:", error);
    //     }
    // };


    async function formatDate(dateString) {
        console.log(dateString, 'dateString');
        if (!dateString) {
            return null;
        }
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, "0"); // Day with leading zero
        const month = months[date.getMonth()]; // Get month abbreviation
        const year = date.getFullYear(); // Full year
        const hours = String(date.getHours()).padStart(2, "0"); // Hours with leading zero
        const minutes = String(date.getMinutes()).padStart(2, "0"); // Minutes with leading zero
        const seconds = String(date.getSeconds()).padStart(2, "0"); // Seconds with leading zero

        return await `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    const doPunch = async (value, type) => {
        try {
            let url = '';
            if (!allowRemote && type === 'Out') {
                return false;
            }
            if (type === 'In') {
                url = `${env.coreServices}remote/punchin`;
            } else {
                url = `${env.coreServices}remote/punchout`;
            }
            const responseServices = await axiosInstance.get(url, {
                headers: {
                    'user': authContext.user?.samAccount
                },
            });
            await allowRemoteCheckin();
            // if (type === 'In') {
            //     setPunchin(false);
            //     setPunchinTime(responseServices.data.Result.EmpPunchInTime);
            // } else {
            //     setPunchoutTime(responseServices.data.Result.EmpPunchOutTime);
            //     setPunchout(true);
            // }
            return true;

        } catch (error) {
            console.log('error in posting dopunching', error);
            return false;
        }


    }


    const value = {
        punchin,
        allowRemote,
        doPunch,
        punchout,
        attendanceHistory,
        totalHours,
        punchinTime,
        punchoutTime,
        allowRemoteCheckin
    };
    return (
        <PunchingContext.Provider value={value}>
            {children}
        </PunchingContext.Provider>
    )
};

export default PunchingContextProvider;
