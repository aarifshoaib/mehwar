import { Modal, StyleSheet, Text, Image, View, Button, Platform, Share, Linking, NativeModules } from "react-native";
import React, { useRef, useState, useContext, useEffect } from "react";
import { ButtonBlock, HeaderButton } from "./buttons";
import { theme, darkenColor } from "../theme";
import ScreenWrapper from "./screen-wrapper";
import UserImage from "./user-image";
import { AuthContext } from "../../auth/redux/auth.context";
import { env } from "../../../env/env.dev";
import axiosInstance from "../../auth/services/axios.interceptor";
import AppIcon from "../ui/icons";
import { IconTextButton, ImageButton } from "../ui/buttons";
import RNFS from 'react-native-fs';
import { captureRef } from 'react-native-view-shot';
import PassKit, { AddPassButton } from 'react-native-passkit-wallet';
import { AppSharedContext } from "../redux/app-shared.context";
import { writeFile, DocumentDirectoryPath } from 'react-native-fs';


const FieldComponent = ({ label, value, icon, type = 'ant', isLast = false }) => {
    return (<View style={[styles.fieldWrapper, isLast ? { borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderBottomWidth: 0 } : null]}>
        <View style={styles.fieldRow}>
            <AppIcon type={type} name={icon} color={'black'} size={14} />
            <Text style={styles.fieldLabel}>{label}</Text>
        </View>
        <View >
            <Text style={styles.fieldValue}>{value} </Text>
        </View>
    </View>);
}

