/* eslint-disable max-len */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BaseTabRoutes, BaseNavigationList } from 'navigation/routeTypes';
import type { StackNavigationProp } from '@react-navigation/stack';

import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { updateUser } from '../../../redux/slices/usersSlice'; 


import Colors from 'utils/Colors';

type ProfileSettingsPageProps = {
  navigation: StackNavigationProp<BaseNavigationList>;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileSettingsPage = ({ navigation } : ProfileSettingsPageProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.selectedUser);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  
  const pressPicker = ()=>(
    navigation.navigate(BaseTabRoutes.AVATAR_CUSTOMIZATION, {})
  );

  const isValidEmail = (emailAddr: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddr).toLowerCase());
  };

  const handleUpdateProfile = () => {
    if (!username && !email) {
      alert('You must enter one field to submit your changes.');
      return;
    }

    if (email && !isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (username && (username.length < 5 || username.length > 20)) {
      alert('Username must be between 5 and 20 characters.');
      return;
    }
    
    // update user slice alr handles undefined case so we just pass them over
    if (email) {
      dispatch(updateUser({ id:user?.id, email:email }))
        .then(() => {
          alert('Email updated successfully');
          navigation.navigate(BaseTabRoutes.SETTINGS, {});
        })
        .catch((error) => {
          alert(`Error updating email: ${error.message}`);
        });
    }
    if (username) {
      dispatch(updateUser({ id:user?.id, username:username }))
        .then(() => {
          alert('Username updated successfully');
          navigation.navigate(BaseTabRoutes.SETTINGS, {});

        })
        .catch((error) => {
          alert(`Error updating username: ${error.message}`);
        });
    }
  };

 
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
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.updateTextField}>Update username</Text>
          <TextInput 
            placeholder='new names goes here'
            style={styles.inputDesign}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
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
