import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { AppServicesContext } from '../home/redux/appServices.context';
import { theme } from '../shared/theme';
import { appImages } from '../shared/constants/images';
import TabsServices from '../home/components/tabs-services';
import Textbox from '../shared/ui/textboxes.control';


const AppServiceScreen = ({ navigation }) => {
  const appserviceContext = useContext(AppServicesContext);
  const [datalist, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState({ "search": "" });
  let appServices = [];

  useEffect(() => {
    if (appserviceContext.servicesType !== '') {
      appServices = appserviceContext.appServices.filter((service) => service.roles.includes(appserviceContext.servicesType));
      if (search.search !== '') {
        appServices = appServices.filter((x) => x.name.toLowerCase().includes(search.search))
      }
    }
    setDataList(appServices);
    setIsLoading(true);
  }, [appserviceContext.servicesType, search.search])


  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={item?._id || -1}
        style={styles.gridItem}
        onPress={() => { }}
      >
        <View style={[styles.gridInnerWrapper, styles.p10]}>
          <Image
            style={styles.serviceImage}
            source={appImages[item.icon]}
            resizeMode={'stretch'}
          />
          <Text style={styles.actionTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={[styles.container]}>
      {isLoading ? (
        <View>
          <TabsServices navigation={navigation} isfavoriteDisplayed={false} />
          <View style={styles.p10}>
            <Textbox
              form={search}
              field={'search'}
              title={''}
              
              placeholderOptions={{
                text: 'Search by Service Name',
                color: '#666',
              }}
              updateForm={setSearch}
              />
          </View>
          <ScrollView
            horizontal
            bounces={false}
            alwaysBounceVertical={false}
            style={styles.scrollView}>
            <FlatList
              scrollEnabled={true}
              bounces={false}
              style={styles.itemsList}
              numColumns={3}
              contentContainerStyle={styles.itemListContent}
              data={datalist}
              renderItem={renderItem}
            />
          </ScrollView>
        </View>
      ) : (
        <Text>Loading...</Text>
      )
      }
    </View >
  )
}

export default AppServiceScreen;

const styles = StyleSheet.create({

  scrollView: {},

  container: {
    alignItems: 'stretch',
    flex: 1,
  },
  p10: {
    padding: 10,
  },
  itemsList: {
    flex: 1,
  },
  itemListContent: {},
  actionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#888',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridInnerWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    backgroundColor: theme.tint,
    borderColor: theme.controlBorderColor,
    borderRadius: theme.controlBorderRadius,
    margin: 10,
    height: 85,
    minWidth: '30%',
  },
  serviceImage: {
    maxHeight: 35,
    maxWidth: 35,
  },
});