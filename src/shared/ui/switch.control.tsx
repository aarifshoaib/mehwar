import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { theme } from '../theme';

const SwitchControl = ({ form, field, updateForm, text, itmvalue = false, children = <></> }) => {
    console.log('itmvalue', itmvalue);
    const [isEnabled, setIsEnabled] = React.useState(itmvalue);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    useEffect(() => {
        if (updateForm) {
            updateForm({ ...form, [field]: isEnabled });
        }
    }, [isEnabled])

    useEffect(() => {
        if (itmvalue) {
            setIsEnabled(itmvalue);
            updateForm({ ...form, [field]: itmvalue });
        }
    }, [itmvalue])

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: "#767577", true: theme.tint }}
                thumbColor={isEnabled ? theme.primary : theme.tintDark}
                ios_backgroundColor={theme.tint}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            {children}
            <Text style={styles.text}>{text}{true}</Text>
        </View>
    )
}

export default SwitchControl

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', alignItems: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    text: {
        fontSize: theme.pageTitleFontSize, marginStart: 5, color: theme.primaryDark
    }
})