const Wallet = ({ setWalletOpen, isOpen }) => {
    const authContext = useContext(AuthContext);
    const [qrCodeData, setQrCodeData] = useState(null);
    const url = `${env.coreServices}employees/pass`;
    const qrCodeRef = useRef(null);
    const appSharedContext = useContext(AppSharedContext);
    const [isGoogleWalletInstalled, setIsGoogleWalletInstalled] = useState(false);

    const addToWallet = async (provider = "") => {
        try {
            const responseResult = await axiosInstance.get(`${env.coreServices}employees/pass`, {
                responseType: 'blob',
                headers: {
                    user: JSON.stringify(authContext.user),
                }
            })
            //convert blob to base64 from the responseResult.data return as buffer
            const blob = responseResult.data;
            const base64EncodedPass: string = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        // Remove the data prefix
                        resolve(reader.result.split(',')[1]);
                    } else {
                        reject(new Error('Failed to convert blob to Base64'));
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });

            if (Platform.OS === 'android') {
                // add to the string its png image
                const x = await PassKit.addPass(base64EncodedPass, provider).then(() => {
                    console.log('pass added')
                }).then((error) => {
                    console.log('error adding pass', error)
                });
            } else {
                PassKit.addPass(base64EncodedPass);
            }
            // Use PassKit to add the pass

        } catch (error) {
            console.error('Error accessing .pkpass file:', error);
        }
    }

    const getVCards = async () => {
        try {
            const response = await axiosInstance.get(`${env.coreServices}employees/vcard`, {
                headers: {
                    user: JSON.stringify(authContext.user),
                }
            });
            console.log('vcard', response.data);
            return response.data;
            
        } catch (error) {
            console.error("Error fetching vcard:", error);
        }
    }
    const ShareVCard = async() => {

        const vCardData = await getVCards();
    

        const filePath = `${RNFS.DocumentDirectoryPath}/contact.vcf`;

        try {

            await RNFS.writeFile(filePath, vCardData, 'utf8');

            await Share.share({
                url: `file://${filePath}`,
                title: 'Share Contact',
                message: 'Check out this contact information',
            });
            console.log('vCard shared successfully!');
        } catch (error) {
            console.error('Error creating or sharing vCard:', error);
        }
    };

    const blobToBase64 = async (blob) => {
        return new Promise((resolve, reject) => {
            const reader: any = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get Base64 string without the data type prefix
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(blob); // Converts Blob to a Data URL
        });
    };

    const checkGoogleWallet = async () => {
        let canOpen = false;
        if (Platform.OS === 'android') {
            try {
                const apps = await NativeModules.InstalledApps.getInstalledApps();
                apps.forEach(element => {
                    console.log('====================================');
                    console.log(element);
                    console.log('====================================');
                });
            } catch (error) {
                console.error('Error checking Google Wallet:', error);
            }
        }
    };

    const installWallet = () => {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel');
    }

    useEffect(() => {
        const fetchQrCode = async () => {
            try {
                appSharedContext.toggleLoader(true);
                if (isOpen) {
                    const response = await axiosInstance.get(`${env.coreServices}employees/qr`, {
                        responseType: 'blob',
                        headers: {
                            user: JSON.stringify(authContext.user),
                        }
                    });

                    let qrCodeURL
                    if (Platform.OS === 'android') {
                        const base64String = await blobToBase64(response.data);
                        // Assuming response.data is a binary blob, convert it to Base64
                        qrCodeURL = `data:image/png;base64,${base64String}`;
                    } else {
                        qrCodeURL = URL.createObjectURL(response.data);
                        // Use URL.createObjectURL for platforms that support it
                    }

                    setQrCodeData(qrCodeURL);
                }
            } catch (error) {
                console.error("Error fetching QR code:", error);
            }
            finally {
                appSharedContext.toggleLoader(false);
            }
        };
        fetchQrCode();
        checkGoogleWallet();
    }, [isOpen]);

    return (
        <View>
            <Modal animationType='slide'>
                <View style={{ height: 100, backgroundColor: theme.primary }}>
                    <View style={{ position: 'absolute', left: 0, top: 65, zIndex: 4444 }}>
                        <Text style={styles.textTitle}>My QR</Text>
                    </View>
                    <View style={{ position: 'absolute', right: 20, top: 60, zIndex: 4444 }}>
                        <HeaderButton iconColor={theme.primary} color={theme.tint} onPress={() => setWalletOpen(false)} options={undefined} icon={'close'} type={'ant'} />
                    </View>
                </View>
                <ScreenWrapper refreshing={undefined} onRefresh={undefined}>
                    <View style={styles.containerWrapper}>
                        <View style={{ flex: 1, alignContent: 'center', padding: 20 }}>
                            <UserImage email={authContext.user.mail} style={{ alignSelf: 'center', width: 100, height: 100, position: 'relative', zIndex: 4, marginBottom: -20 }} />
                            <View style={{ width: '100%', alignSelf: 'center', backgroundColor: '#fff', borderRadius: 20, borderWidth: 3, borderColor: '#fff', shadowColor: '#00000015', shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 5 }}>
                                <View style={{ width: 200, height: 200, alignSelf: 'center', padding: 10, margin: 10 }}>
                                    {qrCodeData && <Image
                                        style={styles.qrCodeImage}
                                        source={{ uri: qrCodeData }}
                                    />}
                                </View>

                                <FieldComponent label={'Name'} value={authContext.user.displayName} icon={'user'} />
                                <FieldComponent label={'Designation'} value={authContext.user.jobTitle} icon={'idcard'} />
                                <FieldComponent label={'Email'} value={authContext.user.mail} icon={'mail'} />
                                <FieldComponent label={'Mobile'} value={authContext.user.mobilePhone || '-'} icon={'mobile1'} />
                                <FieldComponent isLast={true} label={'Contact'} value={authContext.user.businessPhones[0]} icon={'phone'} />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    {Platform.OS == 'ios' && <AddPassButton
                                        style={styles.addPassButton}
                                        addPassButtonStyle={20}
                                        onPress={addToWallet}
                                    />}
                                    {Platform.OS == 'android' && isGoogleWalletInstalled &&
                                        <Button title={'Add Wallet'} onPress={() => addToWallet('ae.adports.employees.fileprovider')} />
                                    }
                                    {Platform.OS == 'android' && !isGoogleWalletInstalled &&
                                        <IconTextButton text={'Install Wallet'} style={{ padding: 0 }} iconName={'google-play'} iconType={'entypo'} onPress={installWallet} iconColor={theme.tint} iconSize={25} />
                                    }
                                </View>
                                <View style={{ width: '50%', marginStart: 10 }}>
                                    <IconTextButton text={'Share'} style={{ padding: 0 }} iconName={'share-2'} iconType={'feather'} onPress={ShareVCard} iconColor={theme.tint} iconSize={25} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScreenWrapper>
            </Modal>
        </View>
    );
}

export default Wallet;

const styles = StyleSheet.create({

    containerWrapper: {
        padding: 15,
    },
    addPassButton: {
        height: 40,
        borderRadius: 20,
    },

    textTitle: {
        color: theme.tint,
        fontSize: 21,
        fontFamily: 'Poppins',
        marginLeft: 15,
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    fieldWrapper: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderColor: '#ddd',
        borderBottomWidth: 1,
    },
    fieldRow: {
        flex: 1,
        flexDirection: 'row',
    },
    fieldValue: {
        flex: 1,
        color: darkenColor(theme.primary, 0.05),
        fontFamily: theme.fontFamilyMedium,
        paddingStart: 25
    },
    fieldLabel: {
        color: '#666',
        paddingStart: 10
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
    }
})