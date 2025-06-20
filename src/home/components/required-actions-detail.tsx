import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { theme } from '../../shared/theme';
import { ActionButton } from '../../shared/ui/buttons';
import React from 'react';
import moment from 'moment';

const DetailedActions = ({ modalData, modalVisible, closeModal }) => {
  const Approve = () => {
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderText}>
              {modalData.service_sub_type} {modalData.service_type} Request
            </Text>
            <Text style={styles.labelText}>Name :</Text>
            <Text style={styles.labelValues}>{modalData.requester}</Text>

            <Text style={styles.labelText}>Email :</Text>
            <Text style={styles.labelValues}>{modalData.requester_email}</Text>

            <Text style={styles.labelText}>Start Date :</Text>
            <Text style={styles.labelValues}>
              {modalData.request_start_date}
            </Text>

            <Text style={styles.labelText}>End Date :</Text>
            <Text style={styles.labelValues}>{modalData.request_end_date}</Text>

            <Text style={styles.labelText}>Leave Day(s) :</Text>
            <Text style={styles.labelValues}>{modalData.requested_days}</Text>

            <Text style={styles.labelText}>Pending since :</Text>
            <Text style={styles.labelValues}>{`${moment(
              new Date(modalData.updatedAt)
            ).fromNow()}`}</Text>

            <Text style={styles.labelText}>Comments :</Text>
            <Text style={styles.labelValues}>
              {modalData.requester_comments}
            </Text>

            <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <ActionButton
                text='Close'
                color={theme.primaryDark}
                onPress={closeModal}
              />
              <ActionButton text='Reject' onPress={closeModal} />
              <ActionButton text='Approve' onPress={() => Approve()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeaderText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  labelText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.primaryDark,
  },
  labelValues: {
    fontSize: 15,
    marginBottom: 10,
  },
});
export default DetailedActions;
