import { StyleSheet, Text, View } from 'react-native'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { TabBtn } from '../../shared/ui/buttons'
import { theme } from '../../shared/theme'
import { AppServicesContext, } from '../redux/appServices.context'
import React from 'react'
import { PunchingContext } from '../redux/punching.context';

const TabsServices = ({ navigation, isfavoriteDisplayed }) => {
    const homeContext = useContext(AppServicesContext);
    const PunchingCtx = useContext(PunchingContext);
    const [serviceType, setServiceType] = useState('Favorite');

    const changeTab = async (title) => {
        homeContext.changeTab(title);
        setServiceType(title);
    }

    useEffect(() => {
    }, [homeContext.servicesType]);

    const changeServiceType = (type) => {
        homeContext.changeTab(type);
    }

    return (
        <View style={styles.container}>
            
            {isfavoriteDisplayed ? (
                <View style={[styles.tabWrapper, (homeContext.servicesType == 'Favorite') ? styles.activeButtonWrapper : {}]}>
                    <TabBtn style={[styles.buttonStyle, (homeContext.servicesType == 'Favorite') ? styles.activeButton : styles.buttonStyle]} type='awesome' name={'star-o'} color={(homeContext.servicesType == 'Favorite') ? '#eee' : theme.primary} size={30} title={'Favorite'} action={() => changeTab('Favorite')} />
                    <Text>Favorite</Text>
                </View>
            ) : null}
            <View style={[styles.tabWrapper, (homeContext.servicesType == 'Employee') ? styles.activeButtonWrapper : {}]}>
                <TabBtn style={[styles.buttonStyle, (homeContext.servicesType == 'Employee') ? styles.activeButton : styles.buttonStyle]} type='feather' name={'user'} color={(homeContext.servicesType == 'Employee') ? '#eee' : theme.primary} size={30} title={'Employee'} action={() => changeTab('Employee')} />
                <Text>Employee</Text>
            </View>
            <View style={[styles.tabWrapper, (homeContext.servicesType == 'Employee') ? styles.activeButtonWrapper : {}]}>
                <TabBtn style={[styles.buttonStyle, (homeContext.servicesType == 'Employee') ? styles.activeButton : styles.buttonStyle]} type='feather' name={'user'} color={(homeContext.servicesType == 'Employee') ? '#eee' : theme.primary} size={30} title={'Employee'} action={() => changeTab('Employee')} />
                <Text>Manager</Text>
            </View>
            {PunchingCtx.allowRemote && <View style={[styles.tabWrapper, (homeContext.servicesType == 'Punchin') ? styles.activeButtonWrapper : {}]}>
                <TabBtn style={[styles.buttonStyle, (homeContext.servicesType == 'Punchin') ? styles.activeButton : styles.buttonStyle]} type='feather' name={'users'} color={(homeContext.servicesType == 'Punchin') ? '#eee' : theme.primary} size={30} title={'Manager'} action={() => changeTab('Manager')} />
                <Text>Punchin</Text>
            </View>
            }
        </View>
    )
}

export default TabsServices

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 10,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    buttonStyle: {
        marginHorizontal: 5,
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 100,
        marginBottom: 5
    },
    tabWrapper: {
        flexDirection: 'column',
        marginHorizontal: 5,
        alignItems: 'center',
        paddingBottom: 5
    },
    activeButtonWrapper: {
        borderBottomColor: theme.primary,
        borderBottomWidth: 3
    },
    activeButton: {
        marginHorizontal: 5,
        alignItems: 'center',
        backgroundColor: theme.primary,
        padding: 10,
        borderRadius: 100,
        marginBottom: 5,
    },
    activeIcon: {
        color: '#eee'
    }
})