import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const IbtikarStatus = ({ item, color }) => {
    if (!color) {
        color = getStatusColor(item)
    }
    return (
        <>
            <View key={item?.ideaId} style={{ ...{ width: 10, height: 10, borderRadius: 20 }, ...color }}>
            </View>
        </>

    )
}

const getStatusColor = (item) => {
    if (item) {
        switch (item.statusName || item.status) {
            case 'Not Approved':
                return styles.danger;
            case 'warning':
                return styles.success;
            case 'info':
                return styles.warning;
            case 'success':
                return styles.success;
            case 'ibtikar':
                return styles.ibtikar;
            case 'reward':
                return styles.reward;
            default:
                return styles.default;
        }
    }
};

export default IbtikarStatus

const styles = StyleSheet.create({
    danger: {
        backgroundColor: '#fb6e52'
    },
    success: {
        backgroundColor: '#a0d468'
    },
    warning: {
        backgroundColor: '#ea841f'
    },
    purple: {
        backgroundColor: '#d7b3dc'
    },
    ibtikar: {
        backgroundColor: '#ffce55'
    },
    reward: {
        backgroundColor: '#87518e'
    },
    default: {
        backgroundColor: '#ccc'
    },
})