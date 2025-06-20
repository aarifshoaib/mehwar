import { StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { HeaderButton } from './buttons';

const AppBack = ({ title = 'Back', iParams = null }) => {
  const navigation: any = useNavigation();
  console.log('iParams', iParams);
  const goback = () => {
    if (iParams) {
      let screenToNavigate = '';
      if (iParams.serviceName == 'AnnualLeaveRequest') {
        screenToNavigate = 'AddAnnualLeaveScreen';
      } else if (iParams.serviceName == 'SickLeaveRequest') {
        screenToNavigate = 'AddSickLeaveScreen';
      } else {
        screenToNavigate = 'HomeScreen';
      }
      navigation.navigate(screenToNavigate, iParams);
    } else {
      navigation.goBack();
    }
  };

  return (
    <HeaderButton onPress={goback} icon={'arrowleft'} type={'ant'} options={undefined} />
  );
};

export default AppBack;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.tint,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: theme.primary,
    padding: 7,
    borderRadius: 10
  },
  title: {
    fontSize: 20,
  },
});
