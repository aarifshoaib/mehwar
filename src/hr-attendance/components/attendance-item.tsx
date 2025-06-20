import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { lightenColor, theme } from '../../shared/theme'
import moment from 'moment';
import { appImages } from '../../shared/constants/images';
import AppIcon from '../../shared/ui/icons';
import IbtikarStatus from '../../ibtikar/components/ibtikar-status';
import { toCamelCase, toTitleCase } from '../../shared/helpers/string.helper';
import { mainStyle } from '../../shared/main-style';
const AttendanceItem = ({ data }) => {
    const checkHoliday = () => {
        if (data && data.item) {
            if (['Saturday', 'Sunday'].includes(data.item.dayName)) {
                return true;
            }
        }
        return false;
    }
    return (
        <View style={[styles.container, data.index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <View>
                <View style={[!checkHoliday() ? styles.weekday : styles.weekend, styles.calendarDay]}>
                    <Text style={styles.weekdayTextYear}>{moment(data?.item?.attendanceDate).format('ddd')}</Text>
                    <Text style={styles.weekdayTextDay}>{moment(data?.item?.attendanceDate).format('DD')}</Text>
                    <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
                        <Text style={styles.weekdayTextMonth}>{moment(data?.item?.attendanceDate).format('MMM')} {moment(data?.item?.attendanceDate).format('YYYY')}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.punchingColumn}>
                    <View style={styles.punchingRow}>
                        <Image source={appImages.login} style={[{ width: 13.84, height: 14.17 }, (checkHoliday() ? { tintColor: '#ccc' } : null)]} />
                        <Text style={[styles.timing, (checkHoliday()) ? styles.holidayText : styles.workingDayText]}>{data?.item.inTime && moment(data?.item?.inTime).format('hh:mm A') || '--:--'}</Text>
                    </View>
                    <View style={styles.punchingRow}>
                        <Image source={appImages.location} style={[{ width: 11, height: 16.5 }, (checkHoliday() ? { tintColor: '#ccc' } : null)]} />
                        <Text style={[styles.timing, (checkHoliday()) ? styles.holidayText : styles.workingDayText]}>{data?.item?.punchInLocation == 'Remote Attendance Portal' ? 'Remote' : data?.item?.punchInLocation || '-'}</Text>
                    </View>
                </View>
                <View style={styles.punchingColumn}>
                    <View style={styles.punchingRow}>
                        <Image source={appImages.logout} style={[{ width: 13.84, height: 14.17 }, , (checkHoliday() ? { tintColor: '#ccc' } : null)]} />
                        <Text style={[styles.timing, (checkHoliday()) ? styles.holidayText : styles.workingDayText]}>{data.item.inTime && moment(data.item?.outTime).format('hh:mm A') || '--:--'}</Text>
                    </View>
                    <View style={styles.punchingRow}>
                        <Image source={appImages.location} style={[{ width: 11, height: 16.5 }, (checkHoliday() ? { tintColor: '#ccc' } : null)]} />
                        <Text style={[styles.timing, (checkHoliday()) ? styles.holidayText : styles.workingDayText]}>{data?.item?.punchOutLocation == 'Remote Attendance Portal' ? 'Remote' : data?.item?.punchOutLocation || '-'}</Text>
                    </View>
                </View>
                <View style={[styles.punchingColumn, { alignItems: 'flex-end' }]}>
                    <View style={mainStyle.whiteChip}>
                        <AppIcon type={'material'} name={'clock-check-outline'} color={theme.primary} size={16} />
                        <Text style={[styles.timing, (checkHoliday()) ? styles.holidayText : styles.workingDayText]}>{data.item.duration}</Text>
                    </View>
                    {data?.item?.leaveType && data?.item?.leaveType !== 'None' && (
                    <View style={styles.whiteChip}>
                        <IbtikarStatus item={undefined} color={{ backgroundColor: 'lightblue' }} />
                        <Text style={styles.status}> {data?.item?.leaveType}</Text>
                    </View>
                    )}
                 
                </View>
            </View>
        </View>
    )
}

export default AttendanceItem

const styles = StyleSheet.create({
    container: {

        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        marginBottom: 10
    },
    evenRow: {
        backgroundColor: '#F5FBFF',
        borderColor: '#DDECFC',
    },
    oddRow: {
        backgroundColor: '#fff',
        borderColor: '#D4E6F4',
    },
    status: {
        fontSize: 10
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
    duration: {
        justifyContent: 'center'
    },
    punchingColumn: {
        justifyContent: 'space-around',
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    punchingRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    holidayText: {
        color: '#ccc'
    },
    workingDayText: {
        color: '#4a4a4a'
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
        fontSize: 10,
        // textTransform: 'capitalize',
        marginBottom: 2

    },
    weekdayTextYear: {
        color: '#fff',
        fontSize: 12
    },
    weekend: {
        backgroundColor: '#A7A7A7',
        borderColor: '#C3C3C3'
    },
    timing: {
        fontSize: 12,
        marginStart: 5
    },
    whiteChip: {
        backgroundColor: '#fff',
        borderColor: '#DEECFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
    }
})