import { StyleSheet, Text, View, Image, PermissionsAndroid } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { IconButton, IconTextButton } from '../../ui/buttons'
import { lightenColor, theme } from '../../theme'
import CameraFeature from '../../features/camera.feature'
import { ApplicationFile } from '../../models/file'
import AttachmentSheet from './attachments-sheet'
import GalleryFeature from '../../features/gallery.feature'
import ImagePreview from '../../features/image-preview.feature'
import FileBrowser from '../../features/file-browser'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LabelControl from '../../ui/label.control'
import NoRecords from '../no-records'
import PdfThumbnail from 'react-native-pdf-thumbnail';
import { shareAsync } from 'expo-sharing'
import PdfViewer from '../../features/pdf-viwer.feature'
import { color } from '@rneui/base'
import { env } from '../../../../env/env.dev'
import { Toast } from 'react-native-toast-notifications'

const Attachment = ({ attachments, setAttachments }) => {
    const [openCamera, setOpenCamera] = useState(false);
    const [openGallery, setOpenGallery] = useState(false);
    const [openFile, setOpenFile] = useState(false);
    const [previewImage, setPreviewImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openPdfViewer, setOpenPdfViewer] = useState(false);
    const sheetRef = useRef(null);

    // this is for showing the sources of the attachment
    // what the user want (Camera, Gallery, File Browser)
    const openAttachmentSheet = () => {
        sheetRef.current?.present();
    };

    // View Images
    const viewFile = (item) => {
        if (item) {
            setSelectedImage(item);
            if (item.type == 'application/pdf') {
                setOpenPdfViewer(true);
            } else {
                setPreviewImage(true);
            }
        }
    }


    // Download Files
    const downloadFile = (item) => {
        shareAsync(item.uri).then(() => {

        })
    }

    // Remove Attachments from the array of attachments
    const removeFile = (item) => {
        if (item && attachments) {
            attachments.splice(attachments.indexOf(item), 1);
            setAttachments([...attachments]);
        }
    }


    // pushing the attachments to the list of the attachments
    const addAttachment = async (attachment, type) => {
        if (attachment) {
            let attach = new ApplicationFile();
            if (type == 'camera') {
                setOpenCamera(false);
            } else {
                setOpenGallery(false);
            }

            attach.uri = attachment.uri;
            attach.fileName = attachment.name || attachment.fileName;
            attach.size = attachment.size || attachment.fileSize;
            attach.type = attachment.mimeType;
            if (attachment.mimeType == 'application/pdf') {
                await PdfThumbnail.generate(attach.uri, 0)
                    .then(({ uri, width, height }) => {
                        attach.thumbnail = uri;
                    })
                    .catch((error) => {
                        console.error('is this error', error);
                    });
            } else {
                attach.thumbnail = attachment.uri;
            }
            console.log(attach);
            const maxFileSize = env.MaxUploadFileSize;
            console.log('maxFileSize', maxFileSize);
            if (attach.size > maxFileSize) {
                Toast.show(`File size is too large, Maximum file size is ${maxFileSize / 1024 / 1024 } MB`, {
                    type: 'warning',
                    duration: 3000
                });
                return;
            }
            setAttachments([...attachments, attach]);
        }
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LabelControl title={'Attachments'} />
                {/* <IconButton name={'attach'} size={25} color={theme.primary} type={'ionic'} onclick={openAttachmentSheet} /> */}
            </View>
            <View>
                <View>
                    <TouchableOpacity onPress={openAttachmentSheet} style={{ display: 'flex', flexDirection: 'row', marginTop: 10, borderWidth: 1, borderRadius: 15, borderColor: '#508ed1', borderStyle: 'dashed', padding: 12, justifyContent: 'center' }}>

                        <IconButton name={'add-outline'} size={25} color={theme.controlAttachmentColor} type={'ionic'} onclick={undefined} />
                        <Text style={{ color: theme.controlAttachmentColor, fontSize: theme.controlLabelFontSize, marginTop: 3 }}>
                            Add Attachments
                        </Text>
                    </TouchableOpacity>
                </View>
                {attachments.length > 0 &&
                    <View style={styles.itemViewWrapper}>
                        {attachments.map((item, index) => (
                            <View key={index} style={styles.itemWrapper}>
                                <View style={styles.titleWrapper}>
                                    <TouchableOpacity onPress={() => viewFile(item)}>
                                        <Image source={{ uri: item.thumbnail }} style={{ width: 40, height: 40, borderRadius: 5 }} />
                                    </TouchableOpacity>
                                    <Text style={styles.itemTitle}>{item.fileName}</Text>
                                </View>
                                <View style={styles.actionsWrapper}>
                                    <IconButton type="feather" name="download" onclick={() => downloadFile(item)} size={25} color={theme.controlIconColor} />
                                    <IconButton type="feather" name="trash-2" onclick={() => removeFile(item)} size={25} color={theme.danger} style={{ paddingLeft: 25 }} />

                                </View>
                            </View>
                        ))}
                    </View>
                }
            </View>
            <AttachmentSheet ref={sheetRef} onCamera={() => setOpenCamera(true)} onFile={() => setOpenFile(true)} onAddAttachment={addAttachment} onGallery={() => setOpenGallery(true)} />
            {/* {!attachments.length && <NoRecords title={'No Attachments'} />} */}
            {openCamera && <CameraFeature onClose={setOpenCamera} onAddAttachment={addAttachment} />}
            {openGallery && <GalleryFeature onOpen={openGallery} onClose={setOpenGallery} onAddAttachment={addAttachment} />}
            {openFile && <FileBrowser onClose={setOpenFile} onAddAttachment={addAttachment} />}
            {previewImage && <ImagePreview photo={selectedImage} preview={true} setOpenImageModal={setPreviewImage} />}
            {/* {true && <PdfViewer />} */}
        </View>
    )
}

export default Attachment

const styles = StyleSheet.create({
    mainTitle: {
        color: theme.primary,
        fontWeight: 'bold'
    },
    itemTitle: {
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        color: theme.controlLabelColor,
        paddingStart: 15
    },
    titleWrapper: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        flexDirection: 'row'

    },
    itemViewWrapper: {
        backgroundColor: '#F7F7F7',
        padding: 20,
        paddingTop: 10,
        borderColor: '#E3E3E3',
        borderRadius: theme.controlBorderRadius,
        borderWidth: 1,
        marginTop: 20
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
        alignItems: 'center',
        paddingTop: 10

    },
    actionsWrapper: {
        flexDirection: 'row',
    },

})