import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { useState } from 'react';
import { theme } from '../theme';
import { ActionButton } from '../ui/buttons';
import DetailedActions from '../../home/components/required-actions-detail';
import React from 'react';
import moment from 'moment';

const NotificationBox = ({ info }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const linkHandler = () => {
    setModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity style={styles.boxWrapper}>
        <View style={styles.boxInnerWrapper}>
          <View style={{ flex: 1 }}>
            <Text>
              <Text style={styles.highlight}>{info.requester}</Text>
              <Text>
                {' '}
                has applied for {info.service_sub_type} {info.service_type} for{' '}
              </Text>
              <Text style={styles.highlight}>{info.requested_days} days.</Text>
            </Text>
            <Text>
              <View style={styles.dot}></View>
              <Text> {` ${moment(new Date(info.updatedAt)).fromNow()}`}</Text>
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <ActionButton text='View' onPress={linkHandler} />
          </View>
        </View>
      </TouchableOpacity>
      <DetailedActions
        modalData={info}
        modalVisible={modalVisible}
        closeModal={closeModal}
      />
    </>
  );
};

export default NotificationBox;

const styles = StyleSheet.create({
  boxWrapper: {
    borderRadius: theme.controlBorderRadius,
    borderColor: theme.controlBorderColor,
    backgroundColor: '#F0F0F0',
    margin: 10,
    padding: 15,
    width: 300,
  },
  boxInnerWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  highlight: {
    fontWeight: 'bold',
    color: theme.secondary,
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
  },
});
