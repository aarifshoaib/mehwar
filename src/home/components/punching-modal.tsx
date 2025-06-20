import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, AppState } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import Clock from './clock'
import PunchingContextProvider, { PunchingContext } from '../redux/punching.context';
import { appImages } from '../../shared/constants/images';
import { darkenColor, lightenColor, theme } from '../../shared/theme';
import { AuthContext } from '../../auth/redux/auth.context';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications'


const PunchingModalWrapper = () => {
    return (
        <PunchingModal />
    )
}

const PunchingModal = () => {
    const punchingContext = useContext(PunchingContext);
    const authContext = useContext(AuthContext);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());
    const appState = useRef(AppState.currentState);
    const [isAppActive, setIsAppActive] = useState(true);
    const toast = useToast();

    useEffect(() => {
        console.log('Punching Context:', 'im Changes', punchingContext.punchinTime);
    }, [punchingContext.punchinTime, punchingContext.punchoutTime, punchingContext.totalHours]);

    const doPunch = async (type) => {
        // if (punchingContext.punchinTime && type == 'In') {
        //     toast.show(`Already punched in!`, {
        //         type: "danger",
        //     });
        //     return;
        // }
        const result = await punchingContext.doPunch('', type);
        if (result) {
            toast.show(`Punched ${type} Successfully`, {
                type: "success",
            });
        } else {
            toast.show('Remote Attandance Not Enabled.', {
                type: "danger",
            });
        }
    }
    useEffect(() => {
        const timerID = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Clean up timer
        return () => clearInterval(timerID);
    }, []);

    useEffect(() => {
        const handleAppStateChange = nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground!');
                setIsAppActive(true);
                // 👇 Perform your screen refresh / re-fetch / resume logic here
            } else {
                setIsAppActive(false);
            }

            appState.current = nextAppState;
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    const formattedTime = moment(new Date()).format('hh:mm:ss A');
    const currentMoment = moment(new Date());
    const timeWithoutSeconds = currentMoment.format('hh:mm');
    const seconds = currentMoment.format('ss');
    const ampm = currentMoment.format('A');
    const formatDate = moment(currentDate).format('DD-MMM-YYYY, dddd');


    return (

        <PunchingContextProvider>
            <View style={{ padding: 10, flex: 1, }}>
                <ImageBackground source={appImages.sun} style={{ flex: 1, width: 100, height: 100, position: 'absolute', left: 15 }}>
                </ImageBackground>
                <View style={{ paddingStart: 50, top: 20 }}>
                    <Text style={styles.greetingTitle}>Marhaba {authContext?.user?.givenName}</Text>
                    <Text style={styles.greeting}> Good Day! Record your attendance</Text>
                </View>
                <View style={styles.actionContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'stretch', width: '100%', justifyContent: 'space-around', paddingHorizontal: 30 }}>
                        <View style={styles.buttonWrapperPunchin}>

                            <TouchableOpacity onPress={() => doPunch('In')} style={[styles.punchingButton, styles.punchingButtonIn]}>
                                <Image source={appImages.hand} style={styles.buttonIcon} resizeMode="contain" />
                                <Text style={[styles.buttonText, styles.buttonPunchInText]}>In</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonWrapperPunchout}>
                            <TouchableOpacity onPress={() => doPunch('Out')} style={[styles.punchingButton, styles.punchingButtonOut]}>
                                <Image source={appImages.hand} style={styles.buttonIcon} resizeMode="contain" />
                                <Text style={[styles.buttonText, styles.buttonPunchOutText]}>Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                {/* <View style={styles.timingContainer}>
                    <Text style={styles.punchingTime}>{formattedTime}</Text>
                    <Text style={styles.punchingDate}>{formatDate}</Text>
                </View> */}
                <View style={styles.timingContainer}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.punchingTime}>{timeWithoutSeconds}</Text>
                        <Text style={styles.punchingSeconds}>{seconds}</Text>
                        <Text style={styles.punchingAmPm}>{ampm}</Text>
                    </View>
                    <Text style={styles.punchingDate}>{formatDate}</Text>
                </View>
                <View style={{ width: '100%', marginTop: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                    <Clock title={'In'} time={punchingContext.punchinTime != null ? moment.utc(punchingContext.punchinTime, "DD-MMM-YYYY HH:mm:ss", true).format('hh:mm') : ''} />
                    <Clock title={'Out'} time={punchingContext.punchoutTime != null ? moment.utc(punchingContext.punchoutTime, "DD-MMM-YYYY HH:mm:ss", true).format('hh:mm') : ''} />
                    <Clock title={'Total Hrs'} time={punchingContext.totalHours} />
                </View>
            </View>

        </PunchingContextProvider>
    )
}

export default PunchingModalWrapper

const styles = StyleSheet.create({
    tileValues: {
        fontSize: 35,
        flex: 1
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'baseline', // This aligns the text baselines
    },
    punchingTime: {
        fontFamily: theme.fontFamilyLight,
        fontSize: 50,
        color: '#3E5D7B',
    },
    punchingSeconds: {
        fontFamily: theme.fontFamilyLight,
        fontSize: 25, // Smaller than main time
        color: '#3E5D7B',
        marginLeft: 2,
    },
    punchingAmPm: {
        fontFamily: theme.fontFamilyLight,
        fontSize: 20, // Even smaller for AM/PM
        color: '#3E5D7B',
        marginLeft: 5,
    },
    punchingDate: {
        fontFamily: theme.fontFamily,
        fontSize: 17,
        color: '#C4C4C4',
    },
    timingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30
    },
    buttonText: {
        fontSize: 12, marginTop: 10, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1
    },
    buttonIcon: {
        width: 40,
        height: 40
    },
    buttonPunchInText: {
        color: '#fff',
        textShadowColor: '#30303015',
        fontSize: 18
    },
    buttonPunchOutText: {
        color: '#fff',
        textShadowColor: '#ffffff70',
        fontSize: 18
    },
    punchingTime: {
        fontFamily: theme.fontFamilyLight,
        fontSize: 50,
        color: '#3E5D7B',
    },
    punchingDate: {
        fontFamily: theme.fontFamily,
        fontSize: 17,
        color: '#C4C4C4',

    },
    greetingTitle: {
        fontSize: 25, color: '#104476',
        fontFamily: theme.fontFamily,
    },
    greeting: {
        fontSize: 13,
        color: '#7A8691',
        fontFamily: theme.fontFamily,
    },
    actionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    punchingButton: {
        borderRadius: 200,
        width: 110,
        height: 110,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    punchingButtonIn: {
        backgroundColor: theme.primary,
    },
    punchingButtonOut: {
        backgroundColor: '#C3C3C3' //lightenColor('#FFA500', 0.2),//#FFCA3B',
    },
    buttonWrapperPunchin: {
        height: 115,
        width: 115,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 200,
        backgroundColor: theme.tint,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
    },
    buttonWrapperPunchout: {
        height: 115,
        width: 115,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 200,
        backgroundColor: theme.tint,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
    }
})