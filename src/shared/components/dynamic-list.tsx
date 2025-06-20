import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const DynamicList = ({ data, key, onRefresh, template, loadMoreItems }) => {
    const [refreshing, setRefreshing] = useState(false);

    const doRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }


    return (
        <FlatList data={data}
            keyExtractor={(item) => item[key]}
            onRefresh={doRefresh}
            refreshing={onRefresh}
            renderItem={(data) => template(data)}
            onEndReached={loadMoreItems}
        />
    )
}

export default DynamicList

const styles = StyleSheet.create({})