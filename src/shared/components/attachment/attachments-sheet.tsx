import BottomSheet, { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useState, useEffect, useRef, useMemo, useCallback, forwardRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppIcon from '../../ui/icons';
import { theme, lightenColor, darkenColor } from '../../theme';

const AttachmentSheet = forwardRef((props: any, ref: any) => {
  // variables
  const snapPoints = useMemo(() => ["22%"], []);

  const handleSnapPress = useCallback((index) => {
    ref.current?.snapToIndex(index);
  }, []);

  const handleOpenCamera = useCallback(() => {
    props.onCamera();
    ref.current?.close();
  }, []);

  const handleOpenGallery = useCallback(() => {
    props.onGallery();
    ref.current?.close();
  }, []);

  const handleFileBrowser = useCallback(() => {
    props.onFile();
    ref.current?.close();
  }, []);

  return (
    <BottomSheetModal
      handleStyle={{ backgroundColor: styles.sheetBackground.backgroundColor, borderTopEndRadius: 20, borderTopStartRadius:20 }}
      handleIndicatorStyle={{ backgroundColor: theme.tint }}
      ref={ref} index={0} snapPoints={snapPoints}
      onChange={handleSnapPress}
    >
      <BottomSheetScrollView style={{ flex: 1, backgroundColor: styles.sheetBackground.backgroundColor }}>
        <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
          <View style={styles.buttonInnerWrapper}>
            <AppIcon name='camera' size={25} type={'awesome'} color={theme.tint} />
            <Text style={styles.sheetText}>Camera</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenGallery}>
          <View style={styles.buttonInnerWrapper}>
            <AppIcon name='photo' size={25} type={'awesome'} color={theme.tint} />
            <Text style={styles.sheetText}>Photo Gallery</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.button,borderBottomWidth:0}} onPress={handleFileBrowser}>
          <View style={styles.buttonInnerWrapper}>
            <AppIcon name='file-o' size={25} type={'awesome'} color={theme.tint} />
            <Text style={styles.sheetText}>Files Browser</Text>
          </View>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>

  );
});

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
    borderColor: theme.tint,
    borderBottomWidth: 1,
  },
  p15: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-around'

  },
  sheetText:
  {
    marginLeft: 15,
    color: theme.tint,
    textShadowColor: theme.tint,
    shadowOffset: { width: 1, height: 1 },
    fontSize: 16,
    fontFamily: 'Poppins'
  }
  ,
  sheetBackground: {
    backgroundColor: lightenColor(theme.primary, .2)
  }

});
export default AttachmentSheet;