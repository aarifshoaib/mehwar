import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const GalleryFeature = ({ onAddAttachment, onClose, onOpen }) => {
    const [hasPermission, setHasPermission] = useState(null);
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasPermission(status === 'granted');
        })();


    }, []);

    useEffect(() => {
        if(hasPermission && onOpen){
            openGalleryHandler();
        }
    }, [hasPermission, onOpen]);

    const openGalleryHandler = async () => {
        if (hasPermission) {
            const options: ImagePicker.ImagePickerOptions = {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.75,
                base64: false,
            };

            const result = await ImagePicker.launchImageLibraryAsync(options);
            if (!result.canceled) {
                onAddAttachment(result.assets[0]);
            }

            if(result.canceled) {
                onClose(false);
            }

        }
    }

    if (hasPermission === false) {
        return <Text>No access to media library</Text>
    }




    return (
        <></>
    )
}

export default GalleryFeature

const styles = StyleSheet.create({})