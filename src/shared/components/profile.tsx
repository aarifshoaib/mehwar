import { StyleSheet, Text, View, Image, ImageBackground, Pressable, Dimensions, Platform } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { theme } from '../theme';
import { AuthContext } from '../../auth/redux/auth.context';
import { IconButton } from '../ui/buttons';
import ModalSheet from './modal-sheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import axiosInstance from '../../auth/services/axios.interceptor';
import { env } from '../../../env/env.dev';
import UserImage from './user-image';

const Profile = ({ navigation }) => {
    const authContext = useContext(AuthContext);
    const user = authContext.user;
    const windowWidth = Dimensions.get('window').width;
    const [openModal, setOpenModal] = useState(false);
    const [qrCodeData, setQrCodeData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
    const inpref = useRef<BottomSheetModal>(null);
    const toggleDrawer = () => {
        navigation.toggleDrawer();
    };

    const openQRCode = () => {
        inpref.current?.present();
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    };
    const handleLogout = () => {
        authContext.logout();
        console.log('User logged out');
        setShowDropdown(false);
    };


    return (
        <View style={{ flex: 1, justifyContent: 'flex-end'}}>
            <View style={[styles.profileInnerWrapper,]}>
                <View style={{ marginStart: 5, flexDirection: 'row', alignContent: 'flex-end', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ flexDirection: 'row', marginTop: Platform.OS == 'ios'?65:20 }}>
                        {/* <IconButton name={'three-bars'} size={28} color={theme.tint} type={'octIcon'} onclick={toggleDrawer} /> */}
                        <Text style={styles.headerText}>Employee Attendance</Text>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'row', marginBottom: Platform.OS == 'ios'? 5:20  }}>
                        {/* <IconButton name={'qr-code-outline'} size={18} color={theme.tint} type={'ionic'} onclick={openQRCode} /> */}
                        {/* <UserImage email={authContext?.user?.mail} style={styles.image} /> */}
                        <Pressable onPress={() => setShowDropdown(!showDropdown)}>
                            <UserImage email={authContext?.user?.mail} style={styles.image} />
                        </Pressable>
                        {showDropdown && (
                            <View style={styles.dropdown}>
                                <Pressable style={styles.dropdownItem} onPress={handleLogout}>
                                    <IconButton
                                        name="log-out-outline" // Replace with the appropriate icon name
                                        size={18}
                                        color={theme.primary}
                                        type="ionic" // Replace with the appropriate icon type
                                        onclick={handleLogout}                                    />
                                    <Text style={styles.dropdownText}>Logout</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            {/* {openModal &&
                <Wallet setWalletOpen={setOpenModal} isOpen={openModal} />
            } */}

            {/* 

            {<ModalSheet onDismiss={closeModal} enablePanDownToClose={true} snap={['85%']} ref={inpref} >
                {qrCodeData ? (
                    <View style={{ flex: 1, alignContent: 'center',marginTop:40 }}>
                        <UserImage email={authContext.user.mail} style={{ alignSelf: 'center', width: 70, height: 70, position: 'relative',zIndex:4,marginBottom:-20 }} />
                        <View style={{ width: 230, height: 230, alignSelf: 'center', backgroundColor: '#efefef', padding: 30, borderRadius: 20, borderWidth: 3, borderColor: '#fff', shadowColor: '#00000015', shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 5 }}>
                            <Image
                                style={styles.qrCodeImage}
                                source={{ uri: qrCodeData }}
                            />
                        </View>
                    </View>
                ) : (
                    <Text>Loading QR code...</Text>
                )}
            </ModalSheet>} */}
        </View>
    )
}

const styles = StyleSheet.create({
    profileInnerWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'flex-end',
    },
    headerText: {
        color: theme.tint,
        fontSize: 20,
        marginStart: 25,
        fontFamily: 'Poppins',
        textTransform: 'capitalize'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 100,
        zIndex: 1000,
        marginLeft: 20,
        borderWidth: 2,
        marginRight: 20,
        marginTop: 5,
        borderColor: theme.tint,
        alignSelf: 'flex-end',
        position: 'relative',
        top: 5,
        padding: 10
    },
    qrCodeImage: {
        width: '100%',
        height: '100%',
    },
    dropdown: {
        position: 'absolute',
        top: 100, // Adjust to position below the UserImage
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        padding: 10,
        zIndex: 1000,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    dropdownText: {
        fontSize: 16,
        color: theme.primary,
        marginLeft: 10, // Add spacing between the icon and text
    },
})

export default Profile
