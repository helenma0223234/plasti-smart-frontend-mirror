import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

import CloseSVG from  '../../../assets/CloseModal.svg';
import ShibaHead from '../../../assets/ShibaHead.svg';
import TextStyles from 'utils/TextStyles';
import Colors from 'utils/Colors';

interface PlasticModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const FullAlertModal: React.FC<PlasticModalProps> = ({ modalVisible, setModalVisible }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <CloseSVG />
        </TouchableOpacity>
        <View style={styles.svgContainer}>
          <ShibaHead height={100} width={100}></ShibaHead>
        </View>
        <Text style={styles.modalText}>Your pal is full! Come back later when it’s hungry again.</Text>        
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: '#DAE5D7',
    borderRadius: 20,
    padding: 38,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '40%',
    maxWidth: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  svgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight:'20%',
    marginTop:8,
  },
  modalText: {
    marginTop: 60,
    textAlign: 'center',
    color: Colors.primary.dark,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: 0.2,
  },
});

export default FullAlertModal;