import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton } from '../ui/buttons';
import AppIcon from '../ui/icons';
import { theme } from '../theme';
import LottieView from 'lottie-react-native';
import { appAnimations } from '../constants/animations';

const ErrorMessages = ({ children, errors, title = 'Errors', showErrors, setShowErrors, visible = false }) => {
    const [flatErrors, setFlatErrors] = useState([]);
    useEffect(() => {
        const allErrors = Object.values(errors).flat();
        // console.log(allErrors,'flat errors');

        if (allErrors.length > 0) {
            setShowErrors(true);
        }

        setFlatErrors(allErrors);
    }, [errors]);

    const close = () => {
        setShowErrors(false)
    }
    return (
        <Modal visible={showErrors} style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: theme.primary }}>
            <View style={{ flex: 1, backgroundColor: theme.primary }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'flex-end' }}>
                    <Text style={{ flex: 1, color: theme.secondary, marginBottom: 10, fontSize: 22, fontWeight: 'bold', textAlign: 'center', paddingTop: 60 }}>{title}</Text>
                    <View style={{ position: 'absolute', justifyContent: "center", alignItems: 'center', right: 20, paddingBottom: 10 }}>
                        <IconButton name={'x-circle'} size={30} color={theme.secondary} onclick={close} type={'feather'} />
                    </View>
                </View>
                <View style={{ flex: 1, paddingTop: 10, paddingLeft: 20, borderTopEndRadius: 50, borderTopStartRadius: 50, backgroundColor: theme.tint }}>

                    <LottieView source={appAnimations['error']} autoPlay loop={false} style={{ width: 100, height: 100, alignSelf: 'center' }} />
                    {/* <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold',marginBottom:20 }}>{title}</Text> */}
                    <Text style={{ fontSize: 18, marginVertical: 20 }}>Your submission failed, please fix the below fields to be able to submit the form!</Text>
                    {children}
                    {flatErrors && flatErrors.map((error, index) => {
                        return <View key={'error_' + index} style={{ flexDirection: 'row', height: 30 }}><AppIcon name={'link'} size={15} color={theme.primary} type={'feather'} />
                            <Text style={{ marginLeft: 10, fontSize: 16 }} key={index}>{error}</Text></View>
                    })}
                </View>
            </View>
        </Modal>
    )
}

export default ErrorMessages

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})