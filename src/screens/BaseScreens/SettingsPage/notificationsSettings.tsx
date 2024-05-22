import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions, SafeAreaView } from 'react-native';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';

import Colors from 'utils/Colors';

type NotificationsSettingsPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const NotificationsSettingsPage = ({ navigation } : NotificationsSettingsPageProps) => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.overall}>
        <TouchableOpacity style={styles.arrowBorder} onPress={() => { navigation.goBack(); }}>
          <AntDesign name="arrowleft" size={24} color="rgba(27, 69, 60, 1)" style={{ alignSelf: 'center' }} />
        </TouchableOpacity>

        <Text style={styles.header}> Notifications Settings</Text>

        <View style={styles.updateField}>
          <Text style={styles.updateTextField}>Turn on push notifications</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: 'rgba(206, 210, 206, 1)', true: 'rgba(204, 85, 78, 1)' }}
              thumbColor={isEnabled ? 'white' : 'white'}
              value={isEnabled}
              onValueChange={notEnabled}
            />
          </View>
        </View>


        <View style={styles.updateField}>
          <Text style={styles.updateTextField}>Daily goal notifications</Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: 'rgba(206, 210, 206, 1)', true: 'rgba(204, 85, 78, 1)' }}
              thumbColor={isEnabled2 ? 'white' : 'white'}
              value={isEnabled2}
              onValueChange={notEnabled2}
            />
          </View>
        </View>



        <View style={styles.updateField}>
          <Text style={styles.updateTextField}>Avatar notifications</Text>
          <View style={styles.switchContainer}></View>
          <Switch
            trackColor={{ false: 'rgba(206, 210, 206, 1)', true: 'rgba(204, 85, 78, 1)' }}
            thumbColor={isEnabled3 ? 'white' : 'white'}
            value={isEnabled3}
            onValueChange={notEnabled3}
          />
        </View>
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
  header:{
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: -0.3,
    color:Colors.primary.dark,
    marginBottom: screenHeight * 0.03,
  },
  updateField: {
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(173, 192, 171, 1)', 
    display:'flex', 
    flexDirection:'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: screenHeight * 0.01,
  },
  switchContainer: {
    position: 'absolute',
    top: screenHeight * 0.007,
    right: screenWidth * 0.01,
  },
  updateTextField:{
    color: Colors.primary.dark,
    fontSize: screenHeight * 0.022,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 36,
    letterSpacing: 0.2,
    marginBottom: screenHeight * 0.014,
  },
});

export default NotificationsSettingsPage;
