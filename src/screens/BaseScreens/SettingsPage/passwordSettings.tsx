import React, { useState } from 'react';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';

import Colors from 'utils/Colors';

const visibleeye = () => ( 
  <Entypo name="eye" size={20} color='rgba(27, 69, 60, 1)' style={styles.eye} /> 
);
const eyenotvisible = () => (
  <Feather name="eye-off" size={20} color='rgba(27, 69, 60, 1)' style={styles.eye} />
);


const visibleeye2 = () => ( 
  <Entypo name="eye" size={20} color='rgba(27, 69, 60, 1)' style={styles.eye} /> 
);
const eyenotvisible2 = () => (
  <Feather name="eye-off" size={20} color='rgba(27, 69, 60, 1)' style={styles.eye} />
);


const visibleeye3 = () => ( 
  <Entypo name="eye" size={20} color='rgba(27, 69, 60, 1)' style={styles.eye} /> 
);
const eyenotvisible3 = () => (
  <Feather name="eye-off" size={20} color='rgba(27, 69, 60, 1)' style={styles.eye} />
);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type PasswordSettingsPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

const PasswordSettingsPage = ({ navigation }: PasswordSettingsPageProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordVisible3, setPasswordVisible3] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const togglePasswordVisibility3 = () => {
    setPasswordVisible3(!passwordVisible3);
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overall}>
        <TouchableOpacity style={styles.arrowBorder} onPress={() => { navigation.goBack(); }}>
          <AntDesign name="arrowleft" size={screenHeight * 0.03} color={Colors.primary.dark}  style={{ alignSelf:'center' }}/>
        </TouchableOpacity>

        <Text style={styles.header}>Password Settings</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.updateTextField}>Current password</Text>
          <TextInput
            style={styles.inputDesign}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {passwordVisible ? visibleeye() : eyenotvisible()}
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.updateTextField}>Update password</Text>
          <TextInput
            style={styles.inputDesign}
            secureTextEntry={!passwordVisible2}
          />
          <TouchableOpacity onPress={togglePasswordVisibility2}>
            {passwordVisible2 ? visibleeye2() : eyenotvisible2()}
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.updateTextField}>Confirm password</Text>
          <TextInput
            style={styles.inputDesign}
            secureTextEntry={!passwordVisible3}
          />
          <TouchableOpacity onPress={togglePasswordVisibility3}>
            {passwordVisible3 ? visibleeye3() : eyenotvisible3()}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.passwordButton}>
          <Text style={{ color: '#FBFBF4', fontSize: screenHeight * 0.018, fontWeight: 'bold' }}>CHANGE PASSWORD</Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBF4',
  },
  overall:{
    margin:screenWidth * 0.05,
  },
  arrowBorder:{
    borderColor: 'rgba(27, 69, 60, 1)',
    borderWidth: 1,
    borderStyle: 'solid',
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    borderRadius: 100,
    marginBottom: screenHeight * 0.02,
    justifyContent: 'center',
  },
  inputContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems:'left',
    justifyContent: 'center',
    marginBottom: 8,
  },
  inputDesign:{
    width: '100%',
    borderColor: Colors.primary.dark,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: screenHeight * 0.018,
    marginTop: screenHeight * 0.004,
    color: Colors.primary.dark,
    fontSize: screenHeight * 0.018,
  },
  header:{
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: -0.3,
    color:Colors.primary.dark,
    marginBottom: screenHeight * 0.03,
  },
  eye:{
    color: Colors.primary.dark,
    position: 'relative',
    left: screenWidth * 0.79,
    bottom: screenHeight * 0.04,
    height: screenHeight * 0.02,
    width: screenHeight * 0.02,
  },
  passwordButton:{
    width: '100%',
    height: screenHeight * 0.06,
    borderRadius: 10,
    backgroundColor: 'rgba(27, 69, 60, 1)',
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: screenHeight * 0.06,
  },
  updateTextField:{
    color: Colors.primary.dark,
    fontSize: screenHeight * 0.020,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 36,
    letterSpacing: 0.2,
  },
});

export default PasswordSettingsPage;
