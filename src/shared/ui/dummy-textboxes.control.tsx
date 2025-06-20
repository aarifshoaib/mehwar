import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign';
import { theme } from '../theme';
import LabelControl from './label.control';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { Chip } from '@rneui/themed';

const DummyTextbox = (
  {
    title,
    isRequired = false,
    placeholderOptions = { text: null, color: '#666' },
    iconOptions = { icon: null, size: 20, color: theme.primaryColor },
    inputOptions = { style: { height: null } },
    onclick,
    keys,
    pair,
    selections
  }) => {


  return (
    <View style={styles.mainWrapper}>
      {iconOptions.icon && <View style={styles.iconWrapper}>
        <Icon name={iconOptions.icon} size={iconOptions.size} color={iconOptions.color} onPress={onclick} />
      </View>}
      <View style={styles.inputWrapper}>
        <LabelControl isRequired={isRequired} title={title} />
        <TouchableOpacity onPress={onclick}>
          <View style={{ ...styles.input, ...inputOptions?.style, minHeight: 40, height: (!inputOptions.style?.height) ? 80 : inputOptions.style?.height, paddingLeft: (iconOptions.icon ? 35 : 10) }} >
            <ScrollView contentContainerStyle={styles.row}>
              {selections.map((item) => {
                return (
                  <Chip key={item[keys]}
                    title={item[pair]}
                    containerStyle={{ marginVertical: 2, marginHorizontal: 3 }}
                  />
                )
              })}
            </ScrollView>
          </View>

        </TouchableOpacity>
      </View >
    </View >
  )
}

export default DummyTextbox

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