import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { theme } from '../../shared/theme'
import moment from 'moment'
import ModalSheet from '../../shared/components/modal-sheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import PunchingModal from './punching-modal'
import authContext from '../../auth/redux/auth.context'
import PunchingModalWrapper from './punching-modal'
import PunchingContextProvider, { PunchingContext } from '../redux/punching.context';
import { appImages } from '../../shared/constants/images'


const PunchingWrapper = ({ navigation }) => {
    return (
        <Punching navigation={navigation} />


    )
}



const Punching = ({ navigation }) => {
    const punchingContext = useContext(PunchingContext);
    const [punchInTime, setPunchInTime] = useState(null);
    const navigateToHistory = (screen, data = '') => {
        navigation.navigate(screen, { data });
    }
    useEffect(() => {
        if (punchingContext.punchinTime != null && punchingContext.punchinTime != punchInTime) {
            setPunchInTime(punchingContext.punchinTime);
        }
    }, [punchingContext.punchinTime])

    return (

        <PunchingContextProvider>
            <View style={styles.tileContainer}>
                <TouchableOpacity onPress={() => navigateToHistory('AttendanceReportNavigation', 'attendance')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={appImages.timein} style={{ width: 30, height: 30 }} />
                    {punchingContext.punchinTime != null && <Text style={[styles.tileNumber]}> {moment.utc(punchingContext.punchinTime, "DD-MMM-YYYY HH:mm:ss", true).format('hh:mm')}</Text>}
                    {punchingContext.punchinTime == null && <Text style={[styles.tileNumber, { marginTop: 10 }]}>--:--</Text>}
                    <Text style={[styles.tileTitle]}>Attendance</Text>
                </TouchableOpacity>
            </View>
        </PunchingContextProvider>

    )
}

export default PunchingWrapper

const styles = StyleSheet.create({
    tileContainer: {
        paddingTop: 10,
        flex: 1,
        width: 60,
        borderRadius: 20,
        height: 130,
        backgroundColor: theme.primary,//'rgba(57,115,168,.66)',
        margin: 5,
        borderWidth: 4,
        borderColor: '#DDECF8',
        alignItems: 'center',
        shadowColor: '#000',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    tileNumber: {
        fontSize: 25,
        color: '#fff',
        fontFamily: 'AdportsThin',
        textShadowColor: 'rgba(255,255,255,.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
        marginVertical: 5
        // backgroundColor: 'pink'
    },
    tileTitle: {
        fontFamily: 'AdportsRegular',
        fontSize: 12,
        flex: 1,
        color: '#fff',
        textAlign: 'center',
    },
    tileFontStyle: {
        color: '#3E5D7B',
        textShadowColor: 'rgba(255,255,255,.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    subTitleTile: {
        fontSize: 20,
        color: '#3E5D7B',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 1,
        textShadowColor: 'rgba(255,255,255,.5)',
    },
})