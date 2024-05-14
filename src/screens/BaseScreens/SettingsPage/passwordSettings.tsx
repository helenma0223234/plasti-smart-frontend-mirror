import React, { useState } from 'react';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

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





const PasswordSettings = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(0);
  const [passwordVisible2, setPasswordVisible2] = useState(null);
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowBorder} onPress={() => { navigation.goBack(); }}>
        <AntDesign name="arrowleft" size={24} color="rgba(27, 69, 60, 1)" style={{ alignSelf: 'center' }} />
      </TouchableOpacity>

      <Text style={{ fontSize: 30, marginBottom: 30, color: 'rgba(27, 69, 60, 1)', fontWeight:'bold' }}>Password Settings</Text>

      <View style={styles.inputContainer}>
        <Text style={{ color: 'rgba(27, 69, 60, 1)', fontSize: 18, fontWeight:'bold' }}>Current password</Text>
        <TextInput
          placeholder='eg. ".........." '
          style={styles.inputDesign}
          required
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {passwordVisible ? visibleeye() : eyenotvisible()}
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{ color: 'rgba(27, 69, 60, 1)', fontSize: 18, fontWeight:'bold' }}>Update password</Text>
        <TextInput
          placeholder='eg. ".........." '
          style={styles.inputDesign}
          required
          secureTextEntry={!passwordVisible2}
        />
        <TouchableOpacity onPress={togglePasswordVisibility2}>
          {passwordVisible2 ? visibleeye2() : eyenotvisible2()}
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{ color: 'rgba(27, 69, 60, 1)', fontSize: 18, fontWeight:'bold' }}>Confirm password</Text>
        <TextInput
          placeholder='eg. ".........." '
          style={styles.inputDesign}
          required
          secureTextEntry={!passwordVisible3}
        />
        <TouchableOpacity onPress={togglePasswordVisibility3}>
          {passwordVisible3 ? visibleeye3() : eyenotvisible3()}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.passwordButton}>
        <Text style={{ color: 'rgba(218, 229, 215, 1)', fontSize: 15, fontWeight: 'bold' }}>CHANGE PASSWORD</Text>
      </TouchableOpacity>





    </View>
  );
};

export default PasswordSettings;









const styles = StyleSheet.create({
  container: {
    flex: 1,
    boxSizing: 'border-box',
    paddingLeft: 20,
    paddingRight: 20, 
    paddingTop: 30,
  },
  arrowBorder:{
   
    borderColor: 'rgba(27, 69, 60, 1)',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 40,
    width: 40,
    borderRadius: 100,
    marginBottom: 20,
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
    borderColor: 'rgba(27, 69, 60, 1)',
    borderWidth: 1,
    borderStyle: 'solid',
   
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    color: 'rgba(27, 69, 60, 1)',
    fontSize: 16,
  },
  eye:{
    color: 'rgba(27, 69, 60, 1)',
    position: 'relative',
    left: '85%',
    bottom: '180%',
    height: 20,
    width: 20,
  },
  passwordButton:{
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(27, 69, 60, 1)',
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default PasswordSettings;
