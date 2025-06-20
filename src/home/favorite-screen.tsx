import { useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { AppServicesContext } from './redux/appServices.context';
import React from 'react';


const DragableList = ({ navigation, data }) => {
  const [listData, setListData] = useState(data);


  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<any>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            {
              opacity: isActive ? 0.5 : 1,
              padding: 5,
              backgroundColor: item.backgroundColor,
            },
          ]}
        >
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  }, []);

  return (
    <DraggableFlatList
      data={listData}
      onDragEnd={({ data }) => setListData(data)}
      renderItem={renderItem}
      renderPlaceholder={() => <View style={{ flex: 1, backgroundColor: 'tomato' }} />} keyExtractor={function (item: any, index: number): string {
        throw new Error('Function not implemented.');
      }} />
  );
};

const FavoriteScreen = ({ navigation }) => {
  // const [listData, setListData] = useState([]);
  const homeContext = useContext(AppServicesContext);
  const listData = []

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
      <DragableList data={listData} navigation={navigation} />
    </View>
  )
}
export default FavoriteScreen

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    width: '100%'
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
})