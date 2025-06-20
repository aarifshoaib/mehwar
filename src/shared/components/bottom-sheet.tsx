import { BottomSheetModal, BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useState, useEffect, forwardRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../theme';
import { appImages } from '../constants/images';
import Textbox from '../ui/textboxes.control';
import { Chip } from '@rneui/themed';
import LabelControl from '../ui/label.control';

const BSheet = forwardRef((props: any, ref: any) => {
  const { datalist, onSelectData, selectedData, keys, pair, title } = props;
  const snapPoints = props.snap || ['90%'];
  const [data, setData] = useState(datalist);
  const [search, setSearch] = useState({ "search": "" });
  const [selectedIDs, setSelectedIDs] = useState([]);

  useEffect(() => {
    if (search.search !== '') {
      setData(datalist.filter((x) => x.name.toLowerCase().includes(search.search.toLowerCase())))
    }
    onSelectData(selectedIDs);
  }, [search.search, selectedIDs]);

  const handleSelection = (item) => {
    if (!checkIndexSelected(item)) {
      const index = data.findIndex((x) => x[keys] === item);
      setSelectedIDs([...selectedIDs, data[index]]);
    } else {
      const index = selectedIDs.findIndex((x) => x[keys] === item);
      setSelectedIDs(selectedIDs.filter(function (x) {
        return x[keys] !== item
      }))
    }
  }

  const checkIndexSelected = (item) => {
    const fdata = selectedIDs.filter((x) => x[keys] === item);
    if (fdata.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  const renderItem = (item) => {

    return (
      <View style={[styles.row, { marginVertical: 6 }]} key={item[keys]}>
        <View style={[styles.FLrow, { width: '50%' }]}>
          {item.icon && <Image style={styles.image} source={appImages[item.icon]} resizeMode={'contain'} />}
          <Text>{item[pair]}</Text>
        </View>
        <TouchableOpacity style={styles.radioContainer} onPress={() => { handleSelection(item[keys]) }}>
          <View style={styles.outerRadio}>
            {checkIndexSelected(item[keys]) && <View style={styles.innerRadio}></View>}
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}
        enablePanDownToClose={true}>
        <View style={{ paddingHorizontal: 15 }}>
          <LabelControl title={title} />
          <View>
            <Textbox
              form={search}
              field={'search'}
              title={''}
              placeholder='Search here...'
              updateForm={setSearch}
            />
          </View>
        </View>
        <View style={[styles.FLrow, { flexWrap: 'wrap' }]}>
          {selectedIDs.map((item) => {
            return (
              <Chip key={item[keys]}
                icon={{
                  name: 'close',
                  type: 'font-awesome',
                  size: 20,
                  color: theme.primaryDark,
                }}
                iconRight
                onPress={() => handleSelection(item[keys])}
                title={item[pair]}
                containerStyle={{ marginVertical: 3, marginHorizontal: 3 }}
              />
            )
          })}
        </View>
        <View style={styles.divider}>
        </View>
        <BottomSheetScrollView>
          <View >
            {data.map(renderItem)}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>

    </View>);
})
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%'
  },
  title: {
    fontWeight: "900",
    letterSpacing: .5,
    fontSize: theme.controlLabelFontSize,
    color: theme.primary
  },
  divider: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    marginVertical: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  FLrow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  subtitle: {
    color: theme.secondaryDark,
    fontSize: theme.pageFontSize,
    fontWeight: "bold"
  },
  image: {
    maxHeight: 25,
    maxWidth: 25,
    marginRight: 10
  },
  text: {
    fontSize: 17,
    color: theme.primaryDark
  },
  radioContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
  outerRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.primaryDark,
    marginRight: 10,
  },
  innerRadio: {
    backgroundColor: theme.primaryDark,
    margin: 2,
    flex: 1,
    borderRadius: 50
  }
});
export default BSheet;