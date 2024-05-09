import React from 'react';
import {  SafeAreaView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { cameraOpened, cameraClosed } from 'redux/slices/cameraSlice';
import { useFocusEffect } from '@react-navigation/native';


import useAppDispatch from 'hooks/useAppDispatch';
import Colors from 'utils/Colors';
import TextStyles from 'utils/TextStyles';

type UnknownPlasticPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};
type CustomRadioButtonProps = {
  selected: boolean;
  onPress: () => void;
};

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({ selected, onPress }) => (
  <TouchableOpacity style={{ height: 33, width: 33, borderRadius: 16.5, borderWidth: 2, borderColor: Colors.primary.dark, alignItems: 'center', justifyContent: 'center', marginTop: -2 }} onPress={onPress}>
    {selected ? <Ionicons name="checkmark" size={28} color={Colors.primary.dark} /> : null}
  </TouchableOpacity>
);


const UnknownPlasticPage = ({ navigation }: UnknownPlasticPageProps) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = React.useState('first');

  useFocusEffect(
    React.useCallback(() => {
      dispatch(cameraOpened());
      return () => {};
    }, [dispatch]),
  );

  const selectButtonPressed = () => {
    // if (user)
    //   dispatch(createScan({ scannedBy: user.id, plasticNumber: plasticNum, plasticLetter: plasticTypes[plasticNum as keyof typeof plasticTypes], image: capturedPhoto }));
    navigation.navigate(BaseTabRoutes.UNKNOWN_INFO, {});
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              dispatch(cameraClosed());
              navigation.navigate(BaseTabRoutes.HOME, {});
            }}
          >
            <Ionicons name="arrow-back-outline" size={36} color={Colors.primary.dark}/>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[TextStyles.subTitle, { fontSize: 32, marginLeft:20, marginTop:8, marginBottom:40, marginRight:20 }]}>What kind of plastic 
do you have?</Text>
      <View style={styles.selectContainer}>
        <View style={styles.rowContainer}>
          <CustomRadioButton selected={checked === 'first'} onPress={() => setChecked('first')} />
          <Text style={styles.textStyle}> Soft bottle</Text>
        </View>

        <View style={styles.rowContainer}>
          <CustomRadioButton selected={checked === 'second'} onPress={() => setChecked('second')} />
          <Text style={styles.textStyle}> Hard bottle</Text>
        </View>

        <View style={styles.rowContainer}>
          <CustomRadioButton selected={checked === 'third'} onPress={() => setChecked('third')} />
          <Text style={styles.textStyle}> Food container</Text>
        </View>

        <View style={styles.rowContainer}>
          <CustomRadioButton selected={checked === 'fourth'} onPress={() => setChecked('fourth')} />
          <Text style={styles.textStyle}> Trash bag</Text>
        </View>

        <View style={styles.rowContainer}>
          <CustomRadioButton selected={checked === 'fifth'} onPress={() => setChecked('fifth')} />
          <Text style={styles.textStyle}> Detergent</Text>
        </View>
        <View style={styles.selectButtonContainer}>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => {
              selectButtonPressed();
            }}
          >
            <Text style={styles.selectButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FBFBF4',
  },
  backButtonContainer: {
    position: 'absolute',
    left: '4%',
    borderColor: '#1B453C',
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  selectContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textStyle: {
    color: Colors.primary.dark,
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25,
    letterSpacing: -0.3,
  },
  radioButton: {
    transform: [{ scale: 1.5 }], // Adjust the scale factor to fit your needs
  },
  selectButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:80,
  },
  selectButton: {
    justifyContent: 'center',
    width: 180,
    height: 48,
    backgroundColor: '#1B453C',
    borderRadius: 10,
    borderWidth: 1,
  },
  selectButtonText: {
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

export default UnknownPlasticPage;
