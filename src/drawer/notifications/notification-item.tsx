import { Animated, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import { darkenColor, lightenColor, theme } from '../../shared/theme';
import { mainStyle } from '../../shared/main-style';
import moment from 'moment';


const NotificationItem = ({ data, navigation, index }) => {
    const navigateToDetails = () => {
        navigation.navigate('ViewNotification', { item: data });
    }

    return (
        <View style={[styles.container, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <TouchableOpacity onPress={navigateToDetails} style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.ref}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >{data.body}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {!data.isRead &&
                            <View style={{ borderRadius: 200, width: 10, height: 10, backgroundColor: theme.primary }}></View>
                        }
                    </View>
                </View>
                {/* <View style={[mainStyle.row, { justifyContent: 'space-between', paddingVertical: 1, alignItems: 'center' }]}>
                    <View style={{ width: '60%' }}>
                        <Text style={styles.suggestionTitle}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >{data.body}</Text>
                    </View>
                </View> */}
                <View style={[mainStyle.row, { justifyContent: 'space-between', paddingVertical: 1, alignItems: 'center' }]}>
                    <View style={{ width: '60%' }}>
                        <Text style={styles.suggestionTitle}
                            numberOfLines={1} // limits text to 1 line
                            ellipsizeMode="tail" // adds '...' at the end
                        >{moment(data.createdAt).format('DD-MMM-YYYY hh:mm')}</Text>
                    </View>
                   
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default NotificationItem

const styles = StyleSheet.create({
    container: {
        // backgroundColor:'lime',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
        flexDirection: 'row',
        marginBottom: 10,
        flex: 1,
        // width:'100%'
    },
    status: {
        fontFamily: theme.fontFamily,
        color: darkenColor(theme.primary, 0.1),
        fontSize: 11,
        marginEnd: 5,
        marginStart: 5
    },
    suggestionTitle: {
        color: '#4D4848',
        overflow: 'hidden',
        fontFamily: theme.fontFamily,
        paddingTop: 5,
        fontSize: 13
    },
    evenRow: {
        backgroundColor: '#F5FBFF',
        borderColor: '#DDECFC',
    },
    oddRow: {
        backgroundColor: '#fff',
        borderColor: '#D4E6F4',
    },
    date: {
        alignSelf: 'flex-end',
        fontFamily: theme.fontFamily,
        fontSize: 11,
        color: '#4D4848',
    },
    ref: {
        fontSize: 14,
        color: theme.primary,
        fontFamily: theme.fontSemiBold,
        marginEnd: 10,
        width: '93%'
    },
    // date: {
    //   fontSize: 12,
    //   color: '#666',
    //   fontStyle: 'italic'
    // },
    actionButton: {
        justifyContent: 'center',
        backgroundColor: theme.primary,
        width: 90,
        alignItems: 'center',
        borderBottomEndRadius: theme.controlBorderRadius,
        borderTopRightRadius: theme.controlBorderRadius
    },
    actionText: {
        fontSize: 18,
        alignSelf: 'center',
        color: theme.tint,
        fontFamily: 'Poppins-Regular',
    },
    itemWrapper: {
        borderRadius: 10,
        flexDirection: 'row',
        // borderColor: theme.controlBorderColor
    },

})