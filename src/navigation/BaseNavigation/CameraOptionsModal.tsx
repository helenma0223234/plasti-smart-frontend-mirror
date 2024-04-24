import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BaseNavigationList, BaseTabRoutes } from '../routeTypes'; // Adjust import as necessary
import { StackNavigationProp } from '@react-navigation/stack';

import Colors from 'utils/Colors';
import TextStyles from 'utils/TextStyles';

interface CameraOptionsModalProps {
  isVisible: boolean;
  onClose: () => void;
  navigation: StackNavigationProp<BaseNavigationList>;
}
  
const CameraOptionsModal: React.FC<CameraOptionsModalProps> = ({ isVisible, onClose, navigation }) => {

  const handleOptionSelect = (screen: keyof BaseNavigationList) => {
    onClose();
    console.log(screen);
    navigation.navigate(screen, {});
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.buttonBlock1}>
            <TouchableOpacity onPress={() => handleOptionSelect(BaseTabRoutes.CAMERA)}>
              <Text style={[TextStyles.regular, { textAlign: 'center', color: '#FFFFFF', fontSize:14 }]}>Scan label</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.buttonBlock}>
              <TouchableOpacity onPress={() => handleOptionSelect(BaseTabRoutes.MANUAL_ENTRY)}>
                <Text style={[TextStyles.regular, { textAlign: 'center', color: '#FFFFFF', fontSize:14 }]}>Manually enter</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonBlock}>
              <TouchableOpacity onPress={() => handleOptionSelect(BaseTabRoutes.UNKNOWN_PLASTIC)}>
                <Text style={[TextStyles.regular, { textAlign: 'center', color: '#FFFFFF', fontSize:14 }]}>No label</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: '12%',
    width: '100%',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    shadowOpacity: 0.45,
    shadowRadius: 5.84,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonBlock: {
    flex: 1,
    margin: 6,
    padding: 10,
    backgroundColor: Colors.primary.dark,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: '16%',
    // marginBottom: '-10%',
    alignSelf: 'center',
  },
  buttonBlock1: {
    // flex: 1,
    margin: 6,
    padding: 10,
    backgroundColor: Colors.primary.dark,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: '-10%',
    width: '50%',
    // height: 70,
    alignSelf: 'center',
  },
});

export default CameraOptionsModal;
