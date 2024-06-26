import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

import RedRecycleSymbol from '../../../assets/RedTriangleRecycle.svg';
import CloseSVG from  '../../../assets/CloseModal.svg';
import Colors from 'utils/Colors';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { BaseNavigationList, BaseTabRoutes } from 'navigation/routeTypes';
import { cameraClosed } from 'redux/slices/cameraSlice';
import { recycledRedux } from 'redux/slices/scanSlice';
import { createScan } from 'redux/slices/usersSlice';
import { StackNavigationProp } from '@react-navigation/stack';

interface PlasticModalProps {
  navigation: StackNavigationProp<BaseNavigationList>;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  plasticType: number;
  nestedModal?: boolean;
  upperModalVisible?: boolean;
  setUpperModalVisible?: (visible: boolean) => void;
}

type WarningMessages = {
  [key: number]: string;
};

const warnings:WarningMessages = {
  1: 'PET is not the safest to reuse.',
  3: 'PVC is not the safest to reuse.',
  6: 'PS is not the safest to reuse.',
  7: 'Plastic Type 7 is not the safest to reuse.',
};

const ReuseWarningModal: React.FC<PlasticModalProps> = ({navigation, modalVisible, setModalVisible, plasticType, nestedModal=false, upperModalVisible, setUpperModalVisible }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.selectedUser);
  
  const recycleButtonPressed = () => {
    console.log('recycle button pressed on reuse warning modal');
    if (user) {
      dispatch(recycledRedux());
      dispatch(createScan({ scannedBy: user.id, plasticNumber: plasticType, image: null, reused: false, recycled: true }));
    }
    dispatch(cameraClosed());
    if (nestedModal && upperModalVisible && setUpperModalVisible) {
      setUpperModalVisible(false);
    }
    setModalVisible(false);
    navigation.navigate(BaseTabRoutes.SCAN_COMPLETE, {});
  };

  return (
    <Modal
      animationType="none"
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
            <RedRecycleSymbol height={100} width={100} style={{ left: -10, bottom: 5 }}></RedRecycleSymbol>
            <View style={{ position: 'relative', left: -6, bottom: 70, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 30, fontWeight: '700', color:Colors.primary.dark }}>{plasticType}</Text>
            </View>
          </View>
          <Text style={styles.modalText}>{warnings[plasticType]} Be careful when reusing this plastic and double check labels.</Text>        
          <View style={styles.selectButtonContainer}>
            <TouchableOpacity
              style={[styles.bottomSheetSelectButton, { backgroundColor: '#1B453C', marginBottom: 14 }]}
              onPress={() => {
                recycleButtonPressed();
              }}
            >
              <Text style={styles.bottomSheetSelectButtonText}>RECYCLE INSTEAD</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>);
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  modalView: {
    margin: 45,
    backgroundColor: '#DAE5D7',
    borderRadius: 20,
    padding: 34,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '44%',
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
  modalText: {
    marginTop: -4,
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.primary.dark,
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  svgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight:'30%',
    marginTop:20,
  },
  svgTitle: {
    fontSize: 34,
    color: Colors.primary.dark,
    fontWeight: 'bold',
    right: '49%',
    bottom: '36%',
    position: 'absolute',
  },
  selectButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
  },
  selectButton: {
    justifyContent: 'center',
    width: 200,
    height: 60,
    backgroundColor: '#1B453C',
    borderRadius: 10,
    borderWidth: 1,
  },
  selectButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  bottomSheetSelectButton: {
    justifyContent: 'center',
    width: 180,
    height: 46,
    backgroundColor: '#1B453C',
    borderRadius: 10,
    borderWidth: 1,
  },
  bottomSheetSelectButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: -0.3,
    textTransform: 'uppercase',
  },
});

export default ReuseWarningModal;