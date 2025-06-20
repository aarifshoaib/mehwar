import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const PdfViewer = ({ source }) => {
    const [pdfSource, setPdfSource] = useState(source.uri)
    useEffect(() => {
        if (source.uri) {
            setPdfSource(source.uri)
        }
    }, [source])
    return (
        <View>
       
        </View>
    )
}

export default PdfViewer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
})