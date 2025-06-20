import { StyleSheet, Text, View, ClipboardStatic } from 'react-native'
import React, { useState } from 'react'
import { IconButton } from '../ui/buttons'
import { theme } from '../theme'
import Clipboard from '@react-native-clipboard/clipboard';

const CopyClipBoard = ({ color = theme.tint, size = 17, text = 'Copy' }) => {
    const [copiedText, setCopiedText] = useState('');
    const copyToClipboard = () => {
        Clipboard.setString(text);
        setCopiedText(text);
    }

    return (
        <IconButton style={{ marginStart: 5 }} name={'clipboard-multiple-outline'} size={size} color={color} type={'material'} onclick={copyToClipboard} />
    )
}

export default CopyClipBoard

const styles = StyleSheet.create({})