import { StyleSheet, View, Image, Modal, } from 'react-native'
import React from 'react'
import { HeaderButton } from '../components/buttons'
import { theme } from '../theme'
import { IconButton } from '../ui/buttons'

const ImagePreview = ({ photo, preview = false, setOpenImageModal, style = {} }) => {
    if (preview) {
        return (
            <Modal animationType='slide'>

                <View style={{ flex: 1 }}>
                    <View style={{ position: 'absolute', right: 20, top: 60, zIndex: 4444 }}>
                        <HeaderButton iconColor={theme.tint} color={theme.primary} onPress={() => setOpenImageModal(false)} options={undefined} icon={'close'} type={'ant'} />
                    </View>
                    {photo && photo.thumbnail && <Image style={styles.preview} source={{ uri: photo.thumbnail }} />}
                    {photo && !photo.thumbnail && <Image style={styles.preview} source={{ uri: photo }} />}
                </View>
                {/* <View style={{ backgroundColor: '#000', position: 'absolute', bottom: 50, width: '100%' }}>
                    <Textbox placeholder='Enter File Name' title={undefined} />
                    <IconButton name={undefined} size={undefined} color={undefined} type={undefined} onclick={undefined} />
                </View> */}
            </Modal>)
    }
    return (
        <View style={{ flex: 1, ...style }}>
            <View style={{ position: 'absolute', right: 20, top: 60, zIndex: 4444 }}>
                <HeaderButton iconColor={theme.tint} color={theme.primary} onPress={() => setOpenImageModal(false)} options={undefined} icon={'close'} type={'ant'} />
            </View>
            <Image style={styles.preview} source={{ uri: photo.uri }} />
        </View>
    )
}

export default ImagePreview

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        // alignSelf: 'stretch'
    }
})