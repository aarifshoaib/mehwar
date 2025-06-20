import { StyleSheet, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import DummyTextbox from '../ui/fake-textboxes.control';
import BSheet from './bottom-sheet';

const MultiSelection = ({ data, title, keys, pair, isRequired, form, field, updateForm }) => {
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
    <View style={styles.container}>
      <DummyTextbox title={title} isRequired={isRequired} iconOptions={{ icon: 'search1', size: 25, color: '#B7B7B7' }}></DummyTextbox>
      <BSheet datalist={data} snap={['50%', '70%', '90%']} onSelectData={setSelectedIDs} selectedData={selectedIDs} ref={BSModalRef} keys={keys} pair={pair} title={title} />
    </View>
  )
}

export default MultiSelection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  }
})

