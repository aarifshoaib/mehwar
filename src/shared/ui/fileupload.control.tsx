import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign';
import { theme } from '../theme';
import LabelControl from './label.control';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { Chip } from '@rneui/themed';
import AppIcon from './icons';

const FileUploadControl = (
  {
    title,
    isRequired = false,
    placeholderOptions = { text: null, color: '#666' },
    iconOptions = { icon: null, size: 20, color: theme.primary },
    inputOptions = { style: { height: null } },
    onclick,
    selections,
    onSelectData,
    selectedData
  }) => {


  useEffect(() => {
  }, [selections])


  const deleteImage = async (uri: string) => {
    onSelectData(selectedData.filter((i) => i.uri !== uri));
  }


  return (
    <View style={styles.mainWrapper}>
      <View style={styles.inputWrapper}>
        <LabelControl isRequired={isRequired} title={title} />
        <TouchableOpacity onPress={onclick}>
          <View style={{ ...styles.input, ...inputOptions?.style, minHeight: 40, height: (!inputOptions.style?.height) ? 80 : inputOptions.style?.height, paddingLeft: (iconOptions.icon ? 35 : 10) }} >
          </View>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.row}>
          {selections.map((item) => {
            return (
              <View key={item.name} style={{ flex: 1, margin: 10, width: '100%' }}>
                {item.stype === 'image' && <Image source={{ uri: `data:image/jpeg;base64,${item.data}` }} style={{ width: 100, height: 100 }} />}
                <Text style={{ flex: 1 }}>{item.name}.{item.type}</Text>
                <Pressable onPress={() => deleteImage(item.uri)}>
                  <AppIcon type={'ionic'} name={'trash'} size={30} color={'red'} />
                </Pressable>
              </View>
            )
          })}
        </ScrollView>
      </View >
    </View >
  )
}

export default FileUploadControl

const styles = StyleSheet.create({
  mainWrapper: {
    // flex: 1,
  },
  inputWrapper: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  iconWrapper: {
    position: 'absolute',
    zIndex: 1000,
    marginTop: 30,
    right: 5,
    top: 0
  },
  label: {
    flex: 1
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  row:
  {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%'
  }

})