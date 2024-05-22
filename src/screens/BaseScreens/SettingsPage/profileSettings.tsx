/* eslint-disable max-len */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';

import Colors from 'utils/Colors';

type ProfileSettingsPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileSettingsPage = ({ navigation } : ProfileSettingsPageProps) => {
  const pressPicker = ()=>(
    navigation.navigate(BaseTabRoutes.AVATAR_CUSTOMIZATION, {})
  );

 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overall}>
        <TouchableOpacity style={styles.arrowBorder} onPress={()=>{navigation.goBack();}} > 
          <AntDesign name="arrowleft" size={screenHeight * 0.03} color={Colors.primary.dark}  style={{ alignSelf:'center' }}/>
        </TouchableOpacity>
      
        <Text style={{ fontSize: 30, marginBottom: screenHeight * 0.03, fontWeight:'bold', color: Colors.primary.dark }}>Profile Settings</Text>

        <View style={{ alignSelf: 'center', width:screenHeight * 0.16, height:screenHeight * 0.16, backgroundColor: 'rgba(218, 229, 215, 1)', borderRadius: 100, justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: screenHeight * 0.02 }}>
          <Image
            source={require('../../../assets/settings/profile.png')}
            style={styles.profilePicture}
            resizeMode="contain"
          />

          <TouchableOpacity onPress={pressPicker} style={{ position: 'relative', bottom: 14, left: 40, backgroundColor: 'rgba(244, 243, 231, 1)', width: 44, height: 44, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../../../assets/settings/pencil.png')}
              style={{ height: 22, width: 22 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Code below for text input */}

        <View style={styles.inputContainer}>
          <Text style={styles.updateTextField}>Update Email</Text>
          <TextInput 
            placeholder='example@user.com'
            style={styles.inputDesign}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.updateTextField}>Update username</Text>
          <TextInput 
            placeholder='new names goes here'
            style={styles.inputDesign}
          />
        </View>

        <TouchableOpacity style={styles.updateButton}>
          <Text style={{ color: '#FBFBF4', fontSize: screenHeight * 0.018, fontWeight: 'bold' }}>UPDATE PROFILE</Text>
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
  profilePicture:{
    width: screenHeight * 0.16,
    height: screenHeight * 0.16,
    position: 'relative',
    top: screenHeight * 0.023,
  },
  inputContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems:'left',
    justifyContent: 'center',
    marginBottom: 10,
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
  updateButton:{
    width: '100%',
    height: screenHeight * 0.06,
    borderRadius: 10,
    backgroundColor: Colors.primary.dark,
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

export default ProfileSettingsPage;
