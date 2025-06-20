// import {
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
// } from 'react-native';
// import { useContext, useEffect, useLayoutEffect, useState } from 'react';
// import { theme } from '../../shared/theme';
// import { appImages } from '../../shared/constants/images';
// import { AppServicesContext } from '../redux/appServices.context';
// import React from 'react';
// import { FavoriteContext } from '../../favorite/redux/favorite-service.redux';
// import { AuthContext } from '../../auth/redux/auth.context';
// import { useRoute } from '@react-navigation/native';

// const ServicesList = ({ navigation }) => {
//   const favoriteContext = useContext(FavoriteContext);
//   const [currentTab, setCurrentTab] = useState('');
//   const [dataList, setDataList] = useState(favoriteContext.favoriteService);
//   const homeContext = useContext(AppServicesContext);
//   const authContext = useContext(AuthContext);
//   const route = useRoute();
//   const screen = route.name;

//   useEffect(() => {
//     setDataList(favoriteContext.favoriteService);
//   }, [favoriteContext.favoriteService]);

//   useLayoutEffect(() => {
//     setCurrentTab(homeContext.servicesType);
//     switch (homeContext.servicesType) {
//       case 'Favorite':
//         setDataList(favoriteContext.favoriteService);
//         break;
//       case 'Manager':
//         const managerServices = homeContext.appServices.filter((service) =>
//           service.roles.includes('Manager')
//         );
//         setDataList(managerServices);
//         break;
//       case 'Employee':
//         let employeeServices = [];
//         if (homeContext && homeContext.appServices &&homeContext.appServices.length > 0) {
//           employeeServices = homeContext.appServices.filter((service) =>
//             service.roles.includes('Employee')
//           );
//         }
//         setDataList(employeeServices);
//         break;
//       case 'Entities':
//         setDataList(homeContext.entities);
//         break;
//       default:
//         setDataList(favoriteContext.favoriteService);
//         break;
//     }
//   }, [homeContext.servicesType]);

//   const goService = (index: number, routeName: string) => {
//     console.log(routeName);
//     if (homeContext.servicesType === 'Favorite' && routeName === 'EmployeeService') {
//       navigation.navigate('FavoriteScreen');
//       return;
//     }
//     navigation.navigate(`${routeName}Navigation`, { type: routeName });
//     // HouseLoanNavigation
//   };

//   const renderItem = ({ item, index }) => {
//     return (
//       <TouchableOpacity
//         key={item?._id || -1}
//         style={styles.gridItem}
//         onPress={() => goService(index, item.url)}
//       >
//         <View style={styles.gridInnerWrapper}>
//           <Image
//             style={styles.serviceImage}
//             source={appImages[item.icon]}
//             resizeMode={'stretch'}
//           />
//           <Text style={styles.actionTitle}>{item.name}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <ScrollView
//       horizontal
//       bounces={false}
//       alwaysBounceVertical={false}
//       style={styles.scrollView}
//     >
//       <FlatList
//         scrollEnabled={dataList.length > 11}
//         bounces={false}
//         style={styles.itemsList}
//         numColumns={4}
//         contentContainerStyle={styles.itemListContent}
//         data={[...dataList, ...[{ name: 'View All', icon: 'view-all', url: 'EmployeeService' }]]}
//         renderItem={renderItem}
//       />
//     </ScrollView>
//   );
// };

// export default ServicesList;

// const styles = StyleSheet.create({
//   itemsList: {
//     flex: 1,
//     // flexDirection: 'row'
//   },
//   scrollView: {
//     // flex: 1,
//   },
//   itemListContent: {},
//   actionTitle: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#888',
//     flexWrap: 'wrap',
//     flex: 1,
//   },
//   gridInnerWrapper: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     padding: 10,
//   },
//   gridItem: {
//     backgroundColor: theme.lightColor,
//     borderColor: theme.borderColor,
//     borderRadius: theme.borderRadius,
//     margin: 10,
//     height: 65,
//     width: 150,
//   },
//   serviceImage: {
//     maxHeight: 35,
//     marginRight: 10,
//     maxWidth: 35,
//   },
// });
