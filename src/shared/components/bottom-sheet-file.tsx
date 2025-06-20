import { BottomSheetModal, BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useState, useEffect, forwardRef } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import * as DocumentPicker from 'expo-document-picker';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppIcon from '../ui/icons';
import * as FileSystem from 'expo-file-system';
import RNFS from 'react-native-fs';

const updDir = FileSystem.documentDirectory + 'uploads/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(updDir);
  console.log(dirInfo);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(updDir, { intermediates: true })
  }
}

const BSheetFile = forwardRef((props: any, ref: any) => {

  const [images, setImages] = useState([]);
  const { onSelectData, title, selectedData } = props;
  const snapPoints = ["20%"];

  useEffect(() => {
    onSelectData(images);
  }, [images]);


  useFocusEffect(
    React.useCallback(() => {
      return () => ref.current?.close()
    }, [])
  );

  const selectImage = async (useLibrary: boolean) => {
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      saveImage(result.assets[0].uri);
    }
  };


  const saveImage = async (curi: string) => {
    const filePath = `${RNFS.DocumentDirectoryPath}/MyPhoto.jpg`;
    let id = images.length + 1;
    // let name = uri.split('.')[0];
    // let type = uri.split('.')[1];
    // const filename = new Date().getTime() + '.' + type;
    const dest = filePath;
    console.log('1', curi);
    console.log('2', dest);
    await FileSystem.copyAsync({ from: curi, to: dest });

    convertToBase64(dest, 'image');
  }

  const selectDoument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: false,
    });
    convertToBase64(result.assets[0], 'document');
  };


  const convertToBase64 = (assets, stype) => {
    let uri = assets.split('/').pop();
    let id = images.length + 1;
    let name = uri.split('.')[0];
    let type = uri.split('.')[1];
    RNFetchBlob.fs.readFile(assets, 'base64')
      .then((data) => {
        if (data != '') {
          var info = { id, name, type, stype, uri: assets.uri, data };
          setImages([...images, info]);
          ref.current?.close();
        }
      })
  }

  const saveToState = () => {
    try {
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <BottomSheetScrollView>
        <TouchableOpacity style={styles.button} onPress={() => selectImage(false)}>
          <View style={styles.buttonInnerWrapper}>
            <AppIcon name='camera' size={25} type={'awesome'} color={'green'} />
            <Text style={{ marginLeft: 15 }}>Camera</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => selectImage(true)}>
          <View style={styles.buttonInnerWrapper}>
            <AppIcon name='photo' size={25} type={'awesome'} color={'green'} />
            <Text style={{ marginLeft: 15 }}>Photo Gallery</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => selectDoument()}>
          <View style={styles.buttonInnerWrapper}>
            <AppIcon name='file-o' size={25} type={'awesome'} color={'green'} />
            <Text style={{ marginLeft: 15 }}>Files Browse</Text>
          </View>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>

  );
})
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonInnerWrapper: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    width: '40%'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  p15: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-around'

  },

});
export default BSheetFile;