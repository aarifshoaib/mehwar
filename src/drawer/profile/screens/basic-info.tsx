import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LabelValueControl from '../../../shared/ui/label-value.control'
import CopyClipBoard from '../../../shared/components/copy-clipboard'
import { theme } from '../../../shared/theme'
import ScreenWrapper from '../../../shared/components/screen-wrapper'
import { AuthContext } from '../../../auth/redux/auth.context'


const BasicInformation = ({ navigation }) => {
    const authContext = useContext(AuthContext);
    const [nationality, setNationality] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [address, setAddress] = useState('');

    const getValue = async (lookuptype, name) => {
        if (authContext.lookups && authContext.lookups.length > 0) {
            const lookup = await authContext.lookups.find(lookup => lookup.lookupType === lookuptype && lookup.name === name);
            if (lookup) {
                return lookup.description;
            }
            return name;
        }
    }

    useEffect(() => { 
        console.log(authContext.user);
        if(authContext.user) {
            setAddress(authContext.user.basicInfo.address1 || '-' + ' ' + authContext.user.basicInfo.address2 + ' ' + authContext.user.basicInfo.address3);
        }
        if (authContext?.user && authContext.lookups && authContext.lookups.length > 0) {
            const fetchData = async () => {
                const fetchedNationality = await getValue('COUNTRY', authContext.user.basicInfo.nationality);
                const fatchMarital = await getValue('MARITAL_STATUS', authContext.user.basicInfo.maritalStatus);
                setNationality(fetchedNationality);
                setMaritalStatus(fatchMarital);
            };
            fetchData();
        }
    }, [authContext.lookups, authContext.user]);

    return (
        <ScreenWrapper refreshing={undefined} onRefresh={undefined}>
            <View style={styles.container}>
               
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title={'Date of Birth'} value={authContext?.user.basicInfo.dob} />
                    <LabelValueControl style={styles.lastColumn} title={'Marital Status'} value={maritalStatus} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Gender' value={'Male'} />
                    <LabelValueControl style={styles.lastColumn} title='Nationality' value={nationality} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Date of Join' value={authContext?.user?.workInfo.hireDate} />
                    <LabelValueControl style={styles.firstColumn} title='Person ID' value={authContext?.user?.workInfo.personNumber} />
                    
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Personal Email' value={authContext?.user?.userPrincipalName} >
                        <CopyClipBoard color={theme.primary} text='' />
                    </LabelValueControl>
                    <LabelValueControl style={styles.label} title='Mobile' value={authContext?.user.mobilePhone || '-'} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Address' value={address || '-'} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.fullColumn} title='Position' value={authContext?.user?.jobTitle} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.fullColumn} title='Employer' value={authContext?.user?.workInfo.employer} />
                </View>
                <View style={styles.row}>
                    <LabelValueControl style={styles.firstColumn} title='Line Manager' value={authContext.user.workInfo.managerName} />
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default BasicInformation

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    container: {
        margin: 0,
        padding: 15
    },
    label: {
        justifyContent: 'flex-start',
        width: '48%',
        marginHorizontal: '2%'
    },
    fullColumn : {
        width:'100%',
        marginHorizontal: '2%'
    },
    firstColumn: {
        width: '60%',
        marginHorizontal: '2%'
    },
    lastColumn: {
        width: '35%',
        marginHorizontal: '2%'
    }
})