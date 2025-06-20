import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LabelControl from '../../shared/ui/label.control'
import SelectControl from '../../shared/ui/select.control'
import { env } from '../../../env/env.dev'

const LeaveReason = ({ type }) => {
    const [localData, setLocalData] = useState([]);

    useEffect(()=> {
        if(type) {
            loadData(type);
        }
    },[type])
    const loadData = async (type) => {
        const result = await fetch(`${env.coreServices}lookups?type=${type}`);
        const data = await result.json();
        setLocalData(data);
    }

    return (
        <View>
            <SelectControl data={localData} title={'Reason'} />
        </View>
    )
}

export default LeaveReason
