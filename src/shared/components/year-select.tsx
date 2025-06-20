import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectControl from '../ui/select.control';

const YearSelectComponent = ({ filterForm, setFilterForm, style = {} }) => {
    const [yearData, setYearData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const tempArray = [];
        const currentMonthIndex = new Date().getMonth();
        console.log('Current Month Index', currentMonthIndex);
        // let pastAndCurrentMonths = monthData;
        for (let i = 0; i < 3; i++) {
            const year = currentYear - i;
            tempArray.push({ label: year.toString(), value: year });
        }
        setYearData(tempArray);
    }, []);

    useEffect(() => {
        setYear(filterForm.year);
    }, [filterForm.year]);
    
    return (
        <View style={[{ alignSelf: 'stretch', flex: 1 }, style]}>
            <SelectControl itmvalue={year} form={filterForm} updateForm={setFilterForm} field='year' placeholder='Year' value='value' data={yearData} title={''}></SelectControl>
        </View>
    )
}

export default YearSelectComponent

const styles = StyleSheet.create({})