import { Button, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType, requestCameraPermissionsAsync, FlashMode } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';
import Icon from 'react-native-vector-icons/Entypo';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import ImagePreview from './image-preview.feature';
import Textbox from '../ui/textboxes.control';
import { IconButton } from '../ui/buttons';
import { theme } from '../theme';
import AppIcon from '../ui/icons';


const CameraButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#000', alignSelf: 'auto', width: 70, height: 70 }}>
            <View style={{ borderWidth: 4, borderColor: '#fff', flex: 1, borderRadius: 1000, padding: 3 }}>
                <View style={{ borderRadius: 1000, backgroundColor: '#fff', flex: 1 }}></View>
            </View>
        </TouchableOpacity>
    )
}

const CameraHeader = ({ left = null, right = null, setCameraType, flashing, flashMode, cameraType, onDismiss }) => {


    const cameraHeaderStyles = StyleSheet.create({
        actionsContainer: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            paddingTop: 50
        },
        cameraActionsRight: {
        },
        cameraActionLeft: {
            flexDirection: 'row',
        }
    });
    return (
        <View style={cameraHeaderStyles.actionsContainer}>
            <View style={cameraHeaderStyles.cameraActionsRight}>
                {!right ? <TouchableOpacity style={{ padding: 10 }} onPress={() => onDismiss(false)}><Icon name="cross" size={35} color={'#fff'} /></TouchableOpacity> : right}
            </View>
            <View style={cameraHeaderStyles.cameraActionLeft}>
                {!left ? (<>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => (cameraType == CameraType.back) ? setCameraType(CameraType.front) : setCameraType(CameraType.back)}><Icon name="cycle" size={30} color={'#fff'} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => (flashMode == FlashMode.off ? flashing(FlashMode.on) : flashing(FlashMode.off))} style={{ padding: 10 }}><Icon name="flash" size={30} color={(flashMode == FlashMode.off) ? '#ccc' : '#ffff'} /></TouchableOpacity>
                </>) : left}
            </View>
        </View>
    )
};

const CameraFooter = ({ children = null, takePicture }) => {
    return (
        <View style={styles.cameraFooter}>
            <View style={styles.cameraFooter}>
                <CameraButton onPress={takePicture} />
            </View>
            {children}
        </View>
    )
}

const CameraFeature = ({ onClose, onAddAttachment }) => {
    let cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [openImageModal, setOpenImageModal] = useState(false);
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.on);
    const [fileSize, setFileSize] = useState(null);
    const [form, setForm] = useState(null);
    useEffect(() => {
        (async () => {
            const cameraPermission = await requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasPermission(cameraPermission.status === 'granted');
            setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');

        })();
    }, []);

    if (hasPermission === undefined) {
        return <Text>Request Permission ...</Text>
    } else if (!hasPermission) {
        return <Text>Permission for camera not granted. please chnage the settings</Text>
    }

    const getPhotoSize = async (uri) => {
        return await FileSystem.getInfoAsync(uri);
    }
    const takePicture = async () => {
        let options = {
            quality: .5,
            base64: false,
            mediaType: 'photo',
            exif: true,
            additionalExif: { name: 'test', description: 'test description' }
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        getPhotoSize(newPhoto.uri).then((statResult: any) => {
            const sizeInBytes = statResult.size;
            const sizeInKb = sizeInBytes / 1024;

            setFileSize(sizeInKb);
            newPhoto.fileSize = sizeInKb;
            setPhoto(newPhoto);
        });
        setOpenImageModal(true);
    };

    if (photo && openImageModal) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            })
        }

        let savePhoto = async () => {

            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                photo.fileName = form.fileName != '' ? form.fileName + '.' + photo.uri.split('.').pop() : photo.uri.split('/').pop();;
                onAddAttachment(photo, 'camera');
                setPhoto(undefined);
            });
        }

        return (
            <Modal animationType='slide'>
                <ImagePreview photo={photo} setOpenImageModal={setOpenImageModal} />
                {/* backgroundColor: 'rgba(0,0,0,.8)',  */}
                <View style={{ backgroundColor: '#000', width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'flex-start' }}>
                    <Textbox form={form} placeholder='Enter File Name' updateForm={setForm} field='fileName' title={undefined} style={{ flex: 1, marginBottom: 5 }} />
                    {hasMediaLibraryPermission && <TouchableOpacity onPress={savePhoto} style={{ marginHorizontal: 10, backgroundColor: theme.primary, padding: 10, borderRadius: 10 }}>
                        <IconButton style={{ transform: [{ rotate: '45deg', }], }} name={'paper-plane-outline'} size={20} color={theme.tint} type={'ionic'} onclick={savePhoto} />
                    </TouchableOpacity>}
                </View>

            </Modal>
        )
    }

    return (
        <Modal animationType="slide">
            <Camera style={styles.container} ref={cameraRef} type={cameraType} flashMode={flashMode}>
                <CameraHeader setCameraType={setCameraType} flashing={setFlashMode} flashMode={flashMode} cameraType={cameraType} onDismiss={onClose} />
                <CameraFooter takePicture={takePicture} />
            </Camera>
        </Modal>
    )
}

export default CameraFeature

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'column',
        // paddingVertical:60,
        alignContent: 'stretch',
    },
    photoWrapper: {
        flex: 1
    },
    cameraFooter: {
        backgroundColor: 'black',
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 20
    },

    camera: {
        flex: 1,
        backgroundColor: 'blue',
        borderRadius: 20,
        flexDirection: 'column',
        width: '100%',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    cameraHeaderActions: {
        justifyContent: 'space-between',

        paddingHorizontal: 10,
        paddingTop: 50,
        flexDirection: 'row',
    }
})


// flash-auto
//flash-off
//flash-on