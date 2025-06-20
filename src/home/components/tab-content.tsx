import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { AppServicesContext } from '../redux/appServices.context';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { appImages } from '../../shared/constants/images';
import { useFonts } from 'expo-font';
import { theme } from '../../shared/theme';
import { FavoriteContext } from '../../favorite/redux/favorite-service.redux';

const EmployeeService = ({ data, navigation }) => {
  const homeContext = useContext(AppServicesContext);
  // to Navigate to the service
  const goService = (index: number, routeName: string) => {
    console.log(index, routeName);
    if (homeContext.servicesType === 'Favorite' && routeName === 'EmployeeService') {
      navigation.navigate('FavoriteScreen');
      return;
    }
    navigation.navigate(`${routeName}Navigation`, { type: routeName });
    // HouseLoanNavigation
  };

  return (
    <TouchableOpacity style={styles.serviceContainer} onPress={() => goService(data.index, data.item.url)}>
      <View style={styles.wrapper}>
        <Image
          style={styles.serviceImage}
          source={appImages[data.item.icon]}
          resizeMode={'contain'}
        />
        <Text lineBreakMode='middle' style={{ textAlign: 'center', color: '#707070', fontFamily: 'Poppins', fontSize: 12 }}>{data.item.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const TabContent = ({ navigation }) => {
  const homeContext = useContext(AppServicesContext);
  const [dataList, setDataList] = React.useState([]);
  const favoriteContext = useContext(FavoriteContext);

  //to get the favorites list from context
  useEffect(() => {
    if (homeContext.servicesType == 'Favorite') {
      setDataList(favoriteContext.favoriteService);
    }
  }, [favoriteContext.favoriteService]);

  useLayoutEffect(() => {
    switch (homeContext.servicesType) {
      case 'Favorite':
        setDataList(favoriteContext.favoriteService);
        break;
      case 'Manager':
        const managerServices = homeContext.appServices.filter((service) =>
          service.roles.includes('Manager')
        );
        setDataList(managerServices);
        break;
      case 'Employee':
        let employeeServices = [];
        if (homeContext && homeContext.appServices && homeContext.appServices.length > 0) {
          employeeServices = homeContext.appServices.filter((service) =>
            service.roles.includes('Employee')
          );
        }
        setDataList(employeeServices);
        break;
      default:
        setDataList(favoriteContext.favoriteService);
        break;
    }
  }, [homeContext.servicesType]);

  return (
    <View style={{ alignItems: 'center', paddingBottom: 30 }}>
      <FlatList
        numColumns={3} scrollEnabled={false} data={dataList} renderItem={(data) => <EmployeeService data={data} navigation={navigation} />} />
    </View >
  )
}

export default TabContent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  serviceContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: theme.controlBorderColor,
    borderWidth: 1,
    margin: 7,
    height: 112,
    borderRadius: 10,
    width: 112,
    shadowColor: '#000',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1
  },
  serviceImage: {
    marginBottom: 10,
    height: 35,
    width: 40
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
})