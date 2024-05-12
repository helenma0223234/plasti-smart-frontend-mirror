import React,  { useEffect, useRef }  from 'react';
import { Animated, Modal, View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
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
  const modalAnimation = useRef(new Animated.Value(0)).current;

  const handleOptionSelect = (screen: keyof BaseNavigationList) => {
    onClose();
    navigation.navigate(screen, {});
  };

  useEffect(() => {
    Animated.timing(modalAnimation, {
      toValue: isVisible ? 1 : 0,
      duration: 550,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose} >
        <Animated.View style={[styles.modalContainer, { opacity: modalAnimation }]}>

          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.buttonBlock1}>
                <TouchableOpacity onPress={() => handleOptionSelect(BaseTabRoutes.CAMERA)}>
                  <Text style={[TextStyles.regular, { textAlign: 'center', color: '#FFFFFF', fontSize:16 }]}>Scan label</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonBlock1}>
                <TouchableOpacity onPress={() => handleOptionSelect(BaseTabRoutes.MANUAL_ENTRY)}>
                  <Text style={[TextStyles.regular, { textAlign: 'center', color: '#FFFFFF', fontSize:16 }]}>Manually enter</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonBlock1}>
                <TouchableOpacity onPress={() => handleOptionSelect(BaseTabRoutes.UNKNOWN_PLASTIC)}>
                  <Text style={[TextStyles.regular, { textAlign: 'center', color: '#FFFFFF', fontSize:16 }]}>No label</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex:1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  modalContent: {
    marginTop:'140%',
    padding: 28,
    backgroundColor: 'transparent',
    alignItems: 'center',
    shadowOpacity: 0.45,
    shadowRadius: 5.84,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonBlock1: {
    margin: 6,
    padding: 14,
    backgroundColor: Colors.primary.dark,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    alignSelf: 'center',
  },
});

export default CameraOptionsModal;
