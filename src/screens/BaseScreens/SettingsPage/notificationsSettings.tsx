import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const NotificationsSettings = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const notEnabled = ()=>(
    setIsEnabled(!isEnabled)
  );



  const [isEnabled2, setIsEnabled2] = useState(false);

  const notEnabled2 = ()=>(
    setIsEnabled2(!isEnabled2) 
  );



  const [isEnabled3, setIsEnabled3] = useState(false);

  const notEnabled3 = ()=>(
    setIsEnabled3(!isEnabled3) 
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowBorder} onPress={() => { navigation.goBack(); }}>
        <AntDesign name="arrowleft" size={24} color="rgba(27, 69, 60, 1)" style={{ alignSelf: 'center' }} />
      </TouchableOpacity>

      <Text style={{ fontSize: 30, marginBottom: 30, fontWeight:'bold', color: 'rgba(27, 69, 60, 1)' }}>Notifications Settings</Text>

      <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(173, 192, 171, 1)', display:'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ color: 'rgba(27, 69, 60, 1)', fontWeight: 'bold', fontSize: 18 }}>Turn on push notifications</Text>
        <Switch
          trackColor={{ false: 'rgba(206, 210, 206, 1)', true: 'rgba(204, 85, 78, 1)' }}
          thumbColor={isEnabled ? 'white' : 'white'}
          value={isEnabled}
          onValueChange={notEnabled}
        />
      </View>


      <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(173, 192, 171, 1)', display:'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ color: 'rgba(27, 69, 60, 1)', fontWeight: 'bold', fontSize: 18 }}>Daily goal notifications</Text>
        <Switch
          trackColor={{ false: 'rgba(206, 210, 206, 1)', true: 'rgba(204, 85, 78, 1)' }}
          thumbColor={isEnabled2 ? 'white' : 'white'}
          value={isEnabled2}
          onValueChange={notEnabled2}
        />
      </View>



      <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(173, 192, 171, 1)', display:'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ color: 'rgba(27, 69, 60, 1)', fontWeight: 'bold', fontSize: 18 }}>Avatar notifications</Text>
        <Switch
          trackColor={{ false: 'rgba(206, 210, 206, 1)', true: 'rgba(204, 85, 78, 1)' }}
          thumbColor={isEnabled3 ? 'white' : 'white'}
          value={isEnabled3}
          onValueChange={notEnabled3}
        />
      </View>
    </View>
  );
};

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
});

export default NotificationsSettings;
