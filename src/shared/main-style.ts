import { lightenColor, theme } from "./theme";
import { StyleSheet, } from 'react-native';

export const mainStyle = StyleSheet.create({
    headerStyle: {
    },
    tabs: {

    },
    dangerColor: {
        color: theme.danger
    },
    controlError: {
        backgroundColor: '#FFEEEB',
        borderColor: '#FFABA0'
    },
    controlPlaceholder: {
        fontSize: theme.controlPlaceholderFontSize, // Example font size
        fontFamily: theme.fontFamily, // Example font family
        color: theme.controlPlaceholderColor // Placeholder text color
    },
    row: {
        flexDirection: 'row',
    },
    whiteChip: {
        backgroundColor: '#fff',
        borderColor: '#DEECFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: .5, height: .5 },
        shadowOpacity: 0.1,
    },
    listIcon: {
        backgroundColor:'#C1DAF8',
        borderColor:'#fff',
        borderWidth:1,
        shadowColor: '#00000051',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        borderRadius:30,
        width:20,
        height:20,
        justifyContent:'center',
        alignItems:'center',
    }

})