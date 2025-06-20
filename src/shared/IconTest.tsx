import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const IconTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vector Icons Test</Text>
      
      <View style={styles.iconRow}>
        <Icon name="rocket" size={30} color="#900" />
        <Text style={styles.iconLabel}>FontAwesome Icon</Text>
      </View>

      <View style={styles.iconRow}>
        <MaterialIcon name="face" size={30} color="#4285F4" />
        <Text style={styles.iconLabel}>MaterialIcon</Text>
      </View>

      <View style={styles.iconRow}>
        <Ionicon name="ios-heart" size={30} color="#E91E63" />
        <Text style={styles.iconLabel}>Ionicon</Text>
      </View>

      <View style={styles.iconRow}>
        <Fontisto name="ship" size={30} color="#009688" />
        <Text style={styles.iconLabel}>Fontisto</Text>
      </View>
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
});

export default IconTest;
