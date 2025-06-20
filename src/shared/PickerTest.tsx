import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const PickerTest = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Picker Test</Text>
      
      <View style={styles.iconRow}>
        <Icon name="rocket" size={30} color="#900" />
        <Text style={styles.iconLabel}>Vector Icon Test</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select a programming language:</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="JavaScript" value="javascript" />
          <Picker.Item label="TypeScript" value="typescript" />
          <Picker.Item label="Python" value="python" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="C#" value="csharp" />
          <Picker.Item label="Swift" value="swift" />
        </Picker>
      </View>
      
      <Text style={styles.result}>Selected: {selectedLanguage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  pickerContainer: {
    width: '100%',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 10,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  }
});

export default PickerTest;
