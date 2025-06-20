import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker';

const FileBrowser = ({ onClose, onAddAttachment }) => {

    useEffect(() => {
        (async () => {
            try {
                let result = await DocumentPicker.getDocumentAsync({
                    multiple: false,
                });

                if (!result.canceled) {
                    onAddAttachment(result.assets[0]);
                }
                onClose(false)
            } catch (error) {
                console.error("Failed to pick document:", error);
            }

        })();
    }, []);
    return (
        <></>
    )
}

export default FileBrowser

const styles = StyleSheet.create({})