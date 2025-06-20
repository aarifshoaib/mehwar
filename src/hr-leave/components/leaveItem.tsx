import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import moment from "moment";
import { lightenColor, darkenColor, theme } from "../../shared/theme";
import { appImages } from "../../shared/constants/images";
import IbtikarStatus from "../../ibtikar/components/ibtikar-status";
import { mainStyle } from "../../shared/main-style";
import { LeaveType } from "../../hr/constants/leave-types.constants";
import Flag from 'react-native-flags';
import { IconButton } from "../../shared/ui/buttons";

const LeaveItem = ({ data, index, children = <></> }) => {
    const checkHoliday = () => {
        if (data && data.item) {
            if (['Saturday', 'Sunday'].includes(data.item.dayName)) {
                return true;
            }
        }
        return false;
    }

    const getColors = (status) => {
        let result;
        switch (status) {
            case 'APPROVED':
                result = styles.approvedStatus;
                break;
            case 'REJECTED':
                result = styles.rejectedStatus
                break;
            case 'INITIATED':
                result = styles.defaultStatus
                break;
            case 'FAILED':
                result = styles.failedStatus
                break;
            case 'AWAITING':
                result = styles.pendingStaus
                break;
            default:
                result = styles.defaultStatus
                break;
        }

        return result;
    }
    const getTotalDays = () => {
        const dateFrom = moment(data.requestDetails.fromDate);
        const dateTo = moment(data.requestDetails.toDate);
        return dateTo.diff(dateFrom, 'days') + 1;
    }
    const recordDetails = (item) => {
        console.log(item);
        Alert.alert(item.soaMessage);
    }

    const getLeaveType = () => {
        let result = data?.requestDetails.leaveType.label;

        if (data?.requestDetails.leaveType.value == LeaveType.SICK_LEAVE_PAID) {
            result = 'Sick Leave';
        } else if (data?.requestDetails.leaveType.value == LeaveType.ANNUAL_LEAVE) {
            result = 'Annual Leave';
        }
        else if (data?.requestDetails.leaveType.value == LeaveType.SPECIAL_ESCORT_LEAVE) {
            result = 'Escort Leave';
        } else if (data?.requestDetails.leaveType.value == LeaveType.COMPASSIONATE_LEAVE) {
            result = 'Compassionate';
        } else if (data?.requestDetails.leaveType.value == LeaveType.REMOTE_WORK) {
            result = 'Remote Normal';
        } else if (data?.requestDetails.leaveType.value == LeaveType.REMOTE_WORK_SPECIAL) {
            result = 'Remote Special';
        } else if (data?.requestDetails.leaveType.value == LeaveType.BUISINESS_TRIP_INTERNATIONAL) {
            result = 'International';
        }
        return result;
    }
    return (
        <View style={[styles.container, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <View>
                <View style={[!checkHoliday() ? styles.weekday : styles.weekend, styles.calendarDay]}>
                    <Text style={styles.weekdayTextDay}>{getTotalDays()}</Text>
                    <Text style={styles.weekdayTextMonth}>Days</Text>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <View style={[mainStyle.row, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row' }}>
                        {data.serviceName != 'AttendanceReqularizationRequest' && <><Text style={styles.title}>{getLeaveType()}</Text></>}
                        {data.serviceName == 'AttendanceReqularizationRequest' && children}
                        <View style={mainStyle.whiteChip}>
                            <IbtikarStatus item={undefined} color={getColors(data?.status)} />
                            <Text style={styles.status}>{data?.status}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end', }}><Text style={{ fontSize: 11, color: '#6F6F6F' }}>{moment(data?.createdAt).format('DD-MMM-YYYY hh:mm')}</Text></View>
                </View>
                {/* <View style={[mainStyle.row, { justifyContent: 'space-between' }]}>
                    <View style={mainStyle.row}>
                        <Image source={appImages.absense} style={styles.calendarIcon} />
                        <Text style={{ fontSize: 11, color: '#5D5757', fontFamily: theme.fontFamilyMedium }}>{moment(data.requestDetails.fromDate).format('DD-MMM-YYYY')}</Text>
                        {(data.requestDetails.toDate != data.requestDetails.fromDate) && <View><Text style={{ fontSize: 12, color: '#5D5757', fontFamily: theme.fontFamilyMedium }}> - </Text></View>}
                        {(data.requestDetails.toDate != data.requestDetails.fromDate) && <View><Text style={{ fontSize: 11, color: '#5D5757', fontFamily: theme.fontFamilyMedium }}>{moment(data.requestDetails.toDate).format('DD-MMM-YYYY')}</Text></View>}
                    </View>
                </View> */}
                <View style={[mainStyle.row, { justifyContent: 'space-between' }]}>
                    <View style={mainStyle.row}>
                        <Image source={appImages.absense} style={styles.calendarIcon} />
                        <Text style={{ fontSize: 11, color: '#5D5757', fontFamily: theme.fontFamilyMedium }}>{moment(data.requestDetails.fromDate).format('DD-MMM-YYYY')}</Text>
                        {(data.requestDetails.toDate != data.requestDetails.fromDate) && <View><Text style={{ fontSize: 12, color: '#5D5757', fontFamily: theme.fontFamilyMedium }}> - </Text></View>}
                        {(data.requestDetails.toDate != data.requestDetails.fromDate) && <View><Text style={{ fontSize: 11, color: '#5D5757', fontFamily: theme.fontFamilyMedium }}>{moment(data.requestDetails.toDate).format('DD-MMM-YYYY')}</Text></View>}
                    </View>
                    {data.soaStatus == 'FAILED' &&
                        <View>
                            <View>
                                <IconButton type={'feather'} name={'alert-octagon'} color={theme.dangerDark} size={20} style={{ bottom: 4, position: 'relative' }} onclick={() => recordDetails(data)} />
                            </View>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
}



export default LeaveItem;

const styles = StyleSheet.create({
    container: {

        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        marginBottom: 10
    },
    title: {
        fontFamily: theme.fontFamilyMedium,
        color: darkenColor(theme.primary, 0.1),
        fontSize: 13,
        marginEnd: 5
    },
    status: {
        marginStart: 5,
        fontFamily: theme.fontFamily,
        fontSize: 10,
        color: '#727272',
        textTransform: 'capitalize'
    },
    evenRow: {
        backgroundColor: '#F5FBFF',
        borderColor: '#DDECFC',
    },
    oddRow: {
        backgroundColor: '#fff',
        borderColor: '#D4E6F4',
    },
    punchingRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    weekday: {
        backgroundColor: theme.primary,
        borderColor: '#D5E7FC'
    },
    weekdayTextDay: {
        color: '#fff',
        fontSize: 20
    },
    weekdayTextMonth: {
        color: '#fff',
        fontSize: 12,
        // textTransform: 'capitalize',
        marginBottom: 2

    },
    weekdayTextYear: {
        color: '#fff',
        fontSize: 15
    },
    weekend: {
        backgroundColor: '#A7A7A7',
        borderColor: '#C3C3C3'
    },
    calendarDay: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 10,
        borderWidth: 3,
    },
    calendarIcon: {
        marginEnd: 5,
        width: 17,
        height: 19,
        tintColor: theme.primary
    },
    approvedStatus: {
        backgroundColor: '#a0d468',
    },
    rejectedStatus: {
        backgroundColor: '#f7b2b2',

    },
    failedStatus: {
        backgroundColor: theme.danger,

    },
    defaultStatus: {
        backgroundColor: '#ccc',
    },
    pendingStaus: {
        backgroundColor: '#f8c471',
    }
})