import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import FontTest from './FontTest';
import AppMain from '../../AppMain';
import AppText from './ui/AppText';

const AppWithFontTest = () => {
  const [showFontTest, setShowFontTest] = useState(true);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setShowFontTest(!showFontTest)}
        >
          <AppText bold style={styles.buttonText}>
            {showFontTest ? 'Switch to Main App' : 'Switch to Font Test'}
          </AppText>
        </TouchableOpacity>
      </SafeAreaView>
      
      {showFontTest ? <FontTest /> : <AppMain />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#668CB0',
    zIndex: 10,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#3B5998',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AppWithFontTest;
