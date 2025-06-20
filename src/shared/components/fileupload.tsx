import { StyleSheet, Touchable, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import BSheetFile from './bottom-sheet-file';
import FileUploadControl from '../ui/fileupload.control';

const FileUploadBox = ({ title, isRequired, form, field, updateForm }) => {
  const BSModalRef = useRef(null);
  const [selectedIDs, setSelectedIDs] = useState([]);

  const openSheet = () => {
    BSModalRef.current?.present();
  }



  useEffect(() => {
    if (updateForm) {
      updateForm({ ...form, [field]: selectedIDs })
    }
  }, [selectedIDs]);

  return (
    <View style={{}}>
      <FileUploadControl title={title} isRequired={isRequired} onSelectData={setSelectedIDs} selectedData={selectedIDs} selections={selectedIDs} iconOptions={{ icon: 'search1', size: 25, color: '#B7B7B7' }} onclick={openSheet} />
      <BSheetFile onSelectData={setSelectedIDs} selectedData={selectedIDs} ref={BSModalRef} title={title} />
    </View>
  )
}

export default FileUploadBox

const styles = StyleSheet.create({

})