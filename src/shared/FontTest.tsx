import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from './theme';

const FontTest = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Font Test</Text>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Poppins Fonts</Text>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>Poppins:</Text>
          <Text style={styles.fontPoppins}>This is Poppins Font</Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>Poppins-Thin:</Text>
          <Text style={styles.fontPoppinsThin}>This is Poppins-Thin Font</Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>Poppins-Light:</Text>
          <Text style={styles.fontPoppinsLight}>This is Poppins-Light Font</Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>Poppins-Regular:</Text>
          <Text style={styles.fontPoppinsRegular}>This is Poppins-Regular Font</Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>Poppins-Medium:</Text>
          <Text style={styles.fontPoppinsMedium}>This is Poppins-Medium Font</Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>Poppins-SemiBold:</Text>
          <Text style={styles.fontPoppinsSemiBold}>This is Poppins-SemiBold Font</Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>Poppins-Bold:</Text>
          <Text style={styles.fontPoppinsBold}>This is Poppins-Bold Font</Text>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>ADPorts Fonts</Text>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>AdportsBold:</Text>
          <Text style={styles.fontAdportsBold}>This is AdportsBold Font</Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>AdportsRegular:</Text>
          <Text style={styles.fontAdportsRegular}>This is AdportsRegular Font</Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>AdportsThin:</Text>
          <Text style={styles.fontAdportsThin}>This is AdportsThin Font</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>From Theme Object</Text>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>theme.fontFamily:</Text>
          <Text style={{fontFamily: theme.fontFamily, fontSize: 16}}>
            This is theme.fontFamily
          </Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>theme.fontFamilyThin:</Text>
          <Text style={{fontFamily: theme.fontFamilyThin, fontSize: 16}}>
            This is theme.fontFamilyThin
          </Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>theme.fontFamilyLight:</Text>
          <Text style={{fontFamily: theme.fontFamilyLight, fontSize: 16}}>
            This is theme.fontFamilyLight
          </Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>theme.fontFamilyRegular:</Text>
          <Text style={{fontFamily: theme.fontFamilyRegular, fontSize: 16}}>
            This is theme.fontFamilyRegular
          </Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>theme.fontFamilyMedium:</Text>
          <Text style={{fontFamily: theme.fontFamilyMedium, fontSize: 16}}>
            This is theme.fontFamilyMedium
          </Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>theme.fontSemiBold:</Text>
          <Text style={{fontFamily: theme.fontSemiBold, fontSize: 16}}>
            This is theme.fontSemiBold
          </Text>
        </View>
        
        <View style={styles.fontRow}>
          <Text style={styles.fontLabel}>theme.fontFamilyBold:</Text>
          <Text style={{fontFamily: theme.fontFamilyBold, fontSize: 16}}>
            This is theme.fontFamilyBold
          </Text>
        </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 30,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingBottom: 5,
  },
  fontRow: {
    flexDirection: 'column',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  fontLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  fontPoppins: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  fontPoppinsThin: {
    fontFamily: 'Poppins-Thin',
    fontSize: 16,
  },
  fontPoppinsLight: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
  fontPoppinsRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  fontPoppinsMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  fontPoppinsSemiBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  fontPoppinsBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  fontAdportsBold: {
    fontFamily: 'AdportsBold',
    fontSize: 16,
  },
  fontAdportsRegular: {
    fontFamily: 'AdportsRegular',
    fontSize: 16,
  },
  fontAdportsThin: {
    fontFamily: 'AdportsThin',
    fontSize: 16,
  },
});

export default FontTest;